// Algorithm execution engine for visualization
import { AlgorithmStep, SortingAlgorithm, SearchingAlgorithm } from '../../types/algorithmTypes';

// Import sorting algorithms
import { bubbleSort } from './sorting/bubbleSort';
import { selectionSort } from './sorting/selectionSort';
import { insertionSort } from './sorting/insertionSort';
import { quickSort } from './sorting/quickSort';
import { mergeSort } from './sorting/mergeSort';
import { heapSort } from './sorting/heapSort';
import { shellSort } from './sorting/shellSort';

export class AlgorithmEngine {
  private static instance: AlgorithmEngine;

  static getInstance(): AlgorithmEngine {
    if (!AlgorithmEngine.instance) {
      AlgorithmEngine.instance = new AlgorithmEngine();
    }
    return AlgorithmEngine.instance;
  }

  // Execute sorting algorithm and return steps
  executeSortingAlgorithm(algorithm: SortingAlgorithm, array: number[]): AlgorithmStep[] {
    switch (algorithm) {
      case 'bubble-sort':
        return bubbleSort(array);
      case 'selection-sort':
        return selectionSort(array);
      case 'insertion-sort':
        return insertionSort(array);
      case 'quick-sort':
        return quickSort(array);
      case 'merge-sort':
        return mergeSort(array);
      case 'heap-sort':
        return heapSort(array);
      case 'shell-sort':
        return shellSort(array);
      case 'counting-sort':
        return this.countingSort(array);
      case 'radix-sort':
        return this.radixSort(array);
      case 'bucket-sort':
        return this.bucketSort(array);
      case 'tim-sort':
        return this.timSort(array);
      case 'intro-sort':
        return this.introSort(array);
      default:
        throw new Error(`Sorting algorithm ${algorithm} not implemented`);
    }
  }

  // Execute searching algorithm and return steps
  executeSearchingAlgorithm(
    algorithm: SearchingAlgorithm, 
    array: number[], 
    target: number
  ): AlgorithmStep[] {
    switch (algorithm) {
      case 'linear-search':
        return this.linearSearch(array, target);
      case 'binary-search':
        return this.binarySearch(array, target);
      case 'exponential-search':
        return this.exponentialSearch(array, target);
      case 'fibonacci-search':
        return this.fibonacciSearch(array, target);
      case 'jump-search':
        return this.jumpSearch(array, target);
      case 'interpolation-search':
        return this.interpolationSearch(array, target);
      default:
        throw new Error(`Searching algorithm ${algorithm} not implemented`);
    }
  }

