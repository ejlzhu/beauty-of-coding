export function initGrid(difficultyLevel) {
  const matrix = [];
  for (let row = 0; row < 9; row++) {
    let currRow = [];
    for (let col = 0; col < 9; col++) {
      currRow.push(createCell(row, col));
    }
    matrix.push(currRow);
  }

  initDefaultVal(matrix, difficultyLevel);
  return matrix;
}

const easyBoard = [
  [8, 5, 0, 0, 0, 7, 9, 3, 0],
  [2, 0, 9, 0, 8, 5, 0, 7, 0],
  [0, 4, 0, 1, 6, 9, 0, 5, 8],
  [0, 7, 4, 6, 1, 0, 0, 0, 0],
  [0, 9, 2, 7, 0, 8, 3, 0, 0],
  [6, 0, 0, 0, 0, 3, 7, 1, 0],
  [9, 3, 0, 5, 0, 6, 0, 4, 0],
  [0, 6, 0, 9, 7, 0, 1, 0, 3],
  [0, 0, 0, 8, 0, 0, 0, 9, 5]
];

const mediumBoard = [
  [2, 0, 0, 9, 0, 6, 7, 0, 8],
  [7, 5, 0, 1, 0, 0, 0, 0, 0],
  [0, 8, 0, 0, 7, 0, 1, 0, 0],
  [9, 6, 8, 7, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 0, 0, 0, 1, 4, 9, 2],
  [0, 0, 5, 0, 1, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 9, 0, 1, 5],
  [1, 0, 6, 8, 0, 5, 0, 0, 4]
];

const hardBoard = [
  [4, 0, 0, 0, 0, 1, 3, 8, 0],
  [0, 0, 0, 0, 0, 5, 2, 0, 0],
  [0, 0, 2, 8, 0, 0, 9, 6, 0],
  [0, 8, 0, 1, 0, 0, 0, 0, 0],
  [2, 0, 6, 0, 8, 0, 4, 0, 3],
  [0, 0, 0, 0, 0, 6, 0, 7, 0],
  [0, 7, 3, 0, 0, 9, 5, 0, 0],
  [0, 0, 4, 5, 0, 0, 0, 0, 0],
  [0, 9, 8, 6, 0, 0, 0, 0, 0]
];

const evilBoard = [
  [2, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 8, 4, 7, 0, 0, 0, 0],
  [3, 4, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 6, 2, 4, 9, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 8, 3, 7, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 8, 5],
  [0, 0, 0, 0, 9, 7, 3, 0, 0],
  [0, 6, 0, 0, 0, 0, 0, 0, 2]
];

function createCell(row, col) {
  return {
    row: row,
    col: col,
    visiting: false,
    num: '',
    wrongNum: false,
    readOnly: false
  };
}

function initDefaultVal(matrix, difficultyLevel) {
  let board = [];
  switch (difficultyLevel) {
    case 'Easy':
      board = easyBoard;
      break;
    case 'Medium':
      board = mediumBoard;
      break;
    case 'Hard':
      board = hardBoard;
      break;
    case 'Evil':
      board = evilBoard;
      break;
  }

  // init val and readOnly
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j]) {
        matrix[i][j].num = board[i][j];
        matrix[i][j].readOnly = true;
      }
    }
  }
}
