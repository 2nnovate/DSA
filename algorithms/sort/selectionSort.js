const swap = (list, sourceIndex, targetIndex) => {
  const source = list[sourceIndex];
  const target = list[targetIndex];
  list[sourceIndex] = target;
  list[targetIndex] = source;
}

const selectionSortRecursive = (list, startIndex) => {
  const lastIndex = list.length - 1;
  if (startIndex === lastIndex) {
    return;
  }

  for (let i = startIndex; i < lastIndex; i++) {
    let min = list[startIndex];
    const next = list[i + 1];
    if (min > next) {
      swap(list, i + 1, startIndex);
    }
  }
  selectionSortRecursive(list, startIndex + 1);
};

const selectionSort = (list) => {
  selectionSortRecursive(list, 0);
}

// Examples
const list = [3, 5, 1, 6, 8, 11];
console.log('before', list);
selectionSort(list);
console.log('after', list);
