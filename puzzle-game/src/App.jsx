import { useState } from "react";
import "./App.css";
import PuzzleGame from "./components/PuzzleGame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend } from "react-dnd-multi-backend";

function App() {
  const HTML5toTouch = {
    backends: [
      {
        id: "html5",
        backend: HTML5Backend,
      },
      {
        id: "touch",
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
      },
    ],
  };

  return (
    <>
      <div className="title">Welcome to the brain game!</div>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <PuzzleGame />
      </DndProvider>
    </>
  );
}

export default App;
