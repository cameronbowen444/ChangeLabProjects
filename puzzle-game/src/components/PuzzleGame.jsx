import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import PuzzleDragLayer from "./PuzzleDragLayer";
import PuzzleBoard from "./PuzzleBoard";
import { motion } from "framer-motion";
import usePuzzleGame from "../hooks/usePuzzleGame";
import { puzzles } from "../util/data";
import { FaShuffle } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineRestartAlt } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import InstructionsModal from "./InstructionsModal";

const PuzzleGame = () => {
  const [showJapanese, setShowJapanese] = useState(true);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

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
      <InstructionsModal
        isOpen={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />
      {won && <Modal isOpen={isOpen} onClose={handleClose} />}
      <div className="puzzle-title">
        <h3 className="title">
          {showJapanese ? "日本な久片" : "Pieces of Japan"}
        </h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          className="button top-button"
          onClick={() => setShowJapanese(!showJapanese)}
        >
          {showJapanese ? "English" : "日本語"}
        </motion.button>
      </div>

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
        <Link to="/" className="left-button">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={randomPuzzle}
            disabled={hintActive}
          >
            <h5>
              {showJapanese ? (
                <div className="japanese">家</div>
              ) : (
                <div>Home</div>
              )}
              {/* <IoMdArrowRoundBack  /> */}
            </h5>
          </motion.button>
        </Link>
        <div className="right-buttons">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={randomPuzzle}
            disabled={hintActive}
          >
            <h5 className="btn-content">
              {showJapanese ? (
                <div className="japanese">シャッフル</div>
              ) : (
                <div>Shuffle</div>
              )}
              {/* <FaShuffle /> */}
            </h5>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={shuffleBoard}
            disabled={hintActive}
          >
            <h5 className="btn-content">
              {showJapanese ? (
                <div className="japanese">リスタート</div>
              ) : (
                <div>Restart</div>
              )}
              {/* <MdOutlineRestartAlt  /> */}
            </h5>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={triggerHint}
            disabled={hintActive}
          >
            <h5 className="btn-content">
              {showJapanese ? (
                <div className="japanese">ヒント</div>
              ) : (
                <div>Hint</div>
              )}
              {/* <HiOutlineLightBulb /> */}
            </h5>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            className="button"
            onClick={() => setInstructionsOpen(true)}
            disabled={hintActive}
          >
            <h5 className="button-content">
              <span>{showJapanese ? "説明書" : "Instructions"}</span>
            </h5>
          </motion.button>
        </div>
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
                {showJapanese ? puzzleObj.name : puzzleObj.title}
              </option>
            ))}
          </motion.select>
        </div>
        {/* <div className="puzzle-info">
            <h2>{puzzles[selectedPuzzle].title}</h2>
            <p>{puzzles[selectedPuzzle].description}</p>
          </div> */}
      </div>
    </>
  );
};

export default PuzzleGame;
