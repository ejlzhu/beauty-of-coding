import {swap} from './util';

export default function selectionSort(arr) {
  var res = [];
  var copy = [...arr];

  for (let i = 0; i < copy.length - 1; i++) {
    var min = i;

    for (let j = i + 1; j < copy.length; j++) {
      if (copy[j] < copy[min]) {
        min = j;
      }
      res.push([[i, j], false]);
    }
    res.push([[i, min], false]);

    swap(copy, i, min);
    res.push([[i, copy[i], min, copy[min]], true]);
  }

  return res;
}
