import { AlgorithmStep } from '../../../types/algorithmTypes';

export function mergeSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Merge Sort - divide and conquer approach',
    stepNumber: stepNumber++
  });

  function merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      current: -1,
      sorted: [],
      description: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
      stepNumber: stepNumber++
    });

    while (i < leftArray.length && j < rightArray.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        current: k,
        sorted: [],
        description: `Comparing ${leftArray[i]} and ${rightArray[j]}`,
        stepNumber: stepNumber++
      });

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
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
    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      steps.push({
        array: [...arr],
        comparing: [],
        current: k,
        sorted: [],
        swapped: [k],
        description: `Copying remaining element ${leftArray[i]} to position ${k}`,
        stepNumber: stepNumber++
      });
      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      steps.push({
        array: [...arr],
        comparing: [],
        current: k,
        sorted: [],
        swapped: [k],
        description: `Copying remaining element ${rightArray[j]} to position ${k}`,
        stepNumber: stepNumber++
      });
      j++;
      k++;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      description: `Merged subarray [${left}..${right}] is now sorted`,
      stepNumber: stepNumber++
    });
  }

  function mergeSortRecursive(arr: number[], left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        array: [...arr],
        comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        current: mid,
        sorted: [],
        description: `Dividing array [${left}..${right}] at midpoint ${mid}`,
        stepNumber: stepNumber++
      });

      mergeSortRecursive(arr, left, mid);
      mergeSortRecursive(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }

  mergeSortRecursive(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: 'Merge Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
