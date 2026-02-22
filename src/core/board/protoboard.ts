import type { Protoboard, Track } from "../models/protoboard";

const holeId = (col: number, row: number): string => `H${col}_${row}`;
const trackId = (kind: string, row: number, group: number): string =>
  `T_${kind}_${row}_${group}`;

export const createProtoboard = (id: string, cols: number, rows: number): Protoboard => {
  const holes: Protoboard["holes"] = {};
  const tracks: Protoboard["tracks"] = {};

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const idValue = holeId(col, row);
      holes[idValue] = { id: idValue, grid: { col, row } };
    }
  }

  const groupSize = 5;
  const groupCount = Math.floor(cols / groupSize);

  for (let row = 0; row < rows; row += 1) {
    for (let group = 0; group < groupCount; group += 1) {
      const startCol = group * groupSize;
      const holeIds: string[] = [];
      for (let col = startCol; col < startCol + groupSize; col += 1) {
        holeIds.push(holeId(col, row));
      }
      const idValue = trackId("row", row, group);
      const track: Track = { id: idValue, holeIds, kind: "row" };
      tracks[idValue] = track;
    }
  }

  const busRows = [0, rows - 1];
  for (const row of busRows) {
    const idValue = trackId("bus", row, 0);
    const holeIds: string[] = [];
    for (let col = 0; col < cols; col += 1) {
      holeIds.push(holeId(col, row));
    }
    tracks[idValue] = { id: idValue, holeIds, kind: "bus" };
  }

  return {
    id,
    cols,
    rows,
    holes,
    tracks,
  };
};
