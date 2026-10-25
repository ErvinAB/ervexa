import { expect, test, type Locator, type Page } from "@playwright/test";
import { dateKey, isWholeNetworkLive, puzzleFor, rotate } from "../src/lib/puzzle";

/**
 * The board, driven the way a player drives it: a real pointer, a real keyboard,
 * and the real pixels.
 *
 * The unit suite in src/components/play/Inkline.test.tsx proves the drawing
 * follows the state. It cannot prove the click ever reaches the tile, because
 * jsdom has no layout: a full-screen overlay swallowing every click passes it.
 * That is the gap this file closes, and it is the gap the shipped bug hid in —
 * twice, an assertion that "the state changed" was mistaken for "the game
 * moved".
 *
 * The rules are imported from the shipped module rather than re-typed here, so
 * the route this test clicks is the route the game itself says is right.
 */

const TODAY = dateKey(new Date());
const PUZZLE = puzzleFor(TODAY);

/** The par route: one cell index per rotation, in the order par was measured. */
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

const boardOf = (page: Page) => page.getByRole("group", { name: /Inkline board/ });
const tilesOf = (page: Page) => boardOf(page).getByRole("button");
const turnableFirst = (page: Page) =>
  boardOf(page).locator('button[aria-label*="Rotate 90 degrees clockwise"]').first();
const pipeOf = (tile: Locator) => tile.locator("svg").first();

/** The tile's drawing, as the browser composed it — not as React declared it. */
const drawn = (tile: Locator) =>
  pipeOf(tile).evaluate((node) => getComputedStyle(node).transform);

/**
 * Wait for the drawing's composed transform to become something new.
 *
 * The tile eases into its new angle over 150ms, so reading the computed style
 * the instant the click resolves can catch the transition one frame in and still
 * report the old angle. Polling is not papering over a bug: the attribute is
 * asserted exactly first, and this only waits for the frame the browser paints.
 */
async function expectDrawnChanged(tile: Locator, before: string) {
  await expect.poll(() => drawn(tile), { timeout: 3000 }).not.toBe(before);
}

/** Screenshot with the pointer parked away, so hover never fakes a difference. */
async function pixels(page: Page, tile: Locator) {
  await page.mouse.move(2, 2);
  return tile.screenshot({ animations: "disabled" });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/play");
  await expect(boardOf(page)).toBeVisible();
});

test.describe("the board a player actually touches", () => {
  test("a real mouse click rotates the drawing, and the pixels move with it", async ({ page }) => {
    const tile = turnableFirst(page);
    await expect(tile).toBeVisible();

    const before = await drawn(tile);
    const beforePixels = await pixels(page, tile);

    await tile.click();

    // The exact assertion that was missing when the board shipped unplayable: the
    // rotation has to arrive on the drawing, not just on a counter.
    await expect(pipeOf(tile)).toHaveAttribute("style", /rotate\(90deg\)/);
    await expectDrawnChanged(tile, before);
    expect(await drawn(tile)).toMatch(/^matrix/);

    const afterPixels = await pixels(page, tile);
    expect(
      Buffer.compare(beforePixels, afterPixels),
      "the tile's pixels are identical before and after a turn",
    ).not.toBe(0);
  });

  test("nothing is sitting on top of the tile a player clicks", async ({ page }) => {
    const tile = turnableFirst(page);
    const box = await tile.boundingBox();
    if (!box) throw new Error("the tile has no box");

    const topmost = await page.evaluate(
      ([x, y]) => {
        const node = document.elementFromPoint(x as number, y as number);
        const button = node?.closest("button");
        return {
          tag: node?.tagName ?? null,
          insideATile: Boolean(button),
          name: button?.getAttribute("aria-label") ?? null,
        };
      },
      [box.x + box.width / 2, box.y + box.height / 2],
    );

    // A full-page overlay, a stray absolutely-positioned panel, or a pointer-events
    // mistake would all show up here and nowhere in the unit suite.
    expect(topmost.tag, "nothing is at the tile's centre at all").toBeTruthy();
    expect(topmost.insideATile, `the topmost element at the tile is <${topmost.tag}>`).toBe(true);
    expect(topmost.name).toContain("Rotate 90 degrees clockwise");
  });

  test("the counter follows the drawing", async ({ page }) => {
    const tile = turnableFirst(page);
    const rotations = page.locator("dt", { hasText: "Rotations" }).locator("+ dd");

    await expect(rotations).toHaveText(/^0 · par \d+$/);
    await tile.click();
    await expect(rotations).toHaveText(/^1 · par \d+$/);
    await tile.click();
    await expect(pipeOf(tile)).toHaveAttribute("style", /rotate\(180deg\)/);
    await expect(rotations).toHaveText(/^2 · par \d+$/);
  });
});

