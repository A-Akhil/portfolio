// Selection Sort Algorithm Implementation with Step Tracking
import { AlgorithmStep } from '../../../types/algorithmTypes';

export function selectionSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  const n = array.length;
  let stepNumber = 0;

  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Selection Sort - Finding minimum element in each pass',
    stepNumber: stepNumber++
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Mark current position as being processed
    steps.push({
      array: [...array],
      comparing: [],
      current: i,
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Pass ${i + 1}: Finding minimum element from position ${i} onwards`,
      stepNumber: stepNumber++
    });

    // Find minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      // Show comparison
      steps.push({
        array: [...array],
        comparing: [minIndex, j],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Comparing elements at positions ${minIndex} and ${j}: ${array[minIndex]} vs ${array[j]}`,
        stepNumber: stepNumber++
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        
        // Show new minimum found
        steps.push({
          array: [...array],
          comparing: [minIndex],
          current: i,
          sorted: Array.from({ length: i }, (_, k) => k),
          description: `New minimum found! Element ${array[minIndex]} at position ${minIndex}`,
          stepNumber: stepNumber++
        });
      }
    }

    // Swap if needed
    if (minIndex !== i) {
      // Show elements to be swapped
      steps.push({
        array: [...array],
        comparing: [i, minIndex],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Swapping elements: ${array[i]} at position ${i} with ${array[minIndex]} at position ${minIndex}`,
        stepNumber: stepNumber++
      });

      // Perform swap
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      // Show swap result
      steps.push({
        array: [...array],
        comparing: [],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        swapped: [i, minIndex],
        description: `Swapped! Element ${array[i]} is now in its correct position`,
        stepNumber: stepNumber++
      });
    } else {
      // No swap needed
      steps.push({
        array: [...array],
        comparing: [],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `No swap needed - element ${array[i]} is already in correct position`,
        stepNumber: stepNumber++
      });
    }

    // Mark current element as sorted
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Pass ${i + 1} complete. Element ${array[i]} is now sorted`,
      stepNumber: stepNumber++
    });
  }

  // Final sorted state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Selection Sort complete! All elements are in their final sorted positions',
    stepNumber: stepNumber++
  });

  return steps;
}

export function selectionSortInfo() {
  return {
    name: 'Selection Sort',
    description: 'Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and places it at the beginning of the unsorted region.',
    keyPoints: [
      'Divides array into sorted and unsorted portions',
      'Finds minimum element in unsorted portion each pass',
      'Places minimum at beginning of unsorted portion',
      'Number of swaps is minimized compared to other O(n²) algorithms'
    ],
    complexity: {
      time: {
        best: 'O(n²) - always performs the same number of comparisons',
        average: 'O(n²) - quadratic time complexity',
        worst: 'O(n²) - same performance regardless of input'
      },
      space: 'O(1) - only uses constant extra space'
    },
    characteristics: {
      stable: false,
      inPlace: true,
      adaptive: false
    }
  };
}
