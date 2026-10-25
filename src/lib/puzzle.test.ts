import { describe, expect, it } from "vitest";
import {
  EAST,
  FULL,
  NORTH,
  SOUTH,
  WEST,
  dateKey,
  dateLabel,
  describeMask,
  describePosition,
  generate,
  hashString,
  isTurnable,
  isSolved,
  isWholeNetworkLive,
  liveCells,
  opposite,
  puzzleFor,
  rotate,
  symmetryOrder,
  tileLabel,
  type Puzzle,
} from "@/lib/puzzle";

/**
 * The generator's promises, asserted rather than hoped for.
 *
 * Every claim the /play page makes to a reader — "every board is solvable",
 * "one board a date", "you are never handed a board that is already finished" —
 * is a property of this file, so this is where they are checked. The sample is
 * a few thousand boards per run: enough that the failures which only show up on
 * roughly one board in a thousand (which is exactly the bug the retry loop in
 * `generate` was added for) cannot hide, while still finishing in under a second.
 */

/** A fixed, spread-out sample: real consecutive dates plus hashed practice keys. */
const DATES: string[] = (() => {
  const out: string[] = [];
  const cursor = new Date(Date.UTC(2024, 0, 1));
  for (let i = 0; i < 800; i++) {
    out.push(
      `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}-${String(
        cursor.getUTCDate(),
      ).padStart(2, "0")}`,
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  for (let i = 0; i < 400; i++) out.push(`practice-${i}`);
  return out;
})();

const BOARDS: Array<{ key: string; puzzle: Puzzle }> = DATES.map((key) => ({
  key,
  puzzle: puzzleFor(key),
}));

describe("rotation primitives", () => {
  it("turns a mask a quarter-turn clockwise", () => {
    expect(rotate(NORTH, 1)).toBe(EAST);
    expect(rotate(EAST, 1)).toBe(SOUTH);
    expect(rotate(SOUTH, 1)).toBe(WEST);
    expect(rotate(WEST, 1)).toBe(NORTH);
    // The union of all four directions is a fixed point under every rotation.
    expect(rotate(FULL, 1)).toBe(FULL);
  });

  it("is a no-op after four turns, and normalises negative counts", () => {
    for (const mask of [NORTH, EAST | WEST, NORTH | EAST, FULL, 0]) {
      expect(rotate(mask, 4)).toBe(mask & FULL);
      expect(rotate(mask, 0)).toBe(mask & FULL);
      expect(rotate(mask, -1)).toBe(rotate(mask, 3));
      expect(rotate(mask, -5)).toBe(rotate(mask, 3));
    }
  });

  it("reads a direction and its opposite", () => {
    expect(opposite(NORTH)).toBe(SOUTH);
    expect(opposite(SOUTH)).toBe(NORTH);
    expect(opposite(EAST)).toBe(WEST);
    expect(opposite(WEST)).toBe(EAST);
  });

  it("knows how much symmetry a piece has", () => {
    expect(symmetryOrder(FULL)).toBe(1); // a cross looks the same at every angle
    expect(symmetryOrder(NORTH | SOUTH)).toBe(2); // a straight pipe
    expect(symmetryOrder(EAST | WEST)).toBe(2);
    expect(symmetryOrder(NORTH | EAST)).toBe(4); // an elbow
    expect(symmetryOrder(NORTH | EAST | SOUTH)).toBe(4); // a T, still four
  });

  it("only offers to turn something that can visibly change", () => {
    expect(isTurnable(FULL)).toBe(false);
    for (let mask = 1; mask < FULL; mask++) {
      if (mask === 0) continue;
      expect(isTurnable(mask)).toBe(true);
    }
  });
});

describe("board generation", () => {
  it("is a pure function of the key — same date, same board, forever", () => {
    for (const key of ["2026-10-16", "2020-02-29", "practice-xyz"]) {
      const first = puzzleFor(key);
      const second = puzzleFor(key);
      expect(second).toEqual(first);
    }
    // A different day is a different board, not a reshuffle of the same one.
    expect(puzzleFor("2026-10-16").start).not.toEqual(puzzleFor("2026-10-17").start);
  });

  it("hashes strings deterministically", () => {
    expect(hashString("inkline:v1:2026-10-16")).toBe(hashString("inkline:v1:2026-10-16"));
    expect(hashString("a")).not.toBe(hashString("b"));
  });

  it("builds a board whose solution is fully connected", () => {
    // The spanning tree in step 1 of `layout` is the entire solvability
    // guarantee: if this ever fails, the generator is broken at the root.
    for (const { key, puzzle } of BOARDS) {
      expect(isWholeNetworkLive(puzzle, puzzle.solution), `solution not live for ${key}`).toBe(true);
    }
  });

  it("never deals a board that is already finished", () => {
    for (const { key, puzzle } of BOARDS) {
      expect(isSolved(puzzle, puzzle.start), `dealt solved: ${key}`).toBe(false);
    }
  });

  it("always leaves a way to finish inside par", () => {
    // Par is advertised as a real target, so it has to be reachable: rebuild the
    // solution from the dealt board using exactly `par` rotations, and check the
    // result is live and solved. This is what makes par an upper bound rather
    // than a number the page invented.
    for (const { key, puzzle } of BOARDS) {
      const restored = puzzle.start.map((mask, cell) => {
        for (let k = 0; k < 4; k++) {
          if (rotate(mask, k) === puzzle.solution[cell]) return rotate(mask, k);
        }
        throw new Error(`no rotation of ${mask} reaches ${puzzle.solution[cell]} (${key})`);
      });
      expect(restored).toEqual(puzzle.solution);
      expect(isSolved(puzzle, restored), `par unreachable for ${key}`).toBe(true);
      expect(isWholeNetworkLive(puzzle, restored), `par leaves dry pipes for ${key}`).toBe(true);
    }
  });

  it("reports par as the cheapest cell-by-cell route back to the solution", () => {
    for (const { key, puzzle } of BOARDS) {
      let cheapest = 0;
      puzzle.start.forEach((mask, cell) => {
        for (let k = 0; k < 4; k++) {
          if (rotate(mask, k) === puzzle.solution[cell]) {
            cheapest += k;
            break;
          }
        }
      });
      expect(puzzle.par, `par wrong for ${key}`).toBe(cheapest);
      // A board is never dealt finished, so some tile must genuinely need a turn.
      expect(puzzle.par, `par should be positive for ${key}`).toBeGreaterThan(0);
    }
  });

  it("scrambles at least half the tiles", () => {
    for (const { key, puzzle } of BOARDS) {
      const moved = puzzle.start.filter((mask, cell) => mask !== puzzle.solution[cell]).length;
      expect(moved, `barely scrambled: ${key}`).toBeGreaterThanOrEqual(Math.ceil(puzzle.start.length * 0.5));
    }
  });

  it("keeps the inkwell and the seal on the middle row, facing each other", () => {
    for (const { key, puzzle } of BOARDS) {
      const size = puzzle.size;
      const middle = Math.floor(size / 2);
      expect(puzzle.source, key).toBe(middle * size);
      expect(puzzle.target, key).toBe(middle * size + size - 1);
    }
  });

  it("holds these promises at other board sizes too", () => {
    // /play ships a 5x5 board, but the generator takes a size and the retry loop
    // has to work for any of them — small boards are where "accidentally solved"
    // is most likely, and this is what proves `generate`'s retry actually retries.
    for (const size of [4, 5, 6, 7, 8]) {
      for (let seed = 0; seed < 60; seed++) {
        const puzzle = generate(size, hashString(`size-${size}-seed-${seed}`));
        expect(puzzle.start.length, `size ${size}`).toBe(size * size);
        expect(isSolved(puzzle, puzzle.start), `dealt solved: size ${size} seed ${seed}`).toBe(false);
        expect(isWholeNetworkLive(puzzle, puzzle.solution), `dry solution: size ${size}`).toBe(true);
      }
    }
  });
});

describe("ink connectivity", () => {
  it("crosses only where two neighbouring pipes actually point at each other", () => {
    // A 2x2 board read left to right: one pipe that agrees with its neighbour,
    // and one that points at a wall.
    const size = 2;
    const source = 2; // bottom-left
    const oneWay = [0, 0, EAST, 0]; // bottom-left points east, top-right does not point west
    expect([...liveCells(size, oneWay, source)].sort()).toEqual([2]);

    const agreed = [0, 0, EAST, WEST]; // now the neighbour points back
    expect([...liveCells(size, agreed, source)].sort()).toEqual([2, 3]);
  });

  it("does not let ink leak through a wall or wrap around a row", () => {
    const size = 2;
    // Bottom-left points east and its neighbour agrees, but nothing reaches the
    // top row: the ink must not wrap from the end of a row to the start of it.
    const board = [WEST, WEST, EAST, WEST];
    expect([...liveCells(size, board, 2)].sort()).toEqual([2, 3]);
    expect(liveCells(size, board, 2).has(0)).toBe(false);
  });

  it("always counts the inkwell itself as carrying ink", () => {
    expect([...liveCells(3, new Array(9).fill(0), 4)]).toEqual([4]);
  });
});

describe("the date a board is keyed on", () => {
  it("uses the local calendar, not UTC", () => {
    // Local time on purpose: a board that turns over mid-afternoon because
    // someone else's midnight passed is the bigger surprise of the two.
    const local = new Date(2026, 9, 16, 0, 30, 0); // 16 Oct, half past midnight, local
    expect(dateKey(local)).toBe("2026-10-16");
    expect(dateKey(new Date(2026, 0, 1, 23, 59))).toBe("2026-01-01");
  });

  it("labels a key for humans", () => {
    expect(dateLabel("2026-10-16")).toContain("2026");
    expect(dateLabel("2026-10-16")).toMatch(/16/);
  });
});

describe("tile labels", () => {
  it("names a turnable tile by its position and the way it points", () => {
    expect(tileLabel(7, NORTH | EAST, 5)).toBe(
      "Tile row 2, column 3, pipe pointing north and east. Rotate 90 degrees clockwise.",
    );
  });

  it("says so when a control cannot do anything, instead of promising a turn", () => {
    const label = tileLabel(12, FULL, 5);
    expect(label).toContain("row 3, column 3");
    expect(label).toContain("four-way junction");
    expect(label).toContain("Nothing to turn");
    expect(label).not.toContain("Rotate");
  });

  it("describes every direction set in words", () => {
    expect(describeMask(FULL)).toBe("all four directions");
    expect(describeMask(NORTH | EAST | SOUTH)).toBe("north, east and south");
    expect(describeMask(NORTH | WEST)).toBe("north and west");
    expect(describeMask(SOUTH)).toBe("south");
    expect(describePosition(0, 5)).toBe("row 1, column 1");
    expect(describePosition(24, 5)).toBe("row 5, column 5");
  });
});
