import type { Id, GridPoint } from "./common";

export type Hole = {
  id: Id;
  grid: GridPoint;
};

export type Protoboard = {
  id: Id;
  cols: number;
  rows: number;
  holes: Record<Id, Hole>;
  tracks: Record<Id, Track>;
};

export type Track = {
  id: Id;
  holeIds: Id[];
  kind: "row" | "bus";
};
