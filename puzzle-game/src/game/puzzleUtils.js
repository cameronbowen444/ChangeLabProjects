export const GRID = 5;

export const idxToRC = (i) => ({
  r: Math.floor(i / GRID),
  c: i % GRID,
});

export const rcToIdx = (r, c) => r * GRID + c;

export const checkWin = (positions) => {
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] !== i) return false;
  }
  return true;
};

export const shufflePositionsArray = (positions) => {
  let newPos = [...positions];

  do {
    newPos = [...positions];
    newPos.sort(() => Math.random() - 0.5);
  } while (newPos.every((value, index) => value === index));

  return newPos;
};

export const buildGroups = (positions) => {
  const n = GRID * GRID;
  const parent = Array.from({ length: n }, (_, i) => i);

  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const union = (a, b) => {
    a = find(a);
    b = find(b);
    if (a !== b) parent[b] = a;
  };

  const isCorrectNeighbor = (pieceA, pieceB, dRow, dCol) => {
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

    if (c < GRID - 1) {
      const rightSlot = slot + 1;
      const rightPiece = positions[rightSlot];
      if (isCorrectNeighbor(pieceHere, rightPiece, 0, 1)) {
        union(slot, rightSlot);
      }
    }

    if (r < GRID - 1) {
      const bottomSlot = slot + GRID;
      const bottomPiece = positions[bottomSlot];
      if (isCorrectNeighbor(pieceHere, bottomPiece, 1, 0)) {
        union(slot, bottomSlot);
      }
    }
  }

  const groupIdOf = Array(n)
    .fill(0)
    .map((_, i) => find(i));

  const members = new Map();

  for (let i = 0; i < n; i++) {
    const g = groupIdOf[i];
    if (!members.has(g)) members.set(g, []);
    members.get(g).push(i);
  }

  return { groupIdOf, members };
};

export const moveClusterPositions = (positions, fromSlot, toSlot, groups) => {
  if (fromSlot === toSlot) return positions;

  const groupId = groups.groupIdOf[fromSlot];
  const fromSlots = groups.members.get(groupId) || [fromSlot];

  const fromRC = idxToRC(fromSlot);
  const toRC = idxToRC(toSlot);
  const dr = toRC.r - fromRC.r;
  const dc = toRC.c - fromRC.c;

  if (dr === 0 && dc === 0) return positions;

  const add = (idx, ddr, ddc) => {
    const { r, c } = idxToRC(idx);
    const nr = r + ddr;
    const nc = c + ddc;
    return rcToIdx(nr, nc);
  };

  const S = new Set(fromSlots);
  const T = new Set();

  for (const s of fromSlots) {
    const { r, c } = idxToRC(s);
    const nr = r + dr;
    const nc = c + dc;

    if (nr < 0 || nr >= GRID || nc < 0 || nc >= GRID) return positions;

    T.add(rcToIdx(nr, nc));
  }

  const next = [...positions];

  for (const t of T) {
    const pre = add(t, -dr, -dc);
    next[t] = positions[pre];
  }

  for (const s of S) {
    if (T.has(s)) continue;

    let y = s;
    while (S.has(add(y, dr, dc))) {
      y = add(y, dr, dc);
    }

    const entering = add(y, dr, dc);
    next[s] = positions[entering];
  }

  return next;
};
