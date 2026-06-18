import { test, expect } from "@playwright/test";

/**
 * Structural + visual smoke tests across viewports.
 *
 * For every page × viewport we assert there's no horizontal overflow (the exact
 * bug class that bit the Agent Mesh on mobile) and capture a full-page
 * screenshot into test-results/ for eyeballing. Add routes to PAGES as the site
 * grows (e.g. /projects once that branch merges); a route that 404s is skipped
 * rather than failing, so the same suite works across branches.
 */
const PAGES = [{ name: "home", path: "/" }];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const pageDef of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${pageDef.name} @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const res = await page.goto(pageDef.path, { waitUntil: "networkidle" });

      test.skip(res?.status() === 404, `${pageDef.path} not present on this branch`);
      expect(res?.ok(), `${pageDef.path} should load`).toBeTruthy();

      // No horizontal overflow: document must not be wider than the viewport.
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(1);

      await page.screenshot({
        path: `test-results/${pageDef.name}-${vp.name}.png`,
        fullPage: true,
      });
    });
  }
}
