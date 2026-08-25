import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const sourceUrl = new URL("../client/src/components/PublicLayout.tsx", import.meta.url);

describe("mobile navigation drawer accessibility contract", () => {
  it("keeps the drawer modal and keyboard-contained while open", async () => {
    const source = await readFile(sourceUrl, "utf8");

    expect(source).toContain('aria-modal="true"');
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain('event.key !== "Tab"');
    expect(source).toContain('setAttribute("inert", "")');
    expect(source).toContain('closeButtonRef.current?.focus()');
    expect(source).toContain('resolveDrawerOpenState(false');
    expect(source).toContain('resolveDrawerOpenState(true');
  });
});
