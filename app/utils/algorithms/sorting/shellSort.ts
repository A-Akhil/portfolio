import { AlgorithmStep } from '../../../types/algorithmTypes';

export function shellSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  const n = array.length;
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Shell Sort - using gap sequence (n/2, n/4, ...)',
    stepNumber: stepNumber++
  });

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting pass with gap = ${gap}`,
      stepNumber: stepNumber++
    });

    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      steps.push({
        array: [...array],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Selecting element ${temp} at position ${i} for gap-${gap} insertion`,
        stepNumber: stepNumber++
      });

      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      while (j >= gap && array[j - gap] > temp) {
        steps.push({
          array: [...array],
          comparing: [j, j - gap],
          current: j,
          sorted: [],
          description: `Comparing ${array[j - gap]} and ${temp} (gap = ${gap})`,
          stepNumber: stepNumber++
        });

        array[j] = array[j - gap];

        steps.push({
          array: [...array],
          comparing: [],
          current: j,
          sorted: [],
          swapped: [j, j - gap],
          description: `Moved ${array[j]} from position ${j - gap} to ${j}`,
          stepNumber: stepNumber++
        });

        j -= gap;
      }

      array[j] = temp;

      if (j !== i) {
        steps.push({
          array: [...array],
          comparing: [],
          current: j,
          sorted: [],
          swapped: [j],
          description: `Placed ${temp} at position ${j}`,
          stepNumber: stepNumber++
        });
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Completed pass with gap = ${gap}`,
      stepNumber: stepNumber++
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: 'Shell Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
