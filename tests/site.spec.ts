import { test, expect } from "@playwright/test";

test.describe("Ovun Bistro site", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("has RTL Arabic document + title", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page).toHaveTitle(/أوفن بيسترو/);
  });

  test("preloader hides and hero is visible", async ({ page }) => {
    await page.waitForTimeout(1500);
    const pre = page.locator("#preloader");
    await expect(pre).toHaveCSS("display", "none");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("rating 4.5 / 4404 is shown", async ({ page }) => {
    await expect(page.locator(".rating-chip")).toContainText("4.5");
    await expect(page.getByText("4,404", { exact: false }).first()).toBeVisible();
  });

  test("every img references an existing curated file", async ({ page }) => {
    const allowed = ["ov-3", "ov-4", "ov-5", "ov-6", "ov-7", "ov-8", "ov-9", "ov-10", "ov-11"];
    const srcs = await page.locator("img").evaluateAll((els) =>
      els.map((e) => (e as HTMLImageElement).getAttribute("src") || "")
    );
    for (const s of srcs) {
      expect(s).toMatch(/assets\/img\/ov-\d+\.jpg/);
      const base = s.match(/ov-\d+/)?.[0] || "";
      expect(allowed).toContain(base);
    }
  });

  test("all images have alt text", async ({ page }) => {
    const missing = await page.locator("img:not([alt])").count();
    expect(missing).toBe(0);
  });

  test("mobile full-screen menu opens with visible close", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#burger").click();
    const menu = page.locator("#mobileMenu");
    await expect(menu).toHaveClass(/open/);
    await expect(page.locator("#mmClose")).toBeVisible();
    const box = await menu.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(380);
  });

  test("no horizontal scroll at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(overflow).toBe(false);
  });

  test("reservation form validates and builds wa.me link", async ({ page }) => {
    await page.locator("#rName").fill("سعود");
    await page.locator("#rPhone").fill("0551234567");
    await page.locator("#rGuests").selectOption("4");
    await page.locator("#rDate").fill("2026-07-01");
    await page.locator("#rTime").fill("21:00");
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.locator("#reserveForm button[type=submit]").click(),
    ]);
    expect(popup.url()).toContain("wa.me/966533615888");
    const stored = await page.evaluate(() => localStorage.getItem("ovun_reservation"));
    expect(stored).toContain("سعود");
  });

  test("JSON-LD Restaurant with aggregateRating", async ({ page }) => {
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const json = JSON.parse(ld || "{}");
    expect(json["@type"]).toBe("Restaurant");
    expect(json.aggregateRating.ratingValue).toBe("4.5");
    expect(json.aggregateRating.reviewCount).toBe("4404");
  });

  test("floating FABs: whatsapp, call, maps", async ({ page }) => {
    await expect(page.locator(".fab-wa")).toHaveAttribute("href", /wa\.me\/966533615888/);
    await expect(page.locator(".fab-call")).toHaveAttribute("href", /tel:0533615888/);
    await expect(page.locator(".fab-map")).toHaveAttribute("href", /maps/);
  });
});
