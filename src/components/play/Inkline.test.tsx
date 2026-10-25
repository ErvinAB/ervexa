import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Inkline from "@/components/play/Inkline";
import { dateKey, isWholeNetworkLive, liveCells, puzzleFor, rotate } from "@/lib/puzzle";

/**
 * The board as a player meets it: rendered, clicked, and asserted on through the
 * drawing rather than only through the state behind it.
 *
 * Why this file exists, in one line: the bug that shipped twice was not in the
 * rules. The rules were right, the turn counts were right, and the move counter
 * went up — the tile simply never redrew, because the rotation state was never
 * passed to the drawing. A test that only counted clicks and read the "Rotations"
 * readout would have passed the whole time. So every assertion about turning here
 * reads the pipe drawing's own inline transform.
 *
 * What jsdom cannot answer, and what therefore lives in ./e2e under a real
 * browser instead: whether a click lands on the tile a player actually sees, and
 * whether Enter on a focused tile activates it — native button activation is a
 * browser behaviour jsdom does not emulate, so asserting it here would be
 * asserting against the test environment rather than against the page.
 */

const FROZEN = new Date(2026, 9, 16, 12, 0, 0);
const KEY = dateKey(FROZEN);
const PUZZLE = puzzleFor(KEY);
const TOTAL = PUZZLE.size * PUZZLE.size;

/**
 * The par route, one cell index per rotation, in the order the generator
 * measured par from. Clicking this list in order plays the board to the seal and
 * then on to a fully live network.
 */
const ROUTE: number[] = (() => {
  const steps: number[] = [];
  PUZZLE.start.forEach((mask, cell) => {
    for (let k = 0; k < 4; k++) {
      if (rotate(mask, k) === PUZZLE.solution[cell]) {
        for (let turn = 0; turn < k; turn++) steps.push(cell);
        return;
      }
    }
    throw new Error(`tile ${cell} cannot reach its solution orientation`);
  });
  return steps;
})();

function board() {
  return within(screen.getByRole("group", { name: /Inkline board/ }));
}

function tiles(): HTMLElement[] {
  return board().getAllByRole("button");
}

/** The inline style React writes onto a tile's pipe drawing. */
function drawing(tile: HTMLElement): string {
  const svg = tile.querySelector("svg");
  if (!svg) throw new Error("tile has no pipe drawing at all");
  return (svg.getAttribute("style") ?? "").replace(/\s+/g, " ").trim();
}

function label(tile: HTMLElement): string {
  return tile.getAttribute("aria-label") ?? "";
}

function turnableTiles(): HTMLElement[] {
  return tiles().filter((tile) => /Rotate 90 degrees clockwise/.test(label(tile)));
}

function junctionTile(): HTMLElement {
  const tile = tiles().find((candidate) => /four-way junction/.test(label(candidate)));
  if (!tile) throw new Error("today's board has no junction tile to try");
  return tile;
}

/** One cell of the board's readout row, e.g. "1 · par 12". */
function readout(name: string): string {
  const term = screen.getByText(name, { selector: "dt" });
  return (term.nextElementSibling?.textContent ?? "").replace(/\s+/g, " ").trim();
}

/**
 * Click the route in order, one rotation at a time. Returns the rotation that
 * reached the seal; stops there when asked, otherwise plays on to the end of the
 * network. Both shapes come from the same pass, so a test can never accidentally
 * click the route twice and count rotations that were never needed.
 */
function playRoute(all: HTMLElement[], { stopAtSeal = false } = {}): number {
  let solvedAt = 0;
  for (let i = 0; i < ROUTE.length; i++) {
    fireEvent.click(all[ROUTE[i]]);
    if (solvedAt === 0 && sealReached()) {
      solvedAt = i + 1;
      if (stopAtSeal) break;
    }
  }
  if (solvedAt === 0) throw new Error("the board never reached the seal");
  return solvedAt;
}

/**
 * Has the win statement appeared? Not "is there a status region" — that region
 * is deliberately in the DOM from the first paint so a screen reader has been
 * told to watch it before its contents change.
 */
function sealReached(): boolean {
  return screen.queryByText(/Seal reached/) !== null;
}

const playToSeal = (all: HTMLElement[]) => playRoute(all, { stopAtSeal: true });
const playWholeRoute = (all: HTMLElement[]) => playRoute(all);

/** How many tiles are joined to the inkwell in a given arrangement. */
function liveCount(masks: number[]): number {
  return liveCells(PUZZLE.size, masks, PUZZLE.source).size;
}