  // Placeholder implementations for algorithms not yet created
  private countingSort(array: number[]): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Counting Sort implementation coming soon!',
      stepNumber: 0
    }];
  }

  private radixSort(array: number[]): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Radix Sort implementation coming soon!',
      stepNumber: 0
    }];
  }

  private bucketSort(array: number[]): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Bucket Sort implementation coming soon!',
      stepNumber: 0
    }];
  }

  private timSort(array: number[]): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Tim Sort implementation coming soon!',
      stepNumber: 0
    }];
  }

  private introSort(array: number[]): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Intro Sort implementation coming soon!',
      stepNumber: 0
    }];
  }

  // Basic search algorithm implementations
  private linearSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Linear Search for target ${target}`,
      stepNumber: stepNumber++
    });

    for (let i = 0; i < array.length; i++) {
      steps.push({
        array: [...array],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Checking element ${array[i]} at position ${i}`,
        stepNumber: stepNumber++
      });

      if (array[i] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: i,
          sorted: [i],
          description: `Found target ${target} at position ${i}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private binarySearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let stepNumber = 0;
    let left = 0;
    let right = sortedArray.length - 1;

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Binary Search for target ${target} (array must be sorted)`,
      stepNumber: stepNumber++
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: [...sortedArray],
        comparing: [left, mid, right],
        current: mid,
        sorted: [],
        description: `Checking middle element ${sortedArray[mid]} at position ${mid}`,
        stepNumber: stepNumber++
      });

      if (sortedArray[mid] === target) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: mid,
          sorted: [mid],
          description: `Found target ${target} at position ${mid}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      if (sortedArray[mid] < target) {
        left = mid + 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[mid]} < ${target}, searching right half`,
          stepNumber: stepNumber++
        });
      } else {
        right = mid - 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[mid]} > ${target}, searching left half`,
          stepNumber: stepNumber++
        });
      }
    }

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  // Placeholder implementations for other search algorithms
  private exponentialSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let stepNumber = 0;
    const n = sortedArray.length;

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Exponential Search for target ${target}`,
      stepNumber: stepNumber++
    });

    // If target is at first position
    if (sortedArray[0] === target) {
      steps.push({
        array: [...sortedArray],
        comparing: [0],
        current: 0,
        sorted: [0],
        description: `Found target ${target} at position 0!`,
        stepNumber: stepNumber++
      });
      return steps;
    }

    // Find range for binary search by repeated doubling
    let bound = 1;
    while (bound < n && sortedArray[bound] < target) {
      steps.push({
        array: [...sortedArray],
        comparing: [bound],
        current: bound,
        sorted: [],
        description: `Expanding bound to ${bound}, value: ${sortedArray[bound]}`,
        stepNumber: stepNumber++
      });
      bound = bound * 2;
    }

    const left = Math.floor(bound / 2);
    const right = Math.min(bound, n - 1);

    steps.push({
      array: [...sortedArray],
      comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      current: -1,
      sorted: [],
      description: `Found range [${left}..${right}], performing binary search`,
      stepNumber: stepNumber++
    });

    // Binary search in the found range
    let start = left;
    let end = right;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      
      steps.push({
        array: [...sortedArray],
        comparing: [start, mid, end],
        current: mid,
        sorted: [],
        description: `Binary search: checking middle element ${sortedArray[mid]} at position ${mid}`,
        stepNumber: stepNumber++
      });

      if (sortedArray[mid] === target) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: mid,
          sorted: [mid],
          description: `Found target ${target} at position ${mid}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      if (sortedArray[mid] < target) {
        start = mid + 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: end - start + 1 }, (_, i) => start + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[mid]} < ${target}, searching right half`,
          stepNumber: stepNumber++
        });
      } else {
        end = mid - 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: end - start + 1 }, (_, i) => start + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[mid]} > ${target}, searching left half`,
          stepNumber: stepNumber++
        });
      }
    }

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private fibonacciSearch(array: number[], target: number): AlgorithmStep[] {
    return [{
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: 'Fibonacci Search implementation coming soon!',
      stepNumber: 0
    }];
  }

  private jumpSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let stepNumber = 0;
    const n = sortedArray.length;
    const blockSize = Math.floor(Math.sqrt(n));

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Jump Search for target ${target} (block size: ${blockSize})`,
      stepNumber: stepNumber++
    });

    let prev = 0;
    let current = blockSize - 1;

    // Jump through blocks
    while (current < n && sortedArray[current] < target) {
      steps.push({
        array: [...sortedArray],
        comparing: [current],
        current: current,
        sorted: [],
        description: `Jumping to position ${current}, value: ${sortedArray[current]}`,
        stepNumber: stepNumber++
      });

      prev = current;
      current = Math.min(current + blockSize, n - 1);
    }

    steps.push({
      array: [...sortedArray],
      comparing: Array.from({ length: current - prev + 1 }, (_, i) => prev + i),
      current: -1,
      sorted: [],
      description: `Target might be in block [${prev}..${current}], doing linear search`,
      stepNumber: stepNumber++
    });

    // Linear search within the block
    for (let i = prev; i <= current && i < n; i++) {
      steps.push({
        array: [...sortedArray],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Checking element ${sortedArray[i]} at position ${i}`,
        stepNumber: stepNumber++
      });

      if (sortedArray[i] === target) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: i,
          sorted: [i],
          description: `Found target ${target} at position ${i}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }
    }

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private interpolationSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let stepNumber = 0;
    let low = 0;
    let high = sortedArray.length - 1;

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Interpolation Search for target ${target}`,
      stepNumber: stepNumber++
    });

    while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
      // If array has only one element
      if (low === high) {
        steps.push({
          array: [...sortedArray],
          comparing: [low],
          current: low,
          sorted: [],
          description: `Single element remaining at position ${low}`,
          stepNumber: stepNumber++
        });

        if (sortedArray[low] === target) {
          steps.push({
            array: [...sortedArray],
            comparing: [],
            current: low,
            sorted: [low],
            description: `Found target ${target} at position ${low}!`,
            stepNumber: stepNumber++
          });
          return steps;
        }
        break;
      }

      // Calculate interpolated position
      const pos = low + Math.floor(((target - sortedArray[low]) * (high - low)) / (sortedArray[high] - sortedArray[low]));
      const clampedPos = Math.max(low, Math.min(high, pos));

      steps.push({
        array: [...sortedArray],
        comparing: [low, clampedPos, high],
        current: clampedPos,
        sorted: [],
        description: `Interpolated position: ${clampedPos}, value: ${sortedArray[clampedPos]}`,
        stepNumber: stepNumber++
      });

      if (sortedArray[clampedPos] === target) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: clampedPos,
          sorted: [clampedPos],
          description: `Found target ${target} at position ${clampedPos}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      if (sortedArray[clampedPos] < target) {
        low = clampedPos + 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: high - low + 1 }, (_, i) => low + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[clampedPos]} < ${target}, searching right portion`,
          stepNumber: stepNumber++
        });
      } else {
        high = clampedPos - 1;
        steps.push({
          array: [...sortedArray],
          comparing: Array.from({ length: high - low + 1 }, (_, i) => low + i),
          current: -1,
          sorted: [],
          description: `${sortedArray[clampedPos]} > ${target}, searching left portion`,
          stepNumber: stepNumber++
        });
      }
    }

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }
}
