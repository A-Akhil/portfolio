import { AlgorithmStep } from '../../../types/algorithmTypes';

export function timSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;
  const MIN_MERGE = 32;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Tim Sort - hybrid stable sorting algorithm',
    stepNumber: stepNumber++
  });

  if (array.length < 2) {
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: array.length }, (_, i) => i),
      description: 'Array has fewer than 2 elements, already sorted',
      stepNumber: stepNumber++
    });
    return steps;
  }

  // Insertion sort function for small subarrays
  function insertionSort(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        array: [...arr],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Insertion sort: selecting element ${key} at position ${i}`,
        stepNumber: stepNumber++
      });

      while (j >= left && arr[j] > key) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          current: j + 1,
          sorted: [],
          description: `Comparing ${arr[j]} and ${key}, shifting ${arr[j]} right`,
          stepNumber: stepNumber++
        });

        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;

      steps.push({
        array: [...arr],
        comparing: [],
        current: j + 1,
        sorted: [],
        swapped: [j + 1],
        description: `Placed ${key} at position ${j + 1}`,
        stepNumber: stepNumber++
      });
    }
  }

  // Merge function for combining sorted runs
  function merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      current: -1,
      sorted: [],
      description: `Merging runs [${left}..${mid}] and [${mid + 1}..${right}]`,
      stepNumber: stepNumber++
    });

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        current: k,
        sorted: [],
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
        stepNumber: stepNumber++
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...arr],
        comparing: [],
        current: k,
        sorted: [],
        swapped: [k],
        description: `Placed ${arr[k]} at position ${k}`,
        stepNumber: stepNumber++
      });

      k++;
    }

    // Copy remaining elements
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        comparing: [],
        current: k,
        sorted: [],
        swapped: [k],
        description: `Copying remaining element ${leftArr[i]}`,
        stepNumber: stepNumber++
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        current: k,
        sorted: [],
        swapped: [k],
        description: `Copying remaining element ${rightArr[j]}`,
        stepNumber: stepNumber++
      });
      j++;
      k++;
    }
  }

  const n = array.length;

  // Sort individual subarrays of size MIN_MERGE using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    const right = Math.min(i + MIN_MERGE - 1, n - 1);
    
    steps.push({
      array: [...array],
      comparing: Array.from({ length: right - i + 1 }, (_, idx) => i + idx),
      current: -1,
      sorted: [],
      description: `Using insertion sort for subarray [${i}..${right}]`,
      stepNumber: stepNumber++
    });

    insertionSort(array, i, right);
  }

  // Start merging from size MIN_MERGE
  for (let size = MIN_MERGE; size < n; size = 2 * size) {
    for (let start = 0; start < n; start += 2 * size) {
      const mid = Math.min(start + size - 1, n - 1);
      const end = Math.min(start + 2 * size - 1, n - 1);

      if (mid < end) {
        steps.push({
          array: [...array],
          comparing: [],
          current: -1,
          sorted: [],
          description: `Merging blocks of size ${size}: [${start}..${mid}] and [${mid + 1}..${end}]`,
          stepNumber: stepNumber++
        });

        merge(array, start, mid, end);
      }
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: 'Tim Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