beforeEach(() => {
  // A fixed clock: the board is seeded from the local date, so a test running
  // across local midnight would otherwise fail for the wrong reason.
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(FROZEN);
  window.localStorage.clear();
  window.history.replaceState({}, "", "/play");
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("the rendered board", () => {
  it("draws today's board once JavaScript has run", () => {
    render(<Inkline />);
    expect(tiles()).toHaveLength(TOTAL);
  });

  it("marks the inkwell and the seal so a player can tell them from pipes", () => {
    render(<Inkline />);
    const all = tiles();
    expect(label(all[PUZZLE.source])).toContain("This is the inkwell.");
    expect(label(all[PUZZLE.target])).toContain("This is the seal.");
  });

  it("shows how much of the network is carrying ink before the seal is reached", () => {
    render(<Inkline />);
    // The page must agree with the library about the board it was handed, so the
    // expected number is computed here rather than assumed: a freshly scrambled
    // board usually has a few loose connections already.
    const live = liveCount(PUZZLE.start);
    expect(readout("Ink")).toBe(`${live} of ${TOTAL} tiles carrying ink`);
    expect(screen.getByText(`${live} of ${TOTAL} pipes live`)).toBeTruthy();
    expect(sealReached()).toBe(false);
  });

  it("keeps its live region in the DOM before there is anything to announce", () => {
    render(<Inkline />);
    // A live region that arrives at the same moment as its content is not
    // reliably announced, so the node has to be here from the first paint —
    // with its contents silenced while they are only a meter.
    const region = screen.getByRole("status");
    expect(region).toBeTruthy();
    expect(region.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("names a tile that is carrying ink, so the state is never colour alone", () => {
    render(<Inkline />);
    expect(label(tiles()[PUZZLE.source])).toContain("Carrying ink.");
  });
});

describe("turning a tile", () => {
  it("carries a rotation on the drawing, and changes it on every click", () => {
    render(<Inkline />);
    const tile = turnableTiles()[0];
    if (!tile) throw new Error("no turnable tile was rendered");

    // The shape of the shipped bug: a tile drawn once with no transform at all,
    // so the state turned and the picture never did.
    expect(drawing(tile)).toContain("rotate(0deg)");

    fireEvent.click(tile);
    expect(drawing(tile)).toContain("rotate(90deg)");
    expect(readout("Rotations")).toBe(`1 · par ${PUZZLE.par}`);

    fireEvent.click(tile);
    expect(drawing(tile)).toContain("rotate(180deg)");
  });

  it("keeps spinning forward, so a tile never snaps a quarter-turn backwards", () => {
    render(<Inkline />);
    const tile = turnableTiles()[0];
    if (!tile) throw new Error("no turnable tile was rendered");

    // Cumulative turn counts, not a 0-3 rotation: 270 -> 360 must be one turn
    // on, not three turns back. Four clicks is a full clockwise revolution.
    for (const deg of [90, 180, 270, 360]) {
      fireEvent.click(tile);
      expect(drawing(tile)).toContain(`rotate(${deg}deg)`);
    }
    fireEvent.click(tile);
    expect(drawing(tile)).toContain("rotate(450deg)");
  });

  it("refuses to charge a move for a piece that cannot change", () => {
    render(<Inkline />);
    const junction = junctionTile();

    for (let i = 0; i < 3; i++) fireEvent.click(junction);

    // Nothing turned, and — the part that was wrong before — nothing charged.
    expect(drawing(junction)).toContain("rotate(0deg)");
    expect(readout("Rotations")).toBe(`0 · par ${PUZZLE.par}`);
    expect(screen.queryByRole("button", { name: /start this board again/i })).toBeNull();
    expect(label(junction)).toContain("Nothing to turn");
  });

  it("moves focus around the board with the arrow keys, and stops at the walls", () => {
    render(<Inkline />);
    const all = tiles();
    const size = PUZZLE.size;

    all[0].focus();
    fireEvent.keyDown(all[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(all[1]);

    fireEvent.keyDown(all[1], { key: "ArrowDown" });
    expect(document.activeElement).toBe(all[1 + size]);

    fireEvent.keyDown(all[1 + size], { key: "ArrowUp" });
    expect(document.activeElement).toBe(all[1]);

    // The edge of the board is a wall, not a wrap-around.
    all[0].focus();
    fireEvent.keyDown(all[0], { key: "ArrowUp" });
    expect(document.activeElement).toBe(all[0]);
    fireEvent.keyDown(all[0], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(all[0]);

    // Home and End jump within the current row.
    all[1].focus();
    fireEvent.keyDown(all[1], { key: "End" });
    expect(document.activeElement).toBe(all[size - 1]);
    fireEvent.keyDown(all[size - 1], { key: "Home" });
    expect(document.activeElement).toBe(all[0]);
  });
});

describe("reaching the seal", () => {
  it("announces the solve inside the live region that was already there", () => {
    const { container } = render(<Inkline />);
    const region = screen.getByRole("status");
    playToSeal(tiles());

    const statement = screen.getByText(/Seal reached/);
    expect(region.contains(statement), "the win landed outside the live region").toBe(true);
    expect(screen.getByRole("status").textContent).toMatch(/Solved in \d+ rotations/);
    // The frame turns forest and washes with ink, so the win is visible where
    // the player is looking rather than only in the text underneath.
    expect(container.querySelector(".inkline-wash")).toBeTruthy();
  });

  it("arrives at the seal before the network is finished, and says what is left", () => {
    render(<Inkline />);
    const solvedAt = playToSeal(tiles());

    // The property that makes the second layer of the game necessary: on roughly
    // 95% of boards the ink arrives with pipes still dry.
    expect(solvedAt).toBeLessThan(PUZZLE.par);
    expect(readout("Ink")).toBe("Reached the seal");
    expect(screen.getByText(/still dry/i)).toBeTruthy();
    expect(screen.getByText(/keep turning/i)).toBeTruthy();
  });

  it("keeps the board playable after the seal, so no click is a dead click", () => {
    render(<Inkline />);
    const all = tiles();
    const solvedAt = playToSeal(all);

    const dry = all.find((tile) => !/Carrying ink/.test(label(tile)) && /Rotate/.test(label(tile)));
    if (!dry) throw new Error("no dry tile left to test continued play with");
    const before = drawing(dry);

    // The behaviour that was wrong by design: the board used to lock the moment
    // the seal was reached, so a click here did exactly nothing.
    fireEvent.click(dry);
    expect(drawing(dry)).not.toBe(before);
    expect(readout("Rotations")).toBe(`${solvedAt + 1} · par ${PUZZLE.par}`);
    expect(sealReached()).toBe(true);
  });

  it("can be played on until the whole network is carrying ink", () => {
    render(<Inkline />);
    const all = tiles();
    playWholeRoute(all);

    expect(isWholeNetworkLive(PUZZLE, PUZZLE.solution)).toBe(true);
    expect(readout("Rotations")).toBe(`${PUZZLE.par} · par ${PUZZLE.par}`);
    expect(readout("Ink")).toBe("Every pipe carrying ink");
    expect(screen.getByText(/every pipe on the board is carrying ink/i)).toBeTruthy();
  });

  it("freezes the result at the rotation that reached the seal", async () => {
    render(<Inkline />);
    const all = tiles();
    const solvedAt = playWholeRoute(all);

    // More rotations were made than the solve took, and the result still reports
    // the solve: continued play cannot make a finished board look worse.
    expect(solvedAt).toBeLessThan(PUZZLE.par);
    expect(readout("Rotations")).toBe(`${PUZZLE.par} · par ${PUZZLE.par}`);

    fireEvent.click(screen.getByRole("button", { name: /copy result/i }));
    const written = vi.mocked(navigator.clipboard.writeText).mock.calls[0][0];
    expect(written).toContain(`solved in ${solvedAt} rotations`);
    expect(written).toContain(`par ${PUZZLE.par}`);
  });

  it("remembers the day's progress and the solve, and restores both", () => {
    const first = render(<Inkline />);
    const solvedAt = playToSeal(tiles());

    const stored = window.localStorage.getItem(`inkline:v1:save:${KEY}`);
    expect(stored, "nothing was written to local storage").toBeTruthy();
    const parsed = JSON.parse(stored as string);
    expect(parsed.solved).toBe(true);
    expect(parsed.solvedIn).toBe(solvedAt);

    // A refresh is not a punishment: a fresh mount reads the same board back.
    first.unmount();
    render(<Inkline />);
    expect(screen.getByRole("status").textContent).toContain(`Solved in ${solvedAt} rotations`);
    expect(readout("Ink")).toBe("Reached the seal");
  });

  it("can start the same board again, forgetting the solve", () => {
    render(<Inkline />);
    playToSeal(tiles());

    fireEvent.click(screen.getByRole("button", { name: /start this board again/i }));

    expect(sealReached()).toBe(false);
    expect(readout("Rotations")).toBe(`0 · par ${PUZZLE.par}`);
    expect(screen.getByText(`${liveCount(PUZZLE.start)} of ${TOTAL} pipes live`)).toBeTruthy();
    const tile = turnableTiles()[0];
    if (!tile) throw new Error("no turnable tile was rendered");
    expect(drawing(tile)).toContain("rotate(0deg)");
  });

  it("never lets a practice board overwrite today's progress", () => {
    render(<Inkline />);
    const tile = turnableTiles()[0];
    if (!tile) throw new Error("no turnable tile was rendered");
    fireEvent.click(tile);
    expect(readout("Rotations")).toBe(`1 · par ${PUZZLE.par}`);

    const before = window.localStorage.getItem(`inkline:v1:save:${KEY}`);
    fireEvent.click(screen.getByRole("button", { name: /play a practice board/i }));

    expect(readout("Board")).toBe("A practice board");
    // A practice board is a different board, so it has its own par.
    expect(readout("Rotations")).toMatch(/^0 · par \d+$/);
    // Today's save is exactly as it was, and the practice board added no key.
    expect(window.localStorage.getItem(`inkline:v1:save:${KEY}`)).toBe(before);
    const keys = Array.from({ length: window.localStorage.length }, (_, i) =>
      window.localStorage.key(i),
    );
    expect(keys.filter((stored) => stored?.includes("practice"))).toEqual([]);
  });
});
