import React from "react";
import Modal from "./Modal";
import PuzzleDragLayer from "./PuzzleDragLayer";
import PuzzleBoard from "./PuzzleBoard";
import { motion } from "framer-motion";
import usePuzzleGame from "../hooks/usePuzzleGame";

const PuzzleGame = () => {
  const {
    GRID,
    positions,
    isOpen,
    won,
    draggingSlot,
    setDraggingSlot,
    puzzle,
    selectedPuzzle,
    groups,
    handleClose,
    swapClusterToSlot,
    handlePuzzleSelect,
    randomPuzzle,
  } = usePuzzleGame();

  return (
    <>
      {won && <Modal isOpen={isOpen} onClose={handleClose} />}


      <PuzzleDragLayer />
      <div className="game-container">
        <PuzzleBoard
          GRID={GRID}
          positions={positions}
          draggingSlot={draggingSlot}
          setDraggingSlot={setDraggingSlot}
          swapClusterToSlot={swapClusterToSlot}
          puzzle={puzzle}
          groups={groups}
        />

        <div className="puzzle-selection">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="button"
            onClick={randomPuzzle}
          >
            <p>Random</p>
          </motion.button>

          <div className="custom-select">
            <select
              id="puzzle"
              name="puzzle"
              value={selectedPuzzle}
              onChange={(e) => handlePuzzleSelect(e.target.value)}
            >
              <option value="puzzle1">Puzzle 1</option>
              <option value="puzzle2">Puzzle 2</option>
              <option value="puzzle3">Puzzle 3</option>
              <option value="puzzle4">Puzzle 4</option>
              <option value="puzzle5">Puzzle 5</option>
              <option value="puzzle6">Puzzle 6</option>
              <option value="puzzle7">Puzzle 7</option>
              <option value="puzzle8">Puzzle 8</option>
              <option value="puzzle9">Puzzle 9</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PuzzleGame;
