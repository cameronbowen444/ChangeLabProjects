import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PuzzleGame from "./components/PuzzleGame";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/puzzle"
          element={
            <DndProvider
              backend={TouchBackend}
              options={{
                enableMouseEvents: true,
                delayTouchStart: 0,
              }}
            >
              <PuzzleGame />
            </DndProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
