import type { ComponentInstance, Wire } from "../core/models";

export type EditorState = {
  components: ComponentInstance[];
  wires: Wire[];
  selectedIds: string[];
};
