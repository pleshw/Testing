import type { Id } from "./common";

export type Source = {
  id: Id;
  kind: "dc";
  voltage: number;
  positiveHoleId: Id;
  negativeHoleId: Id;
};
