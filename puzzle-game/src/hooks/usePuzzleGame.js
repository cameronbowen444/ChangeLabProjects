import { useEffect, useMemo, useState } from "react";
import { puzzles } from "../util/data";
import {
  GRID,
  buildGroups,
  checkWin,
  moveClusterPositions,
  shufflePositionsArray,
} from "../game/puzzleUtils";

const usePuzzleGame = () => {
  const [positions, setPositions] = useState([...Array(GRID * GRID).keys()]);
  const [isOpen, setIsOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [draggingSlot, setDraggingSlot] = useState(null);
  const [puzzle, setPuzzle] = useState(puzzles["puzzle1"]);
  const [selectedPuzzle, setSelectedPuzzle] = useState("puzzle1");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setPositions((prevPositions) => shufflePositionsArray(prevPositions));
    setIsReady(true);
  }, []);

  const groups = useMemo(() => {
    return buildGroups(positions);
  }, [positions]);

  const isWin = useMemo(() => {
    return checkWin(positions);
  }, [positions]);

  useEffect(() => {
    if (!isReady) return;

    if (isWin) {
      setWon(true);
      setIsOpen(true);
    }
  }, [isWin, isReady]);
  
  useEffect(() => {
  const preloadAll = async () => {
    try {
      await Promise.all(
        Object.values(puzzles).map(
          (src) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            }),
        ),
      );

      setPositions((prev) => shufflePositionsArray(prev));
      setIsReady(true);
    } catch (error) {
      console.error("Image preload failed:", error);
    }
  };

  preloadAll();
}, []);

  const handleClose = () => setIsOpen(false);

  const swapClusterToSlot = (fromSlot, toSlot) => {
    setPositions((prev) => moveClusterPositions(prev, fromSlot, toSlot, groups));
  };

  const shuffleBoard = () => {
    setPositions((prev) => shufflePositionsArray(prev));
    setWon(false);
    setIsOpen(false);
  };

  const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

  const handlePuzzleSelect = async (value) => {
    try {
    await loadImage(puzzles[value]);
    setSelectedPuzzle(value);
    setPuzzle(puzzles[value]);
    setWon(false);
    setIsOpen(false);
    setPositions((prev) => shufflePositionsArray(prev));
  } catch (error) {
    console.error("Failed to load puzzle image:", error);
  }
  };

  const puzzleKeys = Object.keys(puzzles);

  const getRandomDifferentKey = (currentKey) => {
    if (puzzleKeys.length <= 1) return currentKey;

    let nextKey = currentKey;
    while (nextKey === currentKey) {
      nextKey = puzzleKeys[Math.floor(Math.random() * puzzleKeys.length)];
    }
    return nextKey;
  };

  const randomPuzzle = () => {
    const nextKey = getRandomDifferentKey(selectedPuzzle);
    handlePuzzleSelect(nextKey);
  };

  return {
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
    setPositions,
    shuffleBoard,
  };
};

export default usePuzzleGame;