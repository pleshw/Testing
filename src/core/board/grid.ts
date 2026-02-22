import type { GridPoint, Point } from "../models/common";

export type GridConfig = {
  cols: number;
  rows: number;
  cellSize: number;
  origin: Point;
};

export const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value === 0 ? 0 : value;
};

export const isValidGridPoint = (grid: GridPoint, config: GridConfig): boolean => {
  return (
    grid.col >= 0 &&
    grid.col < config.cols &&
    grid.row >= 0 &&
    grid.row < config.rows
  );
};

export const snapToGrid = (point: Point, config: GridConfig): GridPoint => {
  const col = Math.round((point.x - config.origin.x) / config.cellSize);
  const row = Math.round((point.y - config.origin.y) / config.cellSize);

  return {
    col: clamp(col, 0, config.cols - 1),
    row: clamp(row, 0, config.rows - 1),
  };
};

export const gridToPixel = (grid: GridPoint, config: GridConfig): Point => {
  return {
    x: config.origin.x + grid.col * config.cellSize,
    y: config.origin.y + grid.row * config.cellSize,
  };
};
