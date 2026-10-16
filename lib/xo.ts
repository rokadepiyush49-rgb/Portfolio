/**
 * The tic-tac-toe opponent.
 *
 * It is designed to lose — but the interesting constraint is that it has to
 * lose *convincingly*. Two rules do the work:
 *
 *   1. It never takes the cell that would complete the visitor's line.
 *      This is the whole Easter egg.
 *   2. It never creates a winning threat of its own. Not because it can't,
 *      but because a threat it then declines to convert is what actually
 *      exposes the trick — a machine that ignores its own open win reads as
 *      broken, while one that simply never builds toward a win reads as
 *      cautious. It follows that the visitor can never lose; the worst case
 *      is a draw.
 *
 * Everything else is ordinary positional play: take the centre, then corners,
 * and prefer cells that sit on lines already in contention. The result looks
 * like a real, slightly passive opponent rather than a random one.
 */

export type Mark = 'X' | 'O';
export type Cell = Mark | null;
export type Board = Cell[];

export const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const CENTER = 4;
const CORNERS = [0, 2, 6, 8];

export const emptyBoard = (): Board => Array<Cell>(9).fill(null);

export function findWin(board: Board): { player: Mark; line: readonly number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return { player: v, line };
  }
  return null;
}

export const isFull = (board: Board) => board.every((c) => c !== null);

/** Cells that would immediately complete a line for `player`. */
export function winningCells(board: Board, player: Mark): number[] {
  const out: number[] = [];
  for (const line of LINES) {
    const open = line.filter((i) => board[i] === null);
    const mine = line.filter((i) => board[i] === player).length;
    if (open.length === 1 && mine === 2) out.push(open[0]);
  }
  return out;
}

/** How many open wins playing here would leave O with. Zero is the goal. */
function threatsCreated(board: Board, index: number): number {
  const next = board.slice();
  next[index] = 'O';
  return winningCells(next, 'O').length;
}

/** How natural a given cell looks, ignoring whether it is tactically correct. */
function positionalScore(board: Board, index: number): number {
  let score = index === CENTER ? 5 : CORNERS.includes(index) ? 3 : 1;

  for (const line of LINES) {
    if (!line.includes(index)) continue;
    const others = line.filter((i) => i !== index);
    const os = others.filter((i) => board[i] === 'O').length;
    const xs = others.filter((i) => board[i] === 'X').length;

    if (os === 1 && xs === 1) score += 3; // sitting in a contested line
    else if (xs === 1 && os === 0) score += 1; // shadowing the visitor
  }

  return score;
}

/**
 * Pick O's move. Deterministic given a board, apart from a light shuffle so
 * repeated games don't play out identically.
 */
export function chooseMove(board: Board): number | null {
  const empty = board.reduce<number[]>((acc, c, i) => (c === null ? [...acc, i] : acc), []);
  if (empty.length === 0) return null;

  // Rule 2a — never actually take a win. Rule 2b keeps this from coming up
  // often, but it can when a forced move leaves O with a threat anyway, and
  // losing quietly matters more than looking clever in that corner case.
  const ownWins = new Set(winningCells(board, 'O'));
  const losing = empty.filter((i) => !ownWins.has(i));
  const base = losing.length ? losing : empty;

  // Rule 2b — stay away from anything that would give O an open win. Late in
  // a long game every remaining cell can build one; then take the smallest.
  const quiet = base.filter((i) => threatsCreated(board, i) === 0);
  const fewest = Math.min(...base.map((i) => threatsCreated(board, i)));
  const pool = quiet.length ? quiet : base.filter((i) => threatsCreated(board, i) === fewest);

  // Rule 1 — leave the visitor's winning cell alone.
  const threats = new Set(winningCells(board, 'X'));
  const polite = pool.filter((i) => !threats.has(i));
  const candidates = polite.length ? polite : pool;

  // Shuffle first so equal scores don't always resolve the same way.
  const shuffled = candidates
    .map((i) => ({ i, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(({ i }) => i);

  return shuffled.reduce((best, i) =>
    positionalScore(board, i) > positionalScore(board, best) ? i : best,
  );
}
