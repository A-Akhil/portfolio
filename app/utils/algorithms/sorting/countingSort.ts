import { AlgorithmStep } from '../../../types/algorithmTypes';

export function countingSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Counting Sort - non-comparison based sorting',
    stepNumber: stepNumber++
  });

  // Find the maximum value in the array
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  const range = maxValue - minValue + 1;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Finding range: min=${minValue}, max=${maxValue}, range=${range}`,
    stepNumber: stepNumber++
  });

  // Create counting array
  const countArray = new Array(range).fill(0);

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Created counting array of size ${range}`,
    stepNumber: stepNumber++
  });

  // Count occurrences of each element
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const index = value - minValue;
    countArray[index]++;

    steps.push({
      array: [...array],
      comparing: [i],
      current: i,
      sorted: [],
      description: `Counting element ${value} at position ${i}, count[${index}] = ${countArray[index]}`,
      stepNumber: stepNumber++
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Completed counting phase, now reconstructing sorted array',
    stepNumber: stepNumber++
  });

  // Reconstruct the sorted array
  let outputIndex = 0;
  const sortedArray = [...array];

  for (let i = 0; i < countArray.length; i++) {
    const value = i + minValue;
    const count = countArray[i];

    for (let j = 0; j < count; j++) {
      sortedArray[outputIndex] = value;

      steps.push({
        array: [...sortedArray],
        comparing: [],
        current: outputIndex,
        sorted: Array.from({ length: outputIndex + 1 }, (_, idx) => idx),
        description: `Placing ${value} at position ${outputIndex} (${j + 1}/${count} occurrences)`,
        stepNumber: stepNumber++
      });

      outputIndex++;
    }
  }

  steps.push({
    array: [...sortedArray],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
    description: 'Counting Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
