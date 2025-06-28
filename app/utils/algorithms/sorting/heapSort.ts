import { AlgorithmStep } from '../../../types/algorithmTypes';

export function heapSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  const n = array.length;
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Heap Sort - building max heap first',
    stepNumber: stepNumber++
  });

  function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      array: [...arr],
      comparing: [i, left, right].filter(idx => idx < n),
      current: i,
      sorted: [],
      description: `Heapifying at node ${i}, checking children at ${left} and ${right}`,
      stepNumber: stepNumber++
    });

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
        description: `Swapping ${arr[i]} and ${arr[largest]} to maintain heap property`,
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

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...array],
      comparing: [],
      current: i,
      sorted: [],
      description: `Building max heap - processing node ${i}`,
      stepNumber: stepNumber++
    });
    heapify(array, n, i);
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Max heap built! Now extracting elements one by one',
    stepNumber: stepNumber++
  });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...array],
      comparing: [0, i],
      current: -1,
      sorted: [],
      description: `Moving max element ${array[0]} to sorted position ${i}`,
      stepNumber: stepNumber++
    });

    [array[0], array[i]] = [array[i], array[0]];

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: n - i }, (_, idx) => i + idx),
      swapped: [0, i],
      description: `Placed ${array[i]} in sorted position`,
      stepNumber: stepNumber++
    });

    heapify(array, i, 0);
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: 'Heap Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
