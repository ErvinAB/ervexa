/**
 * Inkline — the puzzle's whole brain, kept pure and framework-free.
 *
 * There is no React and no DOM in this file on purpose: the generator can be
 * executed and asserted against on its own (see the note in the source of
 * `/play`), and the component that draws it holds no rules of its own.
 *
 * ── How a board is guaranteed solvable ──────────────────────────────────────
 * This is the property the studio cares about, so it is the property the
 * generator is built around: it never creates a board and then hopes.
 *
 *   1. A spanning tree over every cell is built first (randomised depth-first
 *      backtracking). Because it spans the whole grid, a connected arrangement
 *      exists by construction, and no cell is ever left with no pipe.
 *   2. A few extra links are then added. Adding an edge to a spanning tree can
 *      only ever add routes, never remove them, so connectivity still holds.
 *   3. Only then are the tiles scrambled — by rotating copies of an arrangement
 *      that is already known to work.
 *
 * So "is this board solvable" is not a thing anyone has to check at runtime. The
 * scrambled state is always one rotation away, cell by cell, from the layout it
 * was scrambled out of.
 *
 * Direction bits, clockwise from up: north 1, east 2, south 4, west 8. Rotating
 * a tile clockwise by one step is `((mask << 1) | (mask >> 3)) & 15`.
 */

export const NORTH = 1;
export const EAST = 2;
export const SOUTH = 4;
export const WEST = 8;
export const FULL = NORTH | EAST | SOUTH | WEST;

export interface Puzzle {
  /** Board is `size` x `size`. */
  size: number;
  /** Stub directions per cell in the arrangement the board was scrambled from. */
  solution: number[];
  /** Stub directions per cell as the player first sees them. */
  start: number[];
  /** Index of the inkwell cell — where the ink enters. */
  source: number;
  /** Index of the seal cell — where the ink has to arrive. */
  target: number;
  /**
   * Rotations needed to reach `solution` from `start`, summed over the cells
   * that actually change shape when turned. Cells whose pipe is rotationally
   * symmetric (a cross, or a straight piece) are excluded, so the number is a
   * fair target rather than an inflated one.
   */
  par: number;
}

/** The two stubs on opposite sides of `direction`. */
export function opposite(direction: number): number {
  return direction < SOUTH ? direction << 2 : direction >> 2;
}

/** Rotate a stub mask clockwise, `times` quarter-turns. */
export function rotate(mask: number, times: number): number {
  let turned = mask & FULL;
  const steps = ((times % 4) + 4) % 4;
  for (let i = 0; i < steps; i++) {
    turned = ((turned << 1) | (turned >> 3)) & FULL;
  }
  return turned;
}

/**
 * How many quarter-turns it takes to map `mask` back onto itself. A cross is
 * order 1 (it looks the same at every angle), a straight piece is order 2, and
 * any other pipe is order 4.
 */
export function symmetryOrder(mask: number): number {
  if (rotate(mask, 1) === mask) return 1;
  if (rotate(mask, 2) === mask) return 2;
  return 4;
}

