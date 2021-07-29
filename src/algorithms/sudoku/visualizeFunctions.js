/** backtracking to fill each cell. return each tried num */
const list = []; // to be returned
export function backtrack(grid) {
    // use three matrix to keep track of values visited
    var rows = Array.from(Array(9), () => new Array(10));
    var cols = Array.from(Array(9), () => new Array(10));
    var parts = Array.from(Array(9), () => new Array(10));

  recordDefaultNums(rows, cols, parts, grid);
  bcHelper(0, 0, rows, cols, parts, grid);
  return list;
}

function bcHelper(i, j, rows, cols, parts, grid) {
  // find next empty cell
  while (i < 9 && grid[i][j].num) {
    i = j === 8 ? i + 1 : i;
    j = j === 8 ? 0 : j + 1;
  }

  // if no empty cell, return true, finished
  if (i === 9) return true;

  // found an empty cell, try to fill it
  for (let curr = 1; curr <= 9; curr++) {
    let partIdx = computePartIdx(i, j);
    // if curr is used, continue
    if (rows[i][curr] || cols[j][curr] || parts[partIdx][curr]) continue;

    // choose
    grid[i][j].num = curr;
    rows[i][curr] = cols[j][curr] = parts[partIdx][curr] = true;
    list.push({...grid[i][j]});

    // explore
    if (bcHelper(i, j, rows, cols, parts, grid)) return true;

    // unchoose
    grid[i][j].num = '';
    rows[i][curr] = cols[j][curr] = parts[partIdx][curr] = false;
    list.push({...grid[i][j]});
  }
  return false;
}


function recordDefaultNums(rows, cols, parts, grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j].readOnly) {
        let currNum = grid[i][j].num;
        let partIdx = computePartIdx(i, j);
        rows[i][currNum] = true;
        cols[j][currNum] = true;
        parts[partIdx][currNum] = true;
      }
    }
  }
}


function computePartIdx(i, j) {
  let partRow = Math.floor(i / 3);
  let partIdx = partRow * 3 + Math.floor(j / 3);
  return partIdx;
}