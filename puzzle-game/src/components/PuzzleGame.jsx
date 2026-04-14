import React from "react";
import Modal from "./Modal";
import PuzzleDragLayer from "./PuzzleDragLayer";
import PuzzleBoard from "./PuzzleBoard";
import { motion } from "framer-motion";
import usePuzzleGame from "../hooks/usePuzzleGame";
import { puzzles } from "../util/data";
import { FaShuffle } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useLocation } from "react-router-dom";

const PuzzleGame = () => {
  const location = useLocation();
  const puzzleIdFromHome = location.state?.puzzleId || "puzzle1";

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
    showHint,
    triggerHint,
    shuffleBoard,
    hintActive,
  } = usePuzzleGame(puzzleIdFromHome);

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
          showHint={showHint}
        />

        <div className="puzzle-selection">
          <div className="custom-select">
            <motion.select
              whileHover={{ scale: 1.02 }}
              id="puzzle"
              name="puzzle"
              value={selectedPuzzle}
              onChange={(e) => handlePuzzleSelect(e.target.value)}
              disabled={hintActive}
            >
              {Object.values(puzzles).map((puzzleObj) => (
                <option key={puzzleObj.id} value={puzzleObj.id}>
                  {puzzleObj.name}
                </option>
              ))}
            </motion.select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={randomPuzzle}
            disabled={hintActive}
          >
            <p>
              <FaShuffle />
            </p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={triggerHint}
            disabled={hintActive}
          >
            <p>
              <HiOutlineLightBulb />
            </p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={shuffleBoard}
            disabled={hintActive}
          >
            <p>
              <MdOutlineRestartAlt />
            </p>
          </motion.button>
        </div>

        <div className="puzzle-info">
          <h2>{puzzles[selectedPuzzle].title}</h2>
          <p>{puzzles[selectedPuzzle].description}</p>
        </div>
      </div>
    </>
  );
};

export default PuzzleGame;
