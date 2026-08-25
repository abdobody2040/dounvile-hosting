import { describe, expect, it } from "vitest";
import { isEdgeOpenSwipe, resolveDrawerOpenState, shouldCloseDrawerBySwipe } from "../client/src/lib/mobileSwipe";

describe("mobile drawer swipe thresholds", () => {
  it("opens only for a deliberate leftward horizontal edge swipe", () => {
    expect(isEdgeOpenSwipe(-64, 8)).toBe(true);
    expect(isEdgeOpenSwipe(-35, 4)).toBe(false);
    expect(isEdgeOpenSwipe(-68, 70)).toBe(false);
  });

  it("closes for a committed rightward drag or a quick close fling", () => {
    expect(shouldCloseDrawerBySwipe(78, 120)).toBe(true);
    expect(shouldCloseDrawerBySwipe(24, 580)).toBe(true);
    expect(shouldCloseDrawerBySwipe(30, 180)).toBe(false);
  });

  it("resolves the actual drawer state for opening, closing, and protected scrolls", () => {
    expect(resolveDrawerOpenState(false, -70, 6)).toBe(true);
    expect(resolveDrawerOpenState(false, -32, 4)).toBe(false);
    expect(resolveDrawerOpenState(false, -74, 82)).toBe(false);
    expect(resolveDrawerOpenState(true, 82, 4)).toBe(false);
    expect(resolveDrawerOpenState(true, 26, 2, 600)).toBe(false);
    expect(resolveDrawerOpenState(true, 24, 6, 180)).toBe(true);
  });
});