/** A small, fast, seeded PRNG. Deterministic for a given seed, on any machine. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a. Turns a date or a word into a seed, so the board is reproducible. */
export function hashString(value: string): number {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

/**
 * The board's key: the reader's own calendar date.
 *
 * Local rather than UTC on purpose. A board that turns over mid-afternoon
 * because someone else's midnight passed is a worse surprise than two friends
 * in different time zones comparing different boards for a few hours.
 */
export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** The human form of a board key, e.g. "16 October 2026". */
export function dateLabel(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const SEED_PREFIX = "inkline:v1:";

/** The board for a given key. Same key, same board, forever. */
export function puzzleFor(key: string, size = 5): Puzzle {
  return generate(size, hashString(`${SEED_PREFIX}${key}`));
}

/** Centre-left cell: where the ink enters. */
function sourceCell(size: number): number {
  return Math.floor(size / 2) * size;
}

/** Centre-right cell: the seal the ink has to reach. */
function targetCell(size: number): number {
  return Math.floor(size / 2) * size + (size - 1);
}

/**
 * A board for a seed, and the refusal to hand out one that is already finished.
 *
 * Each attempt re-streams the PRNG, so the result is still a pure function of
 * the seed — the same key always yields the same board — but "you cannot be
 * given a solved board" stops being a probability and becomes a guarantee.
 * Without this, roughly 1 board in 1000 arrived connected: the scramble could
 * line the middle row up straight and the ink would already be at the seal.
 */
export function generate(size: number, seed: number): Puzzle {
  for (let attempt = 0; attempt < 64; attempt++) {
    const puzzle = layout(size, seed + attempt);
    if (!isSolved(puzzle, puzzle.start)) return puzzle;
  }
  return layout(size, seed);
}

/** One construction pass. Pure, but not guaranteed to produce a puzzle. */
function layout(size: number, seed: number): Puzzle {
  const random = mulberry32(seed);
  const total = size * size;
  const rowOf = (cell: number) => Math.floor(cell / size);
  const colOf = (cell: number) => cell % size;

  type Neighbour = { cell: number; direction: number };
  const neighbours = (cell: number): Neighbour[] => {
    const row = rowOf(cell);
    const col = colOf(cell);
    const out: Neighbour[] = [];
    if (row > 0) out.push({ cell: cell - size, direction: NORTH });
    if (col < size - 1) out.push({ cell: cell + 1, direction: EAST });
    if (row < size - 1) out.push({ cell: cell + size, direction: SOUTH });
    if (col > 0) out.push({ cell: cell - 1, direction: WEST });
    return out;
  };

  const source = sourceCell(size);
  const target = targetCell(size);

  // 1. A spanning tree over every cell — the guarantee.
  const solution = new Array<number>(total).fill(0);
  const seen = new Array<boolean>(total).fill(false);
  const stack: number[] = [source];
  seen[source] = true;

  while (stack.length > 0) {
    const cell = stack[stack.length - 1];
    const options = neighbours(cell).filter((n) => !seen[n.cell]);
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const pick = options[Math.floor(random() * options.length)];
    solution[cell] |= pick.direction;
    solution[pick.cell] |= opposite(pick.direction);
    seen[pick.cell] = true;
    stack.push(pick.cell);
  }

  // 2. Extra links, so the board reads as a network with more than one way
  //    through it. Removing a route would break the guarantee; adding one
  //    cannot, so these only ever make the board more forgiving.
  // Only the east and south neighbours are listed, so each undirected edge is
  // considered exactly once and a picked pair is not added from both ends.
  const spare: Array<{ cell: number; next: number; direction: number }> = [];
  for (let cell = 0; cell < total; cell++) {
    for (const n of neighbours(cell)) {
      if (n.direction !== EAST && n.direction !== SOUTH) continue;
      if (!(solution[cell] & n.direction)) {
        spare.push({ cell, next: n.cell, direction: n.direction });
      }
    }
  }
  const extras = Math.round(total * 0.16);
  for (let i = 0; i < extras && spare.length > 0; i++) {
    const at = Math.floor(random() * spare.length);
    const { cell, next, direction } = spare[at];
    solution[cell] |= direction;
    solution[next] |= opposite(direction);
    spare.splice(at, 1);
  }

  // 3. Scramble, by rotating what is already known to work. At least half the
  //    board has to move, or "today's board" would sometimes be a formality.
  //
  //    Turns that leave the tile looking identical are excluded: a cross cannot
  //    turn at all, and a straight pipe turned twice is the same straight pipe.
  //    Charging a player for one of those would be charging for nothing.
  const movableTurns = (mask: number): number[] => {
    const out: number[] = [];
    for (let k = 1; k < 4; k++) {
      if (rotate(mask, k) !== mask) out.push(k);
    }
    return out;
  };

  let turns: number[] = [];
  let start: number[] = [];

  for (let attempt = 0; attempt < 40; attempt++) {
    turns = solution.map((mask) => {
      const options = movableTurns(mask);
      if (options.length === 0 || random() > 0.75) return 0;
      return options[Math.floor(random() * options.length)];
    });

    start = solution.map((mask, cell) => rotate(mask, turns[cell]));

    // A scramble can line a corridor up by luck, and then the board is finished
    // before it is dealt. Repair it by turning one tile on the live path, which is
    // the only kind of tile whose rotation can break the connection at all.
    //
    // Every rotation of the tile is considered, not just those that change the
    // shape relative to the *solution*: a straight pipe's two orientations are
    // one turn apart, so searching only shape-changing turns once left a
    // five-cell horizontal corridor permanently connected.
    if (isSolvedFrom(size, start, source, target)) {
      let repaired = false;
      for (const cell of liveCells(size, start, source)) {
        const before = start[cell];
        for (let k = 0; k < 4 && !repaired; k++) {
          const candidate = rotate(solution[cell], k);
          if (candidate === before) continue;
          start[cell] = candidate;
          if (isSolvedFrom(size, start, source, target)) {
            start[cell] = before;
          } else {
            turns[cell] = k;
            repaired = true;
          }
        }
        if (repaired) break;
      }
    }

    // The acceptance test is measured on the board as it will be dealt, not on
    // the turn counts that produced it. The repair above can leave a tile back
    // in its solved orientation, so counting turns alone allowed boards to be
    // handed out below the half-scrambled floor this loop exists to enforce.
    const moved = start.filter((mask, cell) => mask !== solution[cell]).length;
    if (moved >= Math.ceil(total * 0.5)) break;
  }

  // Par: the cheapest way to restore the arrangement this board was scrambled
  // from, summed cell by cell. For every cell that means the smallest number of
  // quarter-turns that turns `start` into `solution`, so a tile that cannot
  // change is never charged and a straight pipe is charged 1, not 3.
  //
  // It is an upper bound rather than a floor: the extra links mean a resourceful
  // player can sometimes find a shorter route through the board, so the page
  // offers par as a target to beat, not a score they are allowed to match.
  let par = 0;
  for (let cell = 0; cell < total; cell++) {
    for (let k = 0; k < 4; k++) {
      if (rotate(start[cell], k) === solution[cell]) {
        par += k;
        break;
      }
    }
  }

  return { size, solution, start, source, target, par };
}

/**
 * Every cell the ink has actually reached, starting at the inkwell and only
 * crossing where two neighbouring pipes point at each other.
 */
export function liveCells(size: number, masks: number[], source: number): Set<number> {
  const reached = new Set<number>([source]);
  const queue: number[] = [source];

  while (queue.length > 0) {
    const cell = queue.pop();
    if (cell === undefined) break;
    const row = Math.floor(cell / size);
    const col = cell % size;
    const mask = masks[cell];

    const step = (direction: number, nextRow: number, nextCol: number) => {
      if (nextRow < 0 || nextCol < 0 || nextRow >= size || nextCol >= size) return;
      if (!(mask & direction)) return;
      const next = nextRow * size + nextCol;
      if (!(masks[next] & opposite(direction))) return;
      if (reached.has(next)) return;
      reached.add(next);
      queue.push(next);
    };

    step(NORTH, row - 1, col);
    step(EAST, row, col + 1);
    step(SOUTH, row + 1, col);
    step(WEST, row, col - 1);
  }

  return reached;
}

function isSolvedFrom(
  size: number,
  masks: number[],
  source: number,
  target: number,
): boolean {
  return liveCells(size, masks, source).has(target);
}

/** Has the ink reached the seal? */
export function isSolved(puzzle: Puzzle, masks: number[]): boolean {
  return liveCells(puzzle.size, masks, puzzle.source).has(puzzle.target);
}

/** Is every pipe on the board carrying ink? */
export function isWholeNetworkLive(puzzle: Puzzle, masks: number[]): boolean {
  return liveCells(puzzle.size, masks, puzzle.source).size === puzzle.size * puzzle.size;
}

/**
 * Can this piece be turned into a visibly different orientation?
 *
 * Only a four-way junction is fully rotationally symmetric (any other pipe has
 * at least two distinct orientations), and a control that promises to rotate
 * something which cannot change is a dead end — so the UI asks first.
 */
export function isTurnable(mask: number): boolean {
  return symmetryOrder(mask) !== 1;
}

const DIRECTION_NAMES: Array<[number, string]> = [
  [NORTH, "north"],
  [EAST, "east"],
  [SOUTH, "south"],
  [WEST, "west"],
];

/** "north and east" — used for the accessible name of every tile. */
export function describeMask(mask: number): string {
  const names = DIRECTION_NAMES.filter(([bit]) => mask & bit).map(([, name]) => name);
  if (names.length === 4) return "all four directions";
  if (names.length === 3) return `${names[0]}, ${names[1]} and ${names[2]}`;
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return names[0] ?? "no";
}

/** Human position, e.g. "row 3, column 1". */
export function describePosition(cell: number, size: number): string {
  return `row ${Math.floor(cell / size) + 1}, column ${(cell % size) + 1}`;
}

/**
 * The full accessible name of a tile. It states the position, the shape in its
 * current rotation, and what the control does — so a screen reader user can
 * play without seeing the board.
 */
export function tileLabel(cell: number, mask: number, size: number): string {
  const position = describePosition(cell, size);
  if (!isTurnable(mask)) {
    return `Tile ${position}, a four-way junction. Nothing to turn — it already connects in every direction.`;
  }
  const shape = describeMask(mask);
  return `Tile ${position}, pipe pointing ${shape}. Rotate 90 degrees clockwise.`;
}
