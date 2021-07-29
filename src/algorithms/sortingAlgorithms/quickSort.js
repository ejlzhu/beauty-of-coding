import {swap} from './util';

export default function quickSort(arr) {
  const copy = [...arr];
  const res = [];
  sort(res, copy, 0, arr.length - 1);
  return res;
}

function sort(res, arr, l, r) {
  if (l >= r) return;
  let p = partition(res, arr, l, r);
  sort(res, arr, l, p - 1);
  sort(res, arr, p + 1, r);
}

function partition(res, arr, l, r) {
  let pivot = arr[r];
  let i = l - 1;

  for (let j = l; j < r; j++) {
    res.push([[r, j], false]);
    if (arr[j] < pivot) {
      swap(arr, ++i, j);
      res.push([[i, arr[i], j, arr[j]], true]);
    }
  }

  swap(arr, ++i, r);
  res.push([[i, arr[i], r, arr[r]], true]);

  return i;
}
