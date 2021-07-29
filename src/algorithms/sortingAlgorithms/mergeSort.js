export default function mergeSort(arr) {
  const res = [];
  const copy = [...arr];
  const temp = [];
  sort(res, copy, temp, 0, arr.length - 1);
  return res;
}

function sort(res, arr, temp, l ,r) {
  if (l >= r) return;
  const m = Math.floor(l + (r - l) / 2);
  sort(res, arr, temp, l, m);
  sort(res, arr, temp, m + 1, r);
  merge(res, arr, temp, l, m, r);
}

function merge(res, arr, temp, l, m, r) {
  for (let i = 0; i < r - l + 1; i++) {
    temp[l + i] = arr[l + i];
  }

  let i = l, j = m + 1;

  for (let k = l; k <= r; k++) {
    if (i > m) {
      res.push([[j, j], false]);
      res.push([[k, temp[j]], true]);
      arr[k] = temp[j++];
    }
    else if (j > r) {
      res.push([[i, i], false]);
      res.push([[k, temp[i]], true]);
      arr[k] = temp[i++];
    }
    else if (temp[i] < temp[j]) {
      res.push([[i, j], false]);
      res.push([[k, temp[i]], true]);
      arr[k] = temp[i++];
    }
    else {
      res.push([[i, j], false]);
      res.push([[k, temp[j]], true]);
      arr[k] = temp[j++];
    }
  }
}
