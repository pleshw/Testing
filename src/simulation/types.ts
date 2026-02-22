import type { Node } from "../core/models";

export type SimulationState = {
  nodes: Node[];
  voltages: Record<string, number>;
  currents: Record<string, number>;
};
