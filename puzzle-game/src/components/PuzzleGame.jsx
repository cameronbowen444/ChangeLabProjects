import React, { useState, useEffect, useRef, useMemo } from "react";
import Modal from "./Modal";
import PuzzleTile from "./PuzzleTile";
import PuzzleDragLayer from "./PuzzleDragLayer";
import { getRandomPuzzle, puzzles } from "../util/data";
import { useDrop } from "react-dnd";
import { motion } from "framer-motion";

const GRID = 5; // 5x5
const idxToRC = (i) => ({ r: Math.floor(i / GRID), c: i % GRID });
const rcToIdx = (r, c) => r * GRID + c;

const PuzzleGame = () => {
  const [positions, setPositions] = useState([...Array(GRID * GRID).keys()]);
  const [isOpen, setIsOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [draggingSlot, setDraggingSlot] = useState(null);
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
  const [puzzle, setPuzzle] = useState(puzzles["puzzle1"]);
  const [selectedPuzzle, setSelectedPuzzle] = useState("puzzle1");
  const [isReady, setIsReady] = useState(false);

  const boardRef = useRef(null);

  useEffect(() => {
  setPositions((prevPositions) => {
    let newPos = [...prevPositions];

    do {
      newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
    } while (newPos.every((value, index) => value === index)); // avoid solved start

    return newPos;
  });

  setIsReady(true);
}, []);

  // Measure board size responsively
  useEffect(() => {
    if (!boardRef.current) return;
    const el = boardRef.current;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setBoardSize({ w: rect.width, h: rect.height });
    });

    ro.observe(el);
    const rect = el.getBoundingClientRect();
    setBoardSize({ w: rect.width, h: rect.height });

    return () => ro.disconnect();
  }, []);

  const tileW = boardSize.w / GRID;
  const tileH = boardSize.h / GRID;

  // Win = everything in correct slot (still allowed)
  const isWin = useMemo(() => {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] !== i) return false;
    }
    return true;
  }, [positions]);

  useEffect(() => {
  if (!isReady) return;

  if (isWin) {
    setWon(true);
    setIsOpen(true);
  }
}, [isWin, isReady]);

  const handleClose = () => setIsOpen(false);

  const groups = useMemo(() => {
    const n = GRID * GRID;
    const parent = Array.from({ length: n }, (_, i) => i);

    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const union = (a, b) => {
      a = find(a);
      b = find(b);
      if (a !== b) parent[b] = a;
    };

    // connect a<->b if:
    // - slots a and b are adjacent
    // - and pieces in those slots are "correct neighbors" in the solved image
    const isCorrectNeighbor = (pieceA, pieceB, dRow, dCol) => {
      // pieceB should be at (rowA + dRow, colA + dCol) in solved image
      const ra = Math.floor(pieceA / GRID);
      const ca = pieceA % GRID;
      const rb = ra + dRow;
      const cb = ca + dCol;
      if (rb < 0 || rb >= GRID || cb < 0 || cb >= GRID) return false;
      return pieceB === rb * GRID + cb;
    };

    for (let slot = 0; slot < n; slot++) {
      const { r, c } = idxToRC(slot);
      const pieceHere = positions[slot];

      // right neighbor
      if (c < GRID - 1) {
        const rightSlot = slot + 1;
        const rightPiece = positions[rightSlot];
        if (isCorrectNeighbor(pieceHere, rightPiece, 0, 1))
          union(slot, rightSlot);
      }
      // bottom neighbor
      if (r < GRID - 1) {
        const bottomSlot = slot + GRID;
        const bottomPiece = positions[bottomSlot];
        if (isCorrectNeighbor(pieceHere, bottomPiece, 1, 0))
          union(slot, bottomSlot);
      }
    }

    // groupId per slot
    const groupIdOf = Array(n)
      .fill(0)
      .map((_, i) => find(i));

    // members per groupId
    const members = new Map();
    for (let i = 0; i < n; i++) {
      const g = groupIdOf[i];
      if (!members.has(g)) members.set(g, []);
      members.get(g).push(i);
    }

    return { groupIdOf, members };
  }, [positions]);

  // -------- MOVE: swap a cluster "shape region" --------
  const swapClusterToSlot = (fromSlot, toSlot) => {
    if (fromSlot === toSlot) return;

    const groupId = groups.groupIdOf[fromSlot];
    const fromSlots = groups.members.get(groupId) || [fromSlot];

    const fromRC = idxToRC(fromSlot);
    const toRC = idxToRC(toSlot);
    const dr = toRC.r - fromRC.r;
    const dc = toRC.c - fromRC.c;
    if (dr === 0 && dc === 0) return;

    const add = (idx, ddr, ddc) => {
      const { r, c } = idxToRC(idx);
      const nr = r + ddr;
      const nc = c + ddc;
      return rcToIdx(nr, nc);
    };

    // Build sets S (source) and T (translated)
    const S = new Set(fromSlots);
    const T = new Set();

    for (const s of fromSlots) {
      const { r, c } = idxToRC(s);
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= GRID || nc < 0 || nc >= GRID) return; // bounds
      T.add(rcToIdx(nr, nc));
    }

    setPositions((prev) => {
      const next = [...prev];

      // 1) Rigid translate group: for every dest cell in T, pull from its preimage
      for (const t of T) {
        const pre = add(t, -dr, -dc); // t - (dr,dc)
        // pre is guaranteed to be in S (because T came from translating S)
        next[t] = prev[pre];
      }

      // 2) Fill vacated cells (S \ T) with displaced pieces from the entering edge
      for (const s of S) {
        if (T.has(s)) continue; // not vacated

        // walk forward along move direction while still inside S
        let y = s;
        while (S.has(add(y, dr, dc))) {
          y = add(y, dr, dc);
        }
        const entering = add(y, dr, dc); // first cell just outside S in move direction
        // entering must be in T \ S
        next[s] = prev[entering];
      }

      return next;
    });
  };
  const nearestSlotFromClientOffset = (pt) => {
    if (!pt || !boardRef.current) return null;

    const rect = boardRef.current.getBoundingClientRect();
    const x = pt.x - rect.left;
    const y = pt.y - rect.top;

    // nearest cell (round = forgiving)
    const c = Math.round(x / tileW - 0.5);
    const r = Math.round(y / tileH - 0.5);

    if (r < 0 || r >= GRID || c < 0 || c >= GRID) return null;

    // tolerance: how “close enough” you want it
    const centerX = (c + 0.5) * tileW;
    const centerY = (r + 0.5) * tileH;
    const dist = Math.hypot(x - centerX, y - centerY);

    const tolerance = 0.90 * Math.min(tileW, tileH); // tweak 0.6–0.9
    if (dist > tolerance) return null;

    return r * GRID + c;
  };
  const [, boardDropRef] = useDrop(
    () => ({
      accept: "TILE",
      drop: (item, monitor) => {
        // if a tile drop already handled it, don't double-drop
        if (monitor.didDrop()) return;

        const pt = monitor.getClientOffset();
        const toSlot = nearestSlotFromClientOffset(pt);
        if (toSlot == null) return;

        swapClusterToSlot(item.fromSlot, toSlot);
      },
    }),
    [tileW, tileH, swapClusterToSlot],
  );

  const handlePuzzleSelect = (e) => {
    const value = e.target.value;

    setSelectedPuzzle(value);
    setPuzzle(puzzles[value]);
    shufflePositions();
  };

  const shufflePositions = () => {
    setPositions((prev) => {
      const newPos = [...prev];
      newPos.sort(() => Math.random() - 0.5);
      return newPos;
    });
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

  return (
    <>
      {won && <Modal isOpen={isOpen} onClose={handleClose} />}
      <PuzzleDragLayer />
      <div className="game-container">
        <div
          className="puzzle-container"
          ref={(node) => {
            boardRef.current = node;
            boardDropRef(node);
          }}
        >
          {positions.map((pieceId, slotIndex) => (
            <PuzzleTile
              key={pieceId}
              slotIndex={slotIndex}
              pieceId={pieceId}
              draggingSlot={draggingSlot}
              setDraggingSlot={setDraggingSlot}
              swapClusterToSlot={swapClusterToSlot}
              puzzle={puzzle}
              boardSize={boardSize}
              GRID={GRID}
              tileW={tileW}
              tileH={tileH}
              groups={groups}
              positions={positions}
            />
          ))}
        </div>
        <div className="puzzle-selection">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="button"
            onClick={() => {
              const nextKey = getRandomDifferentKey(selectedPuzzle);

              setSelectedPuzzle(nextKey);
              setPuzzle(puzzles[nextKey]);
              shufflePositions();
            }}
          >
            <p>Random</p>
          </motion.button>
          <div className="custom-select">
            <select
              id="puzzle"
              name="puzzle"
              value={selectedPuzzle}
              onChange={handlePuzzleSelect}
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
