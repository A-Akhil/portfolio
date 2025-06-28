// Algorithm Visualizer types and interfaces
export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  current?: number;
  sorted?: number[];
  pivots?: number[];
  swapped?: number[];
  description: string;
  stepNumber: number;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  category: 'sorting' | 'searching';
  stable?: boolean;
  inPlace?: boolean;
}

export interface VisualizerState {
  array: number[];
  originalArray: number[];
  currentStep: number;
  steps: AlgorithmStep[];
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  speed: number;
  algorithm: string | null;
  searchTarget?: number;
  comparisons: number;
  swaps: number;
  timeElapsed: number;
}

export interface ControlPanelState {
  arraySize: number;
  speed: number;
  isCustomInput: boolean;
  customArray: string;
}

export type SortingAlgorithm = 
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort'
  | 'shell-sort'
  | 'counting-sort'
  | 'radix-sort'
  | 'bucket-sort'
  | 'tim-sort'
  | 'intro-sort';

export type SearchingAlgorithm =
  | 'linear-search'
  | 'binary-search'
  | 'exponential-search'
  | 'fibonacci-search'
  | 'jump-search'
  | 'interpolation-search'
  | 'depth-first-search'
  | 'breadth-first-search'
  | 'dijkstra'
  | 'a-star'
  | 'bellman-ford'
  | 'floyd-warshall';

export const SORTING_ALGORITHMS: Record<SortingAlgorithm, AlgorithmInfo> = {
  'bubble-sort': {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    category: 'sorting',
    stable: true,
    inPlace: true
  },
  'selection-sort': {
    name: 'Selection Sort',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
    category: 'sorting',
    stable: false,
    inPlace: true
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the final sorted array one item at a time, inserting each element into its correct position.',
    category: 'sorting',
    stable: true,
    inPlace: true
  },
  'merge-sort': {
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divides the array into halves, sorts them separately, then merges the sorted halves.',
    category: 'sorting',
    stable: true,
    inPlace: false
  },
  'quick-sort': {
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Picks a pivot element and partitions the array around it, then recursively sorts the partitions.',
    category: 'sorting',
    stable: false,
    inPlace: true
  },
  'heap-sort': {
    name: 'Heap Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    description: 'Builds a max heap from the array, then repeatedly extracts the maximum element.',
    category: 'sorting',
    stable: false,
    inPlace: true
  },
  'shell-sort': {
    name: 'Shell Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Generalization of insertion sort that allows exchange of far apart elements.',
    category: 'sorting',
    stable: false,
    inPlace: true
  },
  'counting-sort': {
    name: 'Counting Sort',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    spaceComplexity: 'O(k)',
    description: 'Counts the occurrences of each element and uses this information to place elements in sorted order.',
    category: 'sorting',
    stable: true,
    inPlace: false
  },
  'radix-sort': {
    name: 'Radix Sort',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)',
    description: 'Sorts numbers by processing individual digits, starting from the least significant digit.',
    category: 'sorting',
    stable: true,
    inPlace: false
  },
  'bucket-sort': {
    name: 'Bucket Sort',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n)',
    description: 'Distributes elements into buckets, sorts each bucket, then concatenates the sorted buckets.',
    category: 'sorting',
    stable: true,
    inPlace: false
  },
  'tim-sort': {
    name: 'Tim Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Hybrid stable sorting algorithm derived from merge sort and insertion sort.',
    category: 'sorting',
    stable: true,
    inPlace: false
  },
  'intro-sort': {
    name: 'Intro Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(log n)',
    description: 'Hybrid sorting algorithm that combines quicksort, heapsort, and insertion sort.',
    category: 'sorting',
    stable: false,
    inPlace: true
  }
};

export const SEARCHING_ALGORITHMS: Record<SearchingAlgorithm, AlgorithmInfo> = {
  'linear-search': {
    name: 'Linear Search',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element until the target is found or the end is reached.',
    category: 'searching'
  },
  'binary-search': {
    name: 'Binary Search',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Searches a sorted array by repeatedly dividing the search interval in half.',
    category: 'searching'
  },
  'exponential-search': {
    name: 'Exponential Search',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Finds range where element is present, then uses binary search in that range.',
    category: 'searching'
  },
  'fibonacci-search': {
    name: 'Fibonacci Search',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Uses Fibonacci numbers to divide the array into unequal parts for searching.',
    category: 'searching'
  },
  'jump-search': {
    name: 'Jump Search',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    description: 'Jumps ahead by fixed steps, then performs linear search in the identified block.',
    category: 'searching'
  },
  'interpolation-search': {
    name: 'Interpolation Search',
    timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Improves binary search for uniformly distributed data by estimating position.',
    category: 'searching'
  },
  'depth-first-search': {
    name: 'Depth-First Search',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores as far as possible along each branch before backtracking.',
    category: 'searching'
  },
  'breadth-first-search': {
    name: 'Breadth-First Search',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores all neighbors at the current depth before moving to the next depth level.',
    category: 'searching'
  },
  'dijkstra': {
    name: 'Dijkstra\'s Algorithm',
    timeComplexity: { best: 'O(V log V + E)', average: 'O(V log V + E)', worst: 'O(V log V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Finds shortest paths from source vertex to all other vertices in weighted graph.',
    category: 'searching'
  },
  'a-star': {
    name: 'A* Search',
    timeComplexity: { best: 'O(b^d)', average: 'O(b^d)', worst: 'O(b^d)' },
    spaceComplexity: 'O(b^d)',
    description: 'Uses heuristic to guide search towards goal, optimal with admissible heuristic.',
    category: 'searching'
  },
  'bellman-ford': {
    name: 'Bellman-Ford Algorithm',
    timeComplexity: { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)' },
    spaceComplexity: 'O(V)',
    description: 'Finds shortest paths and detects negative weight cycles in weighted graphs.',
    category: 'searching'
  },
  'floyd-warshall': {
    name: 'Floyd-Warshall Algorithm',
    timeComplexity: { best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' },
    spaceComplexity: 'O(V²)',
    description: 'Finds shortest paths between all pairs of vertices in a weighted graph.',
    category: 'searching'
  }
};

// Visualization colors for algorithm states
export const ALGORITHM_COLORS = {
  default: '#4A5568',      // Default element color
  comparing: '#F56565',    // Elements being compared
  current: '#00CCFF',      // Current element
  sorted: '#48BB78',       // Sorted elements
  pivot: '#8B00FF',        // Pivot element
  swapped: '#FFD700',      // Recently swapped elements
  found: '#00FF88',        // Found target element
  visited: '#A78BFA',      // Visited elements in search
  path: '#00CCFF',         // Path elements
  background: '#0A0A0F',   // Background
  text: '#E2E8F0'          // Text color
};

// Speed settings for visualization
export const SPEED_SETTINGS = {
  0.25: 'Very Slow',
  0.5: 'Slow', 
  1: 'Normal',
  2: 'Fast',
  4: 'Very Fast',
  8: 'Ultra Fast'
};
