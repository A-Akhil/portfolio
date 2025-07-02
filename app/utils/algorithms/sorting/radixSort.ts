import { AlgorithmStep } from '../../../types/algorithmTypes';

export function radixSort(inputArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];
  let stepNumber = 0;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: 'Starting Radix Sort - sorting by individual digits',
    stepNumber: stepNumber++
  });

  // Find the maximum number to know number of digits
  const maxNum = Math.max(...array);
  const maxDigits = maxNum.toString().length;

  steps.push({
    array: [...array],
    comparing: [],
    current: -1,
    sorted: [],
    description: `Maximum number: ${maxNum}, digits to process: ${maxDigits}`,
    stepNumber: stepNumber++
  });

  // Perform counting sort for every digit
  let currentArray = [...array];
  
  for (let digitPlace = 1; Math.floor(maxNum / digitPlace) > 0; digitPlace *= 10) {
    const currentDigitPosition = Math.log10(digitPlace);
    
    steps.push({
      array: [...currentArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Processing digit at position ${currentDigitPosition + 1} (place value: ${digitPlace})`,
      stepNumber: stepNumber++
    });

    // Counting sort based on the digit at digitPlace
    const countArray = new Array(10).fill(0);
    
    // Count occurrences of each digit
    for (let i = 0; i < currentArray.length; i++) {
      const digit = Math.floor(currentArray[i] / digitPlace) % 10;
      countArray[digit]++;

      steps.push({
        array: [...currentArray],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Element ${currentArray[i]}: digit at position ${currentDigitPosition + 1} is ${digit}`,
        stepNumber: stepNumber++
      });
    }

    // Convert countArray to cumulative count
    for (let i = 1; i < 10; i++) {
      countArray[i] += countArray[i - 1];
    }

    steps.push({
      array: [...currentArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Built cumulative count array for digit position ${currentDigitPosition + 1}`,
      stepNumber: stepNumber++
    });

    // Build the output array
    const outputArray = new Array(currentArray.length);
    
    // Fill output array from right to left to maintain stability
    for (let i = currentArray.length - 1; i >= 0; i--) {
      const digit = Math.floor(currentArray[i] / digitPlace) % 10;
      const position = countArray[digit] - 1;
      outputArray[position] = currentArray[i];
      countArray[digit]--;

      steps.push({
        array: [...outputArray.map((val, idx) => val !== undefined ? val : currentArray[idx])],
        comparing: [i],
        current: position,
        sorted: [],
        description: `Placing ${currentArray[i]} at position ${position} based on digit ${digit}`,
        stepNumber: stepNumber++
      });
    }

    currentArray = [...outputArray];

    steps.push({
      array: [...currentArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Completed sorting by digit position ${currentDigitPosition + 1}`,
      stepNumber: stepNumber++
    });
  }

  steps.push({
    array: [...currentArray],
    comparing: [],
    current: -1,
    sorted: Array.from({ length: currentArray.length }, (_, i) => i),
    description: 'Radix Sort completed! Array is fully sorted',
    stepNumber: stepNumber++
  });

  return steps;
}
