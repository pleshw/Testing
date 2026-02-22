import type { Id } from "./common";

export type Wire = {
  id: Id;
  fromHoleId: Id;
  toHoleId: Id;
  color: string;
};
