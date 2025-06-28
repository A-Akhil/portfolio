import { AlgorithmStep } from '../../../types/algorithmTypes';

export function bucketSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Bucket Sort - distributing elements into buckets',
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

  // Find the maximum and minimum values
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  const range = maxValue - minValue;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Range: ${minValue} to ${maxValue} (range: ${range})`,
    stepNumber: stepNumber++
  });

  // Create buckets
  const bucketCount = Math.max(1, Math.floor(array.length / 2));
  const buckets: number[][] = Array(bucketCount).fill(null).map(() => []);

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Created ${bucketCount} buckets for distribution`,
    stepNumber: stepNumber++
  });

  // Distribute elements into buckets
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    let bucketIndex;
    
    if (range === 0) {
      bucketIndex = 0; // All elements are the same
    } else {
      bucketIndex = Math.min(
        bucketCount - 1,
        Math.floor(((value - minValue) / range) * bucketCount)
      );
    }
    
    buckets[bucketIndex].push(value);

    steps.push({
      array: [...array],
      comparing: [i],
      current: i,
      sorted: [],
      description: `Placing ${value} into bucket ${bucketIndex} (bucket now has ${buckets[bucketIndex].length} elements)`,
      stepNumber: stepNumber++
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Distribution complete, now sorting individual buckets',
    stepNumber: stepNumber++
  });

  // Sort individual buckets using insertion sort
  const sortedArray: number[] = [];
  let globalIndex = 0;

  for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
    const bucket = buckets[bucketIdx];
    
    if (bucket.length === 0) continue;

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Sorting bucket ${bucketIdx} with ${bucket.length} elements: [${bucket.join(', ')}]`,
      stepNumber: stepNumber++
    });

    // Simple insertion sort for each bucket
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;

      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;

      if (bucket.length > 1) {
        steps.push({
          array: [...array],
          comparing: [],
          current: -1,
          sorted: [],
          description: `Sorted element ${key} within bucket ${bucketIdx}`,
          stepNumber: stepNumber++
        });
      }
    }

    // Add sorted bucket elements to final array
    for (let i = 0; i < bucket.length; i++) {
      sortedArray[globalIndex] = bucket[i];

      steps.push({
        array: [...sortedArray.concat(array.slice(globalIndex + 1))],
        comparing: [],
        current: globalIndex,
        sorted: Array.from({ length: globalIndex + 1 }, (_, idx) => idx),
        description: `Moving ${bucket[i]} from bucket ${bucketIdx} to final position ${globalIndex}`,
        stepNumber: stepNumber++
      });

      globalIndex++;
    }
  }

  steps.push({
    array: [...sortedArray],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
    description: 'Bucket Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
