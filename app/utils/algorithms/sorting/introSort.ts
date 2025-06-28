import { AlgorithmStep } from '../../../types/algorithmTypes';

export function introSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Intro Sort - hybrid quicksort with heapsort fallback',
    stepNumber: stepNumber++
  });

  if (array.length <= 1) {
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: array.length }, (_, i) => i),
      description: 'Array has 1 or fewer elements, already sorted',
      stepNumber: stepNumber++
    });
    return steps;
  }

  // Calculate maximum depth allowed for quicksort
  const maxDepth = Math.floor(Math.log2(array.length)) * 2;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Maximum quicksort depth set to ${maxDepth}`,
    stepNumber: stepNumber++
  });

  // Insertion sort for small arrays
  function insertionSort(arr: number[], low: number, high: number): void {
    for (let i = low + 1; i <= high; i++) {
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

      while (j >= low && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;

      if (j + 1 !== i) {
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
  }

  // Heapify function for heap sort
  function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        array: [...arr],
        comparing: [i, largest],
        current: -1,
        sorted: [],
        description: `Heapify: swapping ${arr[i]} and ${arr[largest]}`,
        stepNumber: stepNumber++
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        array: [...arr],
        comparing: [],
        current: -1,
        sorted: [],
        swapped: [i, largest],
        description: `Swapped positions ${i} and ${largest}`,
        stepNumber: stepNumber++
      });

      heapify(arr, n, largest);
    }
  }

  // Heap sort for when recursion depth is exceeded
  function heapSort(arr: number[], low: number, high: number): void {
    const n = high - low + 1;
    const tempArr = arr.slice(low, high + 1);

    steps.push({
      array: [...arr],
      comparing: Array.from({ length: n }, (_, idx) => low + idx),
      current: -1,
      sorted: [],
      description: `Depth exceeded, switching to heap sort for [${low}..${high}]`,
      stepNumber: stepNumber++
    });

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(tempArr, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [tempArr[0], tempArr[i]] = [tempArr[i], tempArr[0]];
      heapify(tempArr, i, 0);
    }

    // Copy back to original array
    for (let i = 0; i < n; i++) {
      arr[low + i] = tempArr[i];
    }

    steps.push({
      array: [...arr],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: n }, (_, idx) => low + idx),
      description: `Heap sort completed for range [${low}..${high}]`,
      stepNumber: stepNumber++
    });
  }

  // Partition function for quicksort
  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [],
      current: high,
      sorted: [],
      pivots: [high],
      description: `Quicksort partition: pivot = ${pivot} at position ${high}`,
      stepNumber: stepNumber++
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        current: j,
        sorted: [],
        pivots: [high],
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        stepNumber: stepNumber++
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];

          steps.push({
            array: [...arr],
            comparing: [],
            current: -1,
            sorted: [],
            swapped: [i, j],
            pivots: [high],
            description: `Swapped ${arr[j]} and ${arr[i]}`,
            stepNumber: stepNumber++
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: [...arr],
      comparing: [],
      current: i + 1,
      sorted: [],
      swapped: [i + 1, high],
      description: `Placed pivot ${pivot} at final position ${i + 1}`,
      stepNumber: stepNumber++
    });

    return i + 1;
  }

  // Main intro sort function
  function introSortRecursive(arr: number[], low: number, high: number, depth: number): void {
    const size = high - low + 1;

    // Use insertion sort for small arrays
    if (size < 16) {
      steps.push({
        array: [...arr],
        comparing: Array.from({ length: size }, (_, idx) => low + idx),
        current: -1,
        sorted: [],
        description: `Small array [${low}..${high}], using insertion sort`,
        stepNumber: stepNumber++
      });
      insertionSort(arr, low, high);
      return;
    }

    // Use heap sort if depth is exceeded
    if (depth === 0) {
      heapSort(arr, low, high);
      return;
    }

    // Use quicksort
    const pivotIndex = partition(arr, low, high);
    
    steps.push({
      array: [...arr],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Quicksort: partitioned around position ${pivotIndex}`,
      stepNumber: stepNumber++
    });

    introSortRecursive(arr, low, pivotIndex - 1, depth - 1);
    introSortRecursive(arr, pivotIndex + 1, high, depth - 1);
  }

  // Start the intro sort
  introSortRecursive(array, 0, array.length - 1, maxDepth);

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: 'Intro Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
