import React from "react";
import { useDragLayer } from "react-dnd";
const ItemTypes = { TILE: "TILE" };

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 9999,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

const PuzzleDragLayer = () => {
  const { isDragging, itemType, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(), // cursor relative to source
    }),
  );

  if (!isDragging || itemType !== ItemTypes.TILE || !item || !currentOffset)
    return null;

  const { groupPieces, fromSlot, tileW, tileH, GRID, puzzle, boardSize } = item;

  const anchorR = Math.floor(fromSlot / GRID);
  const anchorC = fromSlot % GRID;

  // render whole group chunk at cursor
  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return (
    <div style={layerStyles}>
      <div style={{ transform }}>
        {groupPieces.map(({ slot, pieceId }) => {
          const slotR = Math.floor(slot / GRID);
          const slotC = slot % GRID;

          // position each tile relative to the grabbed tile
          const dx = (slotC - anchorC) * tileW;
          const dy = (slotR - anchorR) * tileH;

          const pieceCol = pieceId % GRID;
          const pieceRow = Math.floor(pieceId / GRID);
          const bgX = pieceCol * tileW;
          const bgY = pieceRow * tileH;

          return (
            <div
              key={slot}
              style={{
                position: "absolute",
                left: dx,
                top: dy,
                width: tileW,
                height: tileH,
                backgroundImage: `url('${puzzle}')`,
                backgroundSize: `${boardSize.w}px ${boardSize.h}px`,
                backgroundPosition: `-${bgX}px -${bgY}px`,

              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleDragLayer;
