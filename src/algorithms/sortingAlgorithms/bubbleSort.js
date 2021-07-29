import {swap} from './util';

export default function bubbleSort(arr) {
  var copy = [...arr];
  var n = copy.length;
  var done = true;
  var res = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      res.push([[j, j + 1], false]);
      if (copy[j] > copy[j + 1]) {
        swap(copy, j, j + 1);
        res.push([[j, copy[j], j + 1, copy[j + 1]], true]);
        done = false;
      }
    }
    if (done === true) break;
    done = true;
  }

  return res;
}
