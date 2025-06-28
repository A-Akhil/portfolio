// Insertion Sort Algorithm Implementation with Step Tracking
import { AlgorithmStep } from '../../../types/algorithmTypes';

export function insertionSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  const n = array.length;
  let stepNumber = 0;

  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [0], // First element is considered sorted
    description: 'Starting Insertion Sort - First element is already sorted',
    stepNumber: stepNumber++
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Show current element to be inserted
    steps.push({
      array: [...array],
      comparing: [],
      current: i,
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Inserting element ${key} from position ${i} into sorted portion`,
      stepNumber: stepNumber++
    });

    // Find correct position for current element
    while (j >= 0 && array[j] > key) {
      // Show comparison
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Comparing ${array[j]} at position ${j} with key ${key}`,
        stepNumber: stepNumber++
      });

      // Shift element to right
      array[j + 1] = array[j];
      
      // Show shift operation
      steps.push({
        array: [...array],
        comparing: [],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        swapped: [j, j + 1],
        description: `Shifting ${array[j + 1]} one position to the right`,
        stepNumber: stepNumber++
      });

      j--;
    }

    // Insert key at correct position
    array[j + 1] = key;

    // Show insertion
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Inserted ${key} at position ${j + 1}. Elements 0 to ${i} are now sorted`,
      stepNumber: stepNumber++
    });
  }

  // Final sorted state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Insertion Sort complete! All elements are in their final sorted positions',
    stepNumber: stepNumber++
  });

  return steps;
}

export function insertionSortInfo() {
  return {
    name: 'Insertion Sort',
    description: 'Insertion Sort builds the final sorted array one element at a time. It takes each element from the unsorted portion and inserts it into its correct position in the sorted portion.',
    keyPoints: [
      'Builds sorted array one element at a time',
      'Takes element from unsorted portion and finds correct position',
      'Shifts elements to make room for insertion',
      'Very efficient for small arrays and nearly sorted data'
    ],
    complexity: {
      time: {
        best: 'O(n) - when array is already sorted',
        average: 'O(n²) - quadratic time for random data',
        worst: 'O(n²) - when array is reverse sorted'
      },
      space: 'O(1) - only uses constant extra space'
    },
    characteristics: {
      stable: true,
      inPlace: true,
      adaptive: true
    }
  };
}
