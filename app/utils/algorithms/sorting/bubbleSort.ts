// Bubble Sort Algorithm Implementation with Step Tracking
import { AlgorithmStep } from '../../../types/algorithmTypes';

export function bubbleSort(inputArray: number[]): AlgorithmStep[] {
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
    description: 'Starting Bubble Sort - Ready to compare adjacent elements',
    stepNumber: stepNumber++
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Show comparison
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        current: j,
        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        description: `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`,
        stepNumber: stepNumber++
      });

      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        // Show swap
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          current: j,
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          swapped: [j, j + 1],
          description: `Swapped! ${array[j + 1]} was greater than ${array[j]}`,
          stepNumber: stepNumber++
        });
      } else {
        // No swap needed
        steps.push({
          array: [...array],
          comparing: [],
          current: j,
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          description: `No swap needed - ${array[j]} ≤ ${array[j + 1]}`,
          stepNumber: stepNumber++
        });
      }
    }

    // Mark the last element as sorted
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      description: `Pass ${i + 1} complete. Element ${array[n - 1 - i]} is now in its final position`,
      stepNumber: stepNumber++
    });

    // If no swapping occurred, array is sorted
    if (!swapped) {
      steps.push({
        array: [...array],
        comparing: [],
        current: -1,
        sorted: Array.from({ length: n }, (_, k) => k),
        description: 'No swaps in this pass - array is fully sorted!',
        stepNumber: stepNumber++
      });
      break;
    }
  }

  // Final sorted state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: n }, (_, k) => k),
    description: 'Bubble Sort complete! All elements are in their final sorted positions',
    stepNumber: stepNumber++
  });

  return steps;
}

export function bubbleSortInfo() {
  return {
    name: 'Bubble Sort',
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    keyPoints: [
      'Simple comparison-based sorting algorithm',
      'Gets its name because smaller elements "bubble" to the top',
      'After each pass, the largest unsorted element reaches its final position',
      'Optimized version can detect if array becomes sorted early'
    ],
    complexity: {
      time: {
        best: 'O(n) - when array is already sorted',
        average: 'O(n²) - random order',
        worst: 'O(n²) - reverse sorted'
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
