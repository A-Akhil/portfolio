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
import { countingSort } from './sorting/countingSort';
import { radixSort } from './sorting/radixSort';
import { bucketSort } from './sorting/bucketSort';
import { timSort } from './sorting/timSort';
import { introSort } from './sorting/introSort';

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
        return countingSort(array);
      case 'radix-sort':
        return radixSort(array);
      case 'bucket-sort':
        return bucketSort(array);
      case 'tim-sort':
        return timSort(array);
      case 'intro-sort':
        return introSort(array);
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
      case 'depth-first-search':
        return this.depthFirstSearch(array, target);
      case 'breadth-first-search':
        return this.breadthFirstSearch(array, target);
      case 'dijkstra':
        return this.dijkstraSearch(array, target);
      case 'a-star':
        return this.aStarSearch(array, target);
      case 'bellman-ford':
        return this.bellmanFordSearch(array, target);
      case 'floyd-warshall':
        return this.floydWarshallSearch(array, target);
      default:
        throw new Error(`Searching algorithm ${algorithm} not implemented`);
    }
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
    const steps: AlgorithmStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let stepNumber = 0;
    const n = sortedArray.length;

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Fibonacci Search for target ${target}`,
      stepNumber: stepNumber++
    });

    // Generate Fibonacci numbers
    let fibMm2 = 0; // (m-2)'th Fibonacci number
    let fibMm1 = 1; // (m-1)'th Fibonacci number  
    let fibM = fibMm2 + fibMm1; // m'th Fibonacci number

    // Find smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
      fibMm2 = fibMm1;
      fibMm1 = fibM;
      fibM = fibMm2 + fibMm1;
    }

    steps.push({
      array: [...sortedArray],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Generated Fibonacci sequence up to ${fibM} for array of size ${n}`,
      stepNumber: stepNumber++
    });

    let offset = -1;

    while (fibM > 1) {
      const i = Math.min(offset + fibMm2, n - 1);

      steps.push({
        array: [...sortedArray],
        comparing: [i],
        current: i,
        sorted: [],
        description: `Checking position ${i} (offset: ${offset}, fibMm2: ${fibMm2})`,
        stepNumber: stepNumber++
      });

      if (sortedArray[i] < target) {
        fibM = fibMm1;
        fibMm1 = fibMm2;
        fibMm2 = fibM - fibMm1;
        offset = i;
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: -1,
          sorted: [],
          description: `${sortedArray[i]} < ${target}, eliminating left portion`,
          stepNumber: stepNumber++
        });
      } else if (sortedArray[i] > target) {
        fibM = fibMm2;
        fibMm1 = fibMm1 - fibMm2;
        fibMm2 = fibM - fibMm1;
        steps.push({
          array: [...sortedArray],
          comparing: [],
          current: -1,
          sorted: [],
          description: `${sortedArray[i]} > ${target}, eliminating right portion`,
          stepNumber: stepNumber++
        });
      } else {
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

    // Check the last element
    if (fibMm1 && offset + 1 < n && sortedArray[offset + 1] === target) {
      steps.push({
        array: [...sortedArray],
        comparing: [offset + 1],
        current: offset + 1,
        sorted: [offset + 1],
        description: `Found target ${target} at position ${offset + 1}!`,
        stepNumber: stepNumber++
      });
      return steps;
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

  // Graph-based search algorithms
  // These algorithms convert the array into a graph representation for demonstration
  
  private depthFirstSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const visited = new Set<number>();
    const stack: number[] = [];

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting DFS for target ${target}`,
      stepNumber: stepNumber++
    });

    // Start from index 0
    stack.push(0);
    
    while (stack.length > 0) {
      const currentIndex = stack.pop()!;
      
      if (visited.has(currentIndex)) continue;
      
      visited.add(currentIndex);
      
      steps.push({
        array: [...array],
        comparing: [currentIndex],
        current: currentIndex,
        sorted: Array.from(visited),
        description: `Visiting node ${currentIndex} with value ${array[currentIndex]}`,
        stepNumber: stepNumber++
      });

      if (array[currentIndex] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: currentIndex,
          sorted: [currentIndex],
          description: `Found target ${target} at index ${currentIndex}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      // Add neighbors (adjacent indices) to stack
      // For simplicity, neighbors are the next and previous indices
      const neighbors = [currentIndex + 1, currentIndex - 1].filter(
        i => i >= 0 && i < array.length && !visited.has(i)
      );
      
      for (const neighbor of neighbors.reverse()) {
        stack.push(neighbor);
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from(visited),
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private breadthFirstSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const visited = new Set<number>();
    const queue: number[] = [];

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting BFS for target ${target}`,
      stepNumber: stepNumber++
    });

    // Start from index 0
    queue.push(0);
    visited.add(0);
    
    while (queue.length > 0) {
      const currentIndex = queue.shift()!;
      
      steps.push({
        array: [...array],
        comparing: [currentIndex],
        current: currentIndex,
        sorted: Array.from(visited),
        description: `Visiting node ${currentIndex} with value ${array[currentIndex]}`,
        stepNumber: stepNumber++
      });

      if (array[currentIndex] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: currentIndex,
          sorted: [currentIndex],
          description: `Found target ${target} at index ${currentIndex}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      // Add neighbors (adjacent indices) to queue
      const neighbors = [currentIndex - 1, currentIndex + 1].filter(
        i => i >= 0 && i < array.length && !visited.has(i)
      );
      
      for (const neighbor of neighbors) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from(visited),
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private dijkstraSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const n = array.length;
    const distances = new Array(n).fill(Infinity);
    const visited = new Set<number>();
    
    distances[0] = 0; // Start from index 0

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Dijkstra's algorithm for target ${target}`,
      stepNumber: stepNumber++
    });

    while (visited.size < n) {
      // Find unvisited node with minimum distance
      let minDistance = Infinity;
      let currentNode = -1;
      
      for (let i = 0; i < n; i++) {
        if (!visited.has(i) && distances[i] < minDistance) {
          minDistance = distances[i];
          currentNode = i;
        }
      }

      if (currentNode === -1) break;
      
      visited.add(currentNode);

      steps.push({
        array: [...array],
        comparing: [currentNode],
        current: currentNode,
        sorted: Array.from(visited),
        description: `Visiting node ${currentNode} with distance ${distances[currentNode]}`,
        stepNumber: stepNumber++
      });

      if (array[currentNode] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: currentNode,
          sorted: [currentNode],
          description: `Found target ${target} at index ${currentNode} with distance ${distances[currentNode]}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      // Update distances to neighbors
      const neighbors = [currentNode - 1, currentNode + 1].filter(
        i => i >= 0 && i < n && !visited.has(i)
      );

      for (const neighbor of neighbors) {
        const weight = Math.abs(array[neighbor] - array[currentNode]); // Edge weight based on value difference
        const newDistance = distances[currentNode] + weight;
        
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          steps.push({
            array: [...array],
            comparing: [currentNode, neighbor],
            current: neighbor,
            sorted: Array.from(visited),
            description: `Updated distance to node ${neighbor}: ${newDistance}`,
            stepNumber: stepNumber++
          });
        }
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from(visited),
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private aStarSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const n = array.length;
    
    // Find target index for heuristic calculation
    let targetIndex = array.indexOf(target);
    if (targetIndex === -1) targetIndex = n - 1; // If not found, aim for last index
    
    const gScore = new Array(n).fill(Infinity); // Cost from start
    const fScore = new Array(n).fill(Infinity); // gScore + heuristic
    const openSet = new Set<number>();
    const closedSet = new Set<number>();
    
    gScore[0] = 0;
    fScore[0] = Math.abs(0 - targetIndex); // Manhattan distance heuristic
    openSet.add(0);

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting A* search for target ${target} (target at index ${targetIndex})`,
      stepNumber: stepNumber++
    });

    while (openSet.size > 0) {
      // Find node in openSet with lowest fScore
      let current = -1;
      let minF = Infinity;
      
      for (const node of Array.from(openSet)) {
        if (fScore[node] < minF) {
          minF = fScore[node];
          current = node;
        }
      }

      openSet.delete(current);
      closedSet.add(current);

      steps.push({
        array: [...array],
        comparing: [current],
        current: current,
        sorted: Array.from(closedSet),
        description: `Exploring node ${current} (f=${fScore[current].toFixed(1)}, g=${gScore[current].toFixed(1)})`,
        stepNumber: stepNumber++
      });

      if (array[current] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: current,
          sorted: [current],
          description: `Found target ${target} at index ${current}!`,
          stepNumber: stepNumber++
        });
        return steps;
      }

      // Check neighbors
      const neighbors = [current - 1, current + 1].filter(
        i => i >= 0 && i < n && !closedSet.has(i)
      );

      for (const neighbor of neighbors) {
        const tentativeG = gScore[current] + Math.abs(array[neighbor] - array[current]);
        
        if (tentativeG < gScore[neighbor]) {
          gScore[neighbor] = tentativeG;
          fScore[neighbor] = gScore[neighbor] + Math.abs(neighbor - targetIndex);
          openSet.add(neighbor);
          
          steps.push({
            array: [...array],
            comparing: [current, neighbor],
            current: neighbor,
            sorted: Array.from(closedSet),
            description: `Updated neighbor ${neighbor} with f=${fScore[neighbor].toFixed(1)}`,
            stepNumber: stepNumber++
          });
        }
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: Array.from(closedSet),
      description: `Target ${target} not found in the array`,
      stepNumber: stepNumber++
    });

    return steps;
  }

  private bellmanFordSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const n = array.length;
    const distances = new Array(n).fill(Infinity);
    distances[0] = 0;

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Bellman-Ford algorithm for target ${target}`,
      stepNumber: stepNumber++
    });

    // Relax edges repeatedly
    for (let i = 0; i < n - 1; i++) {
      let updated = false;
      
      for (let u = 0; u < n; u++) {
        if (distances[u] === Infinity) continue;
        
        const neighbors = [u - 1, u + 1].filter(v => v >= 0 && v < n);
        
        for (const v of neighbors) {
          const weight = Math.abs(array[v] - array[u]);
          
          if (distances[u] + weight < distances[v]) {
            distances[v] = distances[u] + weight;
            updated = true;
            
            steps.push({
              array: [...array],
              comparing: [u, v],
              current: v,
              sorted: [],
              description: `Iteration ${i + 1}: Updated distance to node ${v}: ${distances[v]}`,
              stepNumber: stepNumber++
            });
          }
        }
      }
      
      if (!updated) break;
    }

    // Check for target
    for (let i = 0; i < n; i++) {
      if (array[i] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: i,
          sorted: [i],
          description: `Found target ${target} at index ${i} with distance ${distances[i]}!`,
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

  private floydWarshallSearch(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let stepNumber = 0;
    const n = array.length;
    
    // Initialize distance matrix
    const dist: number[][] = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    
    // Initialize distances
    for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
      if (i > 0) dist[i][i-1] = Math.abs(array[i] - array[i-1]);
      if (i < n-1) dist[i][i+1] = Math.abs(array[i] - array[i+1]);
    }

    steps.push({
      array: [...array],
      comparing: [],
      current: -1,
      sorted: [],
      description: `Starting Floyd-Warshall algorithm for target ${target}`,
      stepNumber: stepNumber++
    });

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            
            steps.push({
              array: [...array],
              comparing: [i, k, j],
              current: k,
              sorted: [],
              description: `Via node ${k}: Updated distance from ${i} to ${j}: ${dist[i][j]}`,
              stepNumber: stepNumber++
            });
          }
        }
      }
    }

    // Find target and show shortest path from index 0
    for (let i = 0; i < n; i++) {
      if (array[i] === target) {
        steps.push({
          array: [...array],
          comparing: [],
          current: i,
          sorted: [i],
          description: `Found target ${target} at index ${i}. Shortest distance from start: ${dist[0][i]}`,
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
}
