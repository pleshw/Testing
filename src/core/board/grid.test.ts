import { describe, expect, it } from "vitest";
import { clamp, gridToPixel, isValidGridPoint, snapToGrid } from "./grid";

const config = {
  cols: 10,
  rows: 6,
  cellSize: 10,
  origin: { x: 0, y: 0 },
};

describe("grid helpers", () => {
  it("clamps values to bounds", () => {
    expect(clamp(-2, 0, 5)).toBe(0);
    expect(clamp(7, 0, 5)).toBe(5);
  });

  it("snaps to nearest grid point", () => {
    expect(snapToGrid({ x: 12, y: 17 }, config)).toEqual({ col: 1, row: 2 });
    expect(snapToGrid({ x: -5, y: 200 }, config)).toEqual({ col: 0, row: 5 });
  });

  it("converts grid point to pixel coordinates", () => {
    expect(gridToPixel({ col: 3, row: 2 }, config)).toEqual({ x: 30, y: 20 });
  });

  it("validates grid bounds", () => {
    expect(isValidGridPoint({ col: 0, row: 0 }, config)).toBe(true);
    expect(isValidGridPoint({ col: 10, row: 0 }, config)).toBe(false);
  });
});
