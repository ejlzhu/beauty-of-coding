import {swap} from './util';

export default function insertionSort(arr) {
  var copy = [...arr];
  var n = copy.length;
  var res = [];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      res.push([[i, j], false]);
      if (copy[j] > copy[i]) {
        swap(copy, i, j);
        res.push([[i, copy[i], j, copy[j]], true]);
      }
    }
  }

  return res;
}
