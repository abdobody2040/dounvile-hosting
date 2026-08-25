// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PublicLayout } from "../client/src/components/PublicLayout";

vi.mock("@/hooks/useRevealMotion", () => ({ useRevealMotion: vi.fn() }));
vi.mock("@/const", () => ({ startLogin: vi.fn() }));

function renderLayout() {
  return render(<PublicLayout><main>محتوى الصفحة</main></PublicLayout>);
}

function swipeFromEdge(container: HTMLElement, endX: number, endY = 240) {
  const zone = container.querySelector(".mobile-edge-swipe-zone");
  if (!zone) throw new Error("Mobile edge swipe zone was not rendered");
  fireEvent.pointerDown(zone, { pointerId: 1, pointerType: "touch", clientX: 373, clientY: 240 });
  fireEvent.pointerUp(zone, { pointerId: 1, pointerType: "touch", clientX: endX, clientY: endY });
}

beforeEach(() => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 375, writable: true });
  Object.defineProperty(HTMLElement.prototype, "setPointerCapture", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "hasPointerCapture", { configurable: true, value: vi.fn(() => true) });
  Object.defineProperty(HTMLElement.prototype, "releasePointerCapture", { configurable: true, value: vi.fn() });
  window.history.replaceState({}, "", "/");
});

afterEach(cleanup);

describe("mobile drawer pointer interactions", () => {
  it("opens with an edge swipe and closes after a committed drawer swipe", async () => {
    const { container } = renderLayout();
    swipeFromEdge(container, 292);

    const drawer = await screen.findByRole("dialog", { name: "قائمة Dounvile للجوال" });
    fireEvent.pointerDown(drawer, { pointerId: 2, pointerType: "touch", clientX: 88, clientY: 290 });
    fireEvent.pointerUp(drawer, { pointerId: 2, pointerType: "touch", clientX: 172, clientY: 292 });

    await waitFor(() => expect(screen.queryByRole("dialog", { name: "قائمة Dounvile للجوال" })).toBeNull());
  });

  it("does not open for short or vertical edge swipes", () => {
    const shortSwipe = renderLayout();
    swipeFromEdge(shortSwipe.container, 344);
    expect(screen.queryByRole("dialog", { name: "قائمة Dounvile للجوال" })).toBeNull();
    shortSwipe.unmount();

    const verticalSwipe = renderLayout();
    swipeFromEdge(verticalSwipe.container, 295, 330);
    expect(screen.queryByRole("dialog", { name: "قائمة Dounvile للجوال" })).toBeNull();
  });
});
