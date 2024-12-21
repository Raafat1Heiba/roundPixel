export function bubbleSort(array: any) {
  const length = array.length;
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return array;
}
