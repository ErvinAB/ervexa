"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EAST,
  NORTH,
  SOUTH,
  WEST,
  dateKey,
  isTurnable,
  dateLabel,
  isSolved as boardIsSolved,
  isWholeNetworkLive,
  liveCells,
  puzzleFor,
  rotate,
  tileLabel,
  type Puzzle,
} from "@/lib/puzzle";

/**
 * Inkline — the board.
 *
 * The rules live in `@/lib/puzzle`, so this component only draws a board and
 * reports what the player did to it. Four deliberate choices worth knowing:
 *
 * 1. The board is built AFTER mount, never during render. A date-seeded board
 *    rendered on the server would be baked at build time and then disagree with
 *    the client's clock on hydration. So the server sends a correctly sized
 *    placeholder and the board appears once JavaScript runs — which is also why
 *    the page says so plainly instead of pretending the page works without it.
 *
 * 2. Tile state is a cumulative turn count, not a 0-3 rotation. The growing
 *    number is what lets a tile keep spinning clockwise through 270 -> 360
 *    instead of snapping backwards through three quarters of a turn. The turn
 *    count is the ONLY thing that reaches the drawing — the rotation is applied
 *    to the SVG as an inline transform. When that wiring was missing the board
 *    could not be played at all: the counters moved and the picture never did.
 *
 * 3. Reaching the seal does not stop the game. On roughly 95% of boards the ink
 *    reaches the seal with pipes still dry, so locking the board on the win left
 *    a screen full of unresponsive tiles — and a control that silently does
 *    nothing reads as broken. Instead the solve is recorded once (`solvedIn`)
 *    and the player may keep turning to bring the whole network alive, which is
 *    the board's second, optional goal.
 *
 * 4. The counter shown while playing and the number in the result are different
 *    numbers on purpose: `moves` keeps counting every rotation made, while
 *    `solvedIn` is frozen at the rotation that reached the seal. Continued play
 *    can therefore never make a finished board look worse than it was.
 */

const SAVE_PREFIX = "inkline:v1:save:";

interface Saved {
  turns: number[];
  moves: number;
  solved: boolean;
  /** Rotations at the moment the seal was reached, if it ever was. */
  solvedIn: number | null;
}

function readSaved(key: string, total: number): Saved | null {
  try {
    const raw = window.localStorage.getItem(SAVE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    if (!Array.isArray(parsed.turns) || parsed.turns.length !== total) return null;
    if (!parsed.turns.every((t) => Number.isInteger(t) && t >= 0)) return null;
    const moves = typeof parsed.moves === "number" && parsed.moves >= 0 ? parsed.moves : 0;
    return {
      turns: parsed.turns as number[],
      moves,
      solved: parsed.solved === true,
      // A save written by an earlier version has no solve count; the current
      // move count is the best available answer and is never wrong downwards.
      solvedIn: typeof parsed.solvedIn === "number" && parsed.solvedIn >= 0 ? parsed.solvedIn : moves,
    };
  } catch {
    return null;
  }
}

/** A shared link can carry any date: /play?d=2026-10-16 */
function archiveKey(): string | null {
  try {
    const value = new URLSearchParams(window.location.search).get("d");
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    return value;
  } catch {
    return null;
  }
}

/**
 * The pipes of one tile, drawn in the orientation the board was built from.
 *
 * `fill="currentColor"` is load-bearing, not decoration. Without it every shape
 * falls back to SVG's default black, and the colour classes on this element do
 * nothing — which is how the first version shipped as a static black grid where
 * the ink never visibly spread.
 */
function Pipes({
  mask,
  className,
  style,
}: {
  mask: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {mask & NORTH ? <rect x={43} y={-4} width={14} height={54} /> : null}
      {mask & SOUTH ? <rect x={43} y={50} width={14} height={54} /> : null}
      {mask & EAST ? <rect x={50} y={43} width={54} height={14} /> : null}
      {mask & WEST ? <rect x={-4} y={43} width={54} height={14} /> : null}
      <circle cx={50} cy={50} r={11} />
    </svg>
  );
}

/** The two symbols that are not pipes: where the ink enters, and where it must arrive. */
function InkwellMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path d="M4 50 L22 36 L22 64 Z" fill="currentColor" />
    </svg>
  );
}

function SealMark({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <rect
        x={6}
        y={6}
        width={88}
        height={88}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={14}
      />
    </svg>
  );
}

