// Quick Sort Algorithm Implementation with Step Tracking
import { AlgorithmStep } from '../../../types/algorithmTypes';

export function quickSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  // Initial state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    pivots: [],
    description: 'Starting Quick Sort - Using divide and conquer approach',
    stepNumber: stepNumber++
  });

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      // Partition the array
      const pivotIndex = partition(low, high);
      
      // Mark pivot as in correct position
      steps.push({
        array: [...array],
        comparing: [],
        current: -1,
        sorted: [],
        pivots: [pivotIndex],
        description: `Pivot ${array[pivotIndex]} is now in its final position at index ${pivotIndex}`,
        stepNumber: stepNumber++
      });

      // Recursively sort left and right subarrays
      if (low < pivotIndex - 1) {
        steps.push({
          array: [...array],
          comparing: Array.from({ length: pivotIndex - low }, (_, i) => low + i),
          current: -1,
          sorted: [],
          pivots: [pivotIndex],
          description: `Recursively sorting left subarray from ${low} to ${pivotIndex - 1}`,
          stepNumber: stepNumber++
        });
        quickSortHelper(low, pivotIndex - 1);
      }

      if (pivotIndex + 1 < high) {
        steps.push({
          array: [...array],
          comparing: Array.from({ length: high - pivotIndex }, (_, i) => pivotIndex + 1 + i),
          current: -1,
          sorted: [],
          pivots: [pivotIndex],
          description: `Recursively sorting right subarray from ${pivotIndex + 1} to ${high}`,
          stepNumber: stepNumber++
        });
        quickSortHelper(pivotIndex + 1, high);
      }
    }
  }

  function partition(low: number, high: number): number {
    const pivot = array[high]; // Choose last element as pivot
    
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      pivots: [high],
      description: `Selected pivot: ${pivot} at position ${high}`,
      stepNumber: stepNumber++
    });

    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
      // Show comparison with pivot
      steps.push({
        array: [...array],
        comparing: [j, high],
        current: j,
        sorted: [],
        pivots: [high],
        description: `Comparing ${array[j]} at position ${j} with pivot ${pivot}`,
        stepNumber: stepNumber++
      });

      if (array[j] <= pivot) {
        i++;
        
        if (i !== j) {
          // Show swap
          steps.push({
            array: [...array],
            comparing: [i, j],
            current: j,
            sorted: [],
            pivots: [high],
            description: `${array[j]} ≤ ${pivot}, swapping positions ${i} and ${j}`,
            stepNumber: stepNumber++
          });

          // Perform swap
          [array[i], array[j]] = [array[j], array[i]];

          steps.push({
            array: [...array],
            comparing: [],
            current: j,
            sorted: [],
            pivots: [high],
            swapped: [i, j],
            description: `Swapped ${array[i]} and ${array[j]}`,
            stepNumber: stepNumber++
          });
        } else {
          steps.push({
            array: [...array],
            comparing: [],
            current: j,
            sorted: [],
            pivots: [high],
            description: `${array[j]} ≤ ${pivot}, element is already in correct relative position`,
            stepNumber: stepNumber++
          });
        }
      } else {
        steps.push({
          array: [...array],
          comparing: [],
          current: j,
          sorted: [],
          pivots: [high],
          description: `${array[j]} > ${pivot}, no swap needed`,
          stepNumber: stepNumber++
        });
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      steps.push({
        array: [...array],
        comparing: [i + 1, high],
        current: -1,
        sorted: [],
        pivots: [high],
        description: `Placing pivot ${pivot} in its correct position by swapping with position ${i + 1}`,
        stepNumber: stepNumber++
      });

      [array[i + 1], array[high]] = [array[high], array[i + 1]];

      steps.push({
        array: [...array],
        comparing: [],
        current: -1,
        sorted: [],
        pivots: [i + 1],
        swapped: [i + 1, high],
        description: `Pivot ${pivot} placed at position ${i + 1}`,
        stepNumber: stepNumber++
      });
    }

    return i + 1;
  }

  // Start the recursive sorting
  quickSortHelper(0, array.length - 1);

  // Final sorted state
  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, k) => k),
    pivots: [],
    description: 'Quick Sort complete! All elements are in their final sorted positions',
    stepNumber: stepNumber++
  });

  return steps;
}

export function quickSortInfo() {
  return {
    name: 'Quick Sort',
    description: 'Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the subarrays.',
    keyPoints: [
      'Divide-and-conquer algorithm using pivot element',
      'Partitions array so elements ≤ pivot are on left, > pivot on right',
      'Recursively sorts left and right partitions',
      'Choice of pivot affects performance significantly'
    ],
    complexity: {
      time: {
        best: 'O(n log n) - when pivot divides array evenly',
        average: 'O(n log n) - expected performance',
        worst: 'O(n²) - when pivot is always smallest/largest'
      },
      space: 'O(log n) - recursive call stack space'
    },
    characteristics: {
      stable: false,
      inPlace: true,
      adaptive: false
    }
  };
}
