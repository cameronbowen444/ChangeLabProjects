import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import PuzzleTile from "./PuzzleTile";

const PuzzleBoard = ({
  GRID,
  positions,
  draggingSlot,
  setDraggingSlot,
  swapClusterToSlot,
  puzzle,
  groups,
}) => {
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
  const boardRef = useRef(null);

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

  const tileW = Math.floor(boardSize.w / GRID);
  const tileH = Math.floor(boardSize.h / GRID);

  const usedW = tileW * GRID;
  const usedH = tileH * GRID;
  

  const nearestSlotFromClientOffset = (pt) => {
    if (!pt || !boardRef.current) return null;

    const rect = boardRef.current.getBoundingClientRect();
    const x = pt.x - rect.left;
    const y = pt.y - rect.top;

    const c = Math.round(x / tileW - 0.5);
    const r = Math.round(y / tileH - 0.5);

    if (r < 0 || r >= GRID || c < 0 || c >= GRID) return null;

    const centerX = (c + 0.5) * tileW;
    const centerY = (r + 0.5) * tileH;
    const dist = Math.hypot(x - centerX, y - centerY);

    const tolerance = 0.95 * Math.min(tileW, tileH);
    if (dist > tolerance) return null;

    return r * GRID + c;
  };

  const [, boardDropRef] = useDrop(
    () => ({
      accept: "TILE",
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;

        const pt = monitor.getClientOffset();
        const toSlot = nearestSlotFromClientOffset(pt);
        if (toSlot == null) return;

        swapClusterToSlot(item.fromSlot, toSlot);
      },
    }),
    [tileW, tileH, swapClusterToSlot],
  );

  return (
    <div
      className="puzzle-container"
      ref={(node) => {
        boardRef.current = node;
        boardDropRef(node);
      }}
    >
          <div
      className="puzzle-grid"
      style={{
        width: usedW,
        height: usedH,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
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
          boardSize={{ w: usedW, h: usedH }}
          GRID={GRID}
          tileW={tileW}
          tileH={tileH}
          groups={groups}
          positions={positions}
        />
      ))}
    </div>
    </div>
  );
};

export default PuzzleBoard;