export default function Inkline() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [turns, setTurns] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [solvedIn, setSolvedIn] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [focus, setFocus] = useState(0);
  const [share, setShare] = useState<"idle" | "copied" | "manual">("idle");

  const tiles = useRef<Array<HTMLButtonElement | null>>([]);

  const start = useCallback((boardKey: string, boardLabel: string, persist: boolean) => {
    const next = puzzleFor(boardKey);
    const total = next.size * next.size;
    const stored = persist ? readSaved(boardKey, total) : null;

    setPuzzle(next);
    setKey(boardKey);
    setLabel(boardLabel);
    setTurns(stored ? stored.turns : new Array<number>(total).fill(0));
    setMoves(stored ? stored.moves : 0);
    setSolvedIn(stored ? stored.solvedIn : null);
    setFocus(next.source);
    setShare("idle");
    // Only the day's own board is remembered, so a practice board or a dated
    // link can never overwrite today's progress.
    setSaved(persist);
  }, []);

  // The board is dated, so it can only be built on the client.
  useEffect(() => {
    const today = dateKey(new Date());
    const archive = archiveKey();
    if (archive && archive !== today) {
      start(archive, dateLabel(archive), false);
      return;
    }
    start(today, dateLabel(today), true);
  }, [start]);

  const size = puzzle?.size ?? 5;
  const total = size * size;

  /** The current orientation of every tile, derived from the turn counts. */
  const masks = useMemo(
    () => (puzzle ? puzzle.start.map((mask, cell) => rotate(mask, turns[cell] ?? 0)) : []),
    [puzzle, turns],
  );

  const reachingSeal = useMemo(
    () => (puzzle && masks.length === total ? boardIsSolved(puzzle, masks) : false),
    [puzzle, masks, total],
  );

  const wholeNetworkLive = useMemo(
    () => (puzzle && masks.length === total ? isWholeNetworkLive(puzzle, masks) : false),
    [puzzle, masks, total],
  );

  // The solve is observed from the board rather than announced by the click
  // handler. Deriving it here means a burst of clicks cannot be judged against a
  // stale board, so every rotation the player makes counts and none is lost.
  useEffect(() => {
    if (reachingSeal) setSolvedIn((previous) => previous ?? moves);
  }, [reachingSeal, moves]);

  const live = useMemo(
    () => (puzzle ? liveCells(size, masks, puzzle.source) : new Set<number>()),
    [puzzle, masks, size],
  );

  // Remember the day's progress, so a refresh is not a punishment.
  useEffect(() => {
    if (!puzzle || !saved || key === "") return;
    try {
      window.localStorage.setItem(
        SAVE_PREFIX + key,
        JSON.stringify({ turns, moves, solved: solvedIn !== null, solvedIn } satisfies Saved),
      );
    } catch {
      // A browser with storage disabled still plays; it just will not remember.
    }
  }, [puzzle, saved, key, turns, moves, solvedIn]);

  const turnTile = useCallback(
    (cell: number) => {
      if (!puzzle) return;
      // A four-way junction looks the same at every angle. Turning one would be
      // an invisible no-op, so it is not rotated and not charged as a move.
      if (!isTurnable(puzzle.start[cell])) return;
      setTurns((previous) => {
        const next = previous.slice();
        next[cell] = (next[cell] ?? 0) + 1;
        return next;
      });
      setMoves((count) => count + 1);
    },
    [puzzle],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, cell: number) => {
      const row = Math.floor(cell / size);
      const col = cell % size;
      let next = cell;

      if (event.key === "ArrowUp" && row > 0) next = cell - size;
      else if (event.key === "ArrowDown" && row < size - 1) next = cell + size;
      else if (event.key === "ArrowLeft" && col > 0) next = cell - 1;
      else if (event.key === "ArrowRight" && col < size - 1) next = cell + 1;
      else if (event.key === "Home") next = row * size;
      else if (event.key === "End") next = row * size + size - 1;
      else return;

      event.preventDefault();
      setFocus(next);
      tiles.current[next]?.focus();
    },
    [size],
  );

  const restart = () => {
    if (!puzzle) return;
    setTurns(new Array<number>(total).fill(0));
    setMoves(0);
    setSolvedIn(null);
    setShare("idle");
    setFocus(puzzle.source);
  };

  const practice = () => {
    const next = `practice-${Math.random().toString(36).slice(2, 8)}`;
    start(next, "A practice board", false);
  };

  const solved = solvedIn !== null;
  const liveCount = live.size;
  const remaining = total - liveCount;

  const result = useMemo(() => {
    if (!puzzle) return "";
    const whole = wholeNetworkLive ? " · whole network live" : "";
    return solved
      ? `Inkline · ${label} · solved in ${solvedIn} rotations · par ${puzzle.par}${whole}`
      : `Inkline · ${label} · ${moves} rotations so far · par ${puzzle.par}`;
  }, [puzzle, label, moves, solved, solvedIn, wholeNetworkLive]);

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setShare("copied");
    } catch {
      // Clipboard access can be denied. Show the text rather than pretend.
      setShare("manual");
    }
  };

  // ------------------------------------------------ placeholder (server + no JS)
  if (!puzzle) {
    return (
      <div>
        <div
          className="grid gap-1.5 border border-charcoal/20 bg-charcoal/[0.04] p-3 sm:gap-2 sm:p-4"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {Array.from({ length: total }).map((_, index) => (
            <span key={index} className="aspect-square border border-charcoal/15 bg-ivory-soft" />
          ))}
        </div>
        <p className="label mt-6 text-charcoal/70">Building today&apos;s board…</p>
      </div>
    );
  }

  return (
    <div>
      {/*
       * The board is framed like an object rather than left floating on the page:
       * a bordered panel in a slightly darker paper, so the tiles read as pieces
       * sitting in a tray. On a solve the frame itself turns forest — feedback
       * that arrives in place, without moving anything the player is aiming at.
       */}
      <div
        className={`border p-3 transition-colors sm:p-4 ${
          solved
            ? "inkline-wash border-forest/40 bg-forest/[0.06]"
            : "border-charcoal/20 bg-charcoal/[0.04]"
        }`}
      >
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          role="group"
          aria-label={`Inkline board for ${label}, ${size} tiles across`}
        >
          {Array.from({ length: total }).map((_, cell) => {
            const isLive = live.has(cell);
            const isSource = cell === puzzle.source;
            const isTarget = cell === puzzle.target;

            return (
              <button
                key={cell}
                ref={(node) => {
                  tiles.current[cell] = node;
                }}
                type="button"
                tabIndex={cell === focus ? 0 : -1}
                aria-label={`${tileLabel(cell, masks[cell], size)}${
                  isSource ? " This is the inkwell." : isTarget ? " This is the seal." : ""
                }${isLive ? " Carrying ink." : ""}`}
                onClick={() => turnTile(cell)}
                onKeyDown={(event) => onKeyDown(event, cell)}
                onFocus={() => setFocus(cell)}
                // `touch-manipulation` drops the double-tap-to-zoom delay, so a
                // tap on a tile turns it on the first touch rather than the
                // second. `z-10` on focus keeps the ring out from under the
                // neighbouring tiles, whose borders are drawn later.
                className={`group relative aspect-square touch-manipulation border transition-colors focus-visible:z-10 ${
                  isSource || isTarget ? "border-forest" : "border-charcoal/30"
                } ${isLive ? "bg-forest/10" : "bg-ivory"} cursor-pointer hover:border-forest active:bg-charcoal/10`}
              >
                {/*
                 * The tile is drawn once in the orientation the board was built
                 * from, and every turn is a CSS rotation of that drawing. Wiring
                 * this up is the whole game: without it the state rotated and the
                 * picture never did, so the board could not be played at all.
                 *
                 * `turns` is cumulative rather than 0-3, which is what lets a tile
                 * keep spinning clockwise through 270 -> 360 instead of snapping
                 * three quarters of a turn backwards.
                 */}
                <Pipes
                  mask={puzzle.start[cell]}
                  style={{ transform: `rotate(${(turns[cell] ?? 0) * 90}deg)` }}
                  className={`h-full w-full origin-center transition-transform duration-150 ease-out motion-reduce:transition-none ${
                    // Dry pipes sit at 60% charcoal so the tile shape clears the
                    // 3:1 non-text contrast minimum on ivory. At 30% the board was
                    // barely legible; the ink is the only thing that is ever loud.
                    isLive ? "text-forest" : "text-charcoal/60"
                  }`}
                />

                {/* The inkwell. Column one never has a west pipe, so this corner
                    of the tile is always empty and the marker cannot collide. */}
                {isSource ? (
                  <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 h-full w-full text-forest"
                    aria-hidden="true"
                  >
                    <path d="M4 50 L22 36 L22 64 Z" fill="currentColor" />
                  </svg>
                ) : null}

                {/* The seal. The last column never has an east pipe either. It
                    fills in once the ink has actually arrived, which is what
                    makes the win visible on the board itself. */}
                {isTarget ? (
                  <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 h-full w-full text-forest"
                    aria-hidden="true"
                  >
                    <rect
                      x={70}
                      y={70}
                      width={22}
                      height={22}
                      fill={reachingSeal ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={8}
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/*
       * One slot below the board, two jobs: while playing it is the ink meter,
       * and once the seal is reached it becomes the win statement. Keeping it in
       * one place means the board above never moves under the player's cursor at
       * the exact moment they were aiming for it.
       *
       * It is also the page's live region, and it is in the DOM from the first
       * paint on purpose. A live region added to the page at the same instant as
       * its content is not reliably announced — the reader has to have been told
       * to watch the node before it changes — so this node never appears or
       * disappears, only its contents change. When that content is the meter it
       * is aria-hidden, so the region reads as empty until there is a result.
       */}
      <div className="mt-4" role="status" aria-live="polite">
        {solved ? (
          <div className="inkline-win border-l-2 border-forest pl-5">
            <p className="label font-semibold text-forest">Seal reached</p>
            <p className="mt-2 text-base leading-relaxed text-charcoal/85">
              Solved in <strong className="font-semibold text-charcoal">{solvedIn}</strong>{" "}
              {solvedIn === 1 ? "rotation" : "rotations"}.
              {solvedIn < puzzle.par
                ? ` That is ${puzzle.par - solvedIn} under par — you found a shorter way through the network than the one it was built from.`
                : solvedIn === puzzle.par
                  ? " Exactly par — the arrangement the board was scrambled from."
                  : ` Par is ${puzzle.par}, so there is a shorter route through this network if you want to look for it.`}
            </p>
            <p className="mt-2 text-base leading-relaxed text-charcoal/70">
              {wholeNetworkLive
                ? "Every pipe on the board is carrying ink."
                : `${remaining} ${remaining === 1 ? "pipe is" : "pipes are"} still dry. Keep turning — the ink does not have to stop at the seal.`}
            </p>
            <button
              type="button"
              onClick={copy}
              className="mt-4 inline-flex items-center rounded-full bg-forest px-6 py-3 text-base font-semibold text-ivory transition-colors hover:bg-charcoal active:bg-charcoal"
            >
              {share === "copied" ? "Copied" : "Copy result"}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3" aria-hidden="true">
            <div className="h-1 flex-1 bg-charcoal/10">
              <div
                className="h-full bg-forest transition-[width] duration-200 ease-out motion-reduce:transition-none"
                style={{ width: `${Math.round((liveCount / total) * 100)}%` }}
              />
            </div>
            <span className="label tabular-nums text-charcoal/70">
              {liveCount} of {total} pipes live
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="button"
          onClick={practice}
          className="inline-flex items-center gap-2 text-base font-medium text-forest underline-offset-4 transition-colors hover:text-charcoal hover:underline"
        >
          Play a practice board
        </button>
        {moves > 0 ? (
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 text-base font-medium text-charcoal/70 underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            Start this board again
          </button>
        ) : null}
      </div>

      <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-charcoal/15 pt-6 sm:grid-cols-3">
        <div>
          <dt className="label text-charcoal/70">Board</dt>
          <dd className="mt-1 text-base text-charcoal">{label}</dd>
        </div>
        <div>
          <dt className="label text-charcoal/70">Rotations</dt>
          <dd className="mt-1 text-base tabular-nums text-charcoal">
            {moves} <span className="text-charcoal/60">· par {puzzle.par}</span>
          </dd>
        </div>
        <div>
          <dt className="label text-charcoal/70">Ink</dt>
          <dd className="mt-1 text-base text-charcoal">
            {wholeNetworkLive
              ? "Every pipe carrying ink"
              : reachingSeal
                ? "Reached the seal"
                : `${liveCount} of ${total} tiles carrying ink`}
          </dd>
        </div>
      </dl>

      {/* The two symbols that are not pipes. Decorative: the rules above and every
          tile's own name already carry this, so this is for the eye only. */}
      <div
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-charcoal/70"
        aria-hidden="true"
      >
        <span className="label flex items-center gap-2">
          <span className={reachingSeal ? "text-forest" : "text-forest"}>
            <InkwellMark />
          </span>
          Inkwell
        </span>
        <span className="label flex items-center gap-2">
          <span className={reachingSeal ? "text-forest" : "text-charcoal/50"}>
            <SealMark filled={reachingSeal} />
          </span>
          Seal
        </span>
        <span className="label text-charcoal/50">Tap or click a tile to turn it</span>
      </div>

      {share === "manual" ? (
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          Could not reach the clipboard.{" "}
          <code className="select-all bg-ivory-soft px-1">{result}</code>
        </p>
      ) : null}
    </div>
  );
}