test.describe("the keyboard", () => {
  test("Enter and Space turn the tile that has focus", async ({ page }) => {
    // jsdom cannot test this: activating a button with Enter is native browser
    // behaviour, not something the component implements.
    const tile = turnableFirst(page);
    await tile.focus();
    await expect(tile).toBeFocused();

    const before = await drawn(tile);
    await page.keyboard.press("Enter");
    await expect(pipeOf(tile)).toHaveAttribute("style", /rotate\(90deg\)/);
    await expectDrawnChanged(tile, before);

    await page.keyboard.press("Space");
    await expect(pipeOf(tile)).toHaveAttribute("style", /rotate\(180deg\)/);
  });

  test("the arrow keys walk the board and stop at its edges", async ({ page }) => {
    const tiles = tilesOf(page);
    await tiles.nth(0).focus();

    await page.keyboard.press("ArrowRight");
    await expect(tiles.nth(1)).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(tiles.nth(1 + PUZZLE.size)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tiles.nth(PUZZLE.size)).toBeFocused();

    // The wall, not a wrap-around.
    await tiles.nth(0).focus();
    await page.keyboard.press("ArrowUp");
    await expect(tiles.nth(0)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(tiles.nth(0)).toBeFocused();
  });
});

test.describe("playing the board to the end", () => {
  test("the ink reaches the seal, and the board can then be brought fully alive", async ({
    page,
  }) => {
    const tiles = tilesOf(page);

    // The whole route, in one pass. Every click after the seal is reached is a
    // click on a board that used to be locked, so the finished network below is
    // itself the proof that the dead click is gone.
    for (const cell of ROUTE) await tiles.nth(cell).click();

    const status = page.getByRole("status");
    await expect(status).toBeVisible();
    await expect(status).toContainText("Seal reached");

    const banner = await status.innerText();
    const solvedIn = Number(/Solved in (\d+) rotations/.exec(banner)?.[1]);
    expect(solvedIn, `no solve count in: ${banner}`).toBeGreaterThan(0);
    // The solve lands short of par on almost every board, so the banner has to
    // report it as under par — and the network only finishes if play continued.
    expect(solvedIn).toBeLessThan(PUZZLE.par);
    await expect(status).toContainText(`${PUZZLE.par - solvedIn} under par`);

    expect(isWholeNetworkLive(PUZZLE, PUZZLE.solution)).toBe(true);
    await expect(page.getByText(/every pipe on the board is carrying ink/i)).toBeVisible();
    await expect(page.locator("dt", { hasText: "Rotations" }).locator("+ dd")).toHaveText(
      `${PUZZLE.par} · par ${PUZZLE.par}`,
    );
  });

  test("the board survives a reload, so a refresh is not a punishment", async ({ page }) => {
    const tiles = tilesOf(page);
    await tiles.nth(ROUTE[0]).click();
    await expect(page.locator("dt", { hasText: "Rotations" }).locator("+ dd")).toHaveText(
      /^1 · par \d+$/,
    );

    await page.reload();
    await expect(boardOf(page)).toBeVisible();
    await expect(page.locator("dt", { hasText: "Rotations" }).locator("+ dd")).toHaveText(
      /^1 · par \d+$/,
    );
  });
});

test.describe("on a phone", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    deviceScaleFactor: 3,
  });

  test("the board fits the screen, every tile is a legal tap target, and a tap turns one", async ({
    page,
  }) => {
    const tile = turnableFirst(page);
    await tile.scrollIntoViewIfNeeded();
    const box = await tile.boundingBox();
    if (!box) throw new Error("the tile has no box");

    // 44px is the smallest target a thumb can reliably hit.
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);

    // And nothing may push the page sideways on a 390px screen.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, "the page scrolls horizontally on a phone").toBeLessThanOrEqual(1);

    const before = await drawn(tile);
    await tile.tap();
    await expect(pipeOf(tile)).toHaveAttribute("style", /rotate\(90deg\)/);
    await expectDrawnChanged(tile, before);
  });
});
