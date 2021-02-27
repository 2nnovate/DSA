const swap = (list, sourceIndex, targetIndex) => {
  const source = list[sourceIndex];
  const target = list[targetIndex];
  list[sourceIndex] = target;
  list[targetIndex] = source;
}

const bubbleSortRecursive = (list, lastIndex) => {
  if (lastIndex === 0) {
    return;
  }

  for (let i = 0; i <= lastIndex; i++) {
    const current = list[i];
    const next = list[i + 1];
    if (current > next) {
      swap(list, i, i + 1);
    }
  }
  bubbleSortRecursive(list, lastIndex - 1);
}

const bubbleSort = (list) => {
  bubbleSortRecursive(list, list.length - 1);
};

// Examples
const list = [3, 5, 1, 6, 8, 11];
console.log('before', list);
bubbleSort(list);
console.log('after', list);
