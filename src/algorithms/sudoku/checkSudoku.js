/* Check if a sudoku is valid, mark the wrong nums.
 * return false if there are wrong nums, reutrn true if no wrong nums. */
export default function checkSudoku(grid) {
  let noWrongNums = true;

  // use three matrix to store position of corresponding number
  var rows = Array.from(Array(9), () => new Array(10));
  var cols = Array.from(Array(9), () => new Array(10));
  var parts = Array.from(Array(9), () => new Array(10));

  // validate the grid
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let num = grid[i][j].num;

      // no number
      if (!num) {
        grid[i][j].wrongNum = true;
        noWrongNums = false;
        continue;
      }
      
      let partRow = Math.floor(i / 3);
      let partIdx = partRow * 3 + Math.floor(j / 3);

      if (rows[i][num]) {
        let cell = rows[i][num];
        if (!cell.readOnly) {
          cell.wrongNum = true;
        }
        if (!grid[i][j].readOnly) grid[i][j].wrongNum = true;
        noWrongNums = false;
      }

      if (cols[j][num]) {
        let cell = cols[j][num];
        if (!cell.readOnly) {
          cell.wrongNum = true;
        }
        if (!grid[i][j].readOnly) grid[i][j].wrongNum = true;
        noWrongNums = false;
      }

      if (parts[partIdx][num]) {
        let cell = parts[partIdx][num];
        if (!cell.readOnly) {
          cell.wrongNum = true;
        }
        if (!grid[i][j].readOnly) grid[i][j].wrongNum = true;
        noWrongNums = false;
      }

      rows[i][num] = grid[i][j];
      cols[j][num] = grid[i][j];
      parts[partIdx][num] = grid[i][j];
    }
  }
  return noWrongNums;
}