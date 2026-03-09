import { useState } from "react";
import "./App.css";
import PuzzleGame from "./components/PuzzleGame";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {

  return (
    <>
      <div className="title">Welcome to the brain game!</div>
      <DndProvider backend={TouchBackend} options={{
          enableMouseEvents: true,
          delayTouchStart: 0,
        }}>
        <PuzzleGame />
      </DndProvider>
    </>
  );
}

export default App;
