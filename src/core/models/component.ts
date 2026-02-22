import type { Id, GridPoint } from "./common";
import type { Pin } from "./pin";

export type ComponentType =
  | "resistor"
  | "led"
  | "capacitor"
  | "source"
  | "wire"
  | "custom";

export type ComponentInstance = {
  id: Id;
  type: ComponentType;
  position: GridPoint;
  rotation: 0 | 90 | 180 | 270;
  pins: Pin[];
};
