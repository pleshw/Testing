import { useMemo, useState } from "react";
import "./App.css";
import type { ComponentInstance, ComponentType, GridPoint } from "./core/models";
import { boardConfig } from "./ui/boardConfig";
import { gridToPixel, snapToGrid } from "./core/board/grid";
import { createProtoboard } from "./core/board/protoboard";

const createId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const componentLibrary: { type: ComponentType; label: string }[] = [
  { type: "resistor", label: "Resistor" },
  { type: "led", label: "LED" },
  { type: "capacitor", label: "Capacitor" },
  { type: "source", label: "Fonte DC" },
];

const defaultPins = (type: ComponentType): ComponentInstance["pins"] => {
  switch (type) {
    case "resistor":
    case "led":
    case "capacitor":
      return [
        { id: createId(), name: "A", offset: { col: 0, row: 0 } },
        { id: createId(), name: "B", offset: { col: 1, row: 0 } },
      ];
    case "source":
      return [
        { id: createId(), name: "+", offset: { col: 0, row: 0 } },
        { id: createId(), name: "-", offset: { col: 1, row: 0 } },
      ];
    default:
      return [];
  }
};

const createInstance = (type: ComponentType, position: GridPoint): ComponentInstance => ({
  id: createId(),
  type,
  position,
  rotation: 0,
  pins: defaultPins(type),
});

export default function App() {
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const board = useMemo(
    () => createProtoboard("board-1", boardConfig.cols, boardConfig.rows),
    []
  );

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("component-type") as ComponentType;
    if (!type) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const snapped = snapToGrid(point, boardConfig);

    setComponents((prev) => [...prev, createInstance(type, snapped)]);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Protoboard Lab</h1>
          <p>Arraste componentes para a placa</p>
        </div>
        <div className="library">
          {componentLibrary.map((item) => (
            <div
              key={item.type}
              className="library-item"
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("component-type", item.type)
              }
            >
              <span className="library-label">{item.label}</span>
              <span className="library-type">{item.type}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className="workspace">
        <section className="board-section">
          <header className="board-header">
            <div>
              <h2>Protoboard</h2>
              <p>{board.cols} colunas · {board.rows} linhas</p>
            </div>
            <div className="status-pill">Base visual inicial</div>
          </header>
          <div className="board" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="board-grid">
              {Object.values(board.holes).map((hole) => (
                <div
                  key={hole.id}
                  className="hole"
                  style={{
                    left: boardConfig.origin.x + hole.grid.col * boardConfig.cellSize,
                    top: boardConfig.origin.y + hole.grid.row * boardConfig.cellSize,
                  }}
                />
              ))}
            </div>
            {components.map((component) => {
              const pixel = gridToPixel(component.position, boardConfig);
              return (
                <div
                  key={component.id}
                  className={`component component-${component.type}`}
                  style={{
                    left: pixel.x,
                    top: pixel.y,
                  }}
                >
                  <div className="component-label">{component.type}</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
