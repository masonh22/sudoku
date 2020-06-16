/**
 * This file is for Sudoku algorithms. A Sudoku board is represented
 * as a reference that contains one list with the indices of all given
 * numbers and another that represents the values in each position
 */

interface step {
  notes: boolean,
  index: number,
  num: number,
  old: number,
}

interface solution {
  solution: number[],
  steps: Array<step>,
}

/**
 * Checks whether a board is still correct after updating at position [p]
 * @param nums Sudoku board
 * @param p Updated value index
 */
const checkUpdate: (nums: number[], p: number) => boolean =
  (nums: number[], p: number) => {
    const row = Math.floor(p / 9);
    const col = p % 9;
    const boxTop = row < 3 ? 0 : row < 6 ? 3 : 6;
    const boxLeft = col < 3 ? 0 : col < 6 ? 3 : 6;
    let i: number;
    let j: number;
    //Check row
    for (i = row * 9; i < row * 9 + 9; i++) {
      if (nums[i] === nums[p] && i !== p) {
        return false;
      }
    }
    //Check col
    for (i = col; i < 81; i = i + 9) {
      if (nums[i] === nums[p] && i !== p) {
        return false;
      }
    }
    //Check box
    for (i = boxTop * 9; i < boxTop * 9 + 27; i = i + 9) {
      for (j = boxLeft; j < boxLeft + 3; j++) {
        if (nums[i + j] === nums[p] && i + j !== p) {
          return false;
        }
      }
    }
    return true;
  }

const bfHelper: (nums: number[], givens: Set<number>,
  i: number, acc: Array<step>) => solution = (nums, givens, i, acc) => {
    if (i > 80) {
      return { solution: nums, steps: acc };

    } else if (givens.has(i)) {
      //If the cell is given, skip
      return bfHelper(nums, givens, i + 1, acc);

    } else if (nums[i] !== 9) {
      //As long as the current number is not 9, we try the next number
      const newNums = nums.slice()
      newNums[i] = newNums[i] + 1;
      acc.push({ notes: false, index: i, num: newNums[i], old: newNums[i] - 1 })
      if (!checkUpdate(newNums, i)) {
        //If the new number does not work
        return bfHelper(newNums, givens, i, acc);
      }
      const ret = bfHelper(newNums, givens, i + 1, acc);
      if (ret === null) {
        return bfHelper(newNums, givens, i, acc);
      }
      return ret;
    } else {
      acc.push({ notes: false, index: i, num: 0, old: 9 });
      return null;
    }
  }

/**
 * Solves sudoku board [nums] using a brute force method
 * @param nums Sudoku board
 * @param givens Indices of hints on [nums]
 */
const bruteForce: (nums: number[], givens: Set<number>) => solution =
  (nums, givens) => bfHelper(nums, givens, 0, [])

/**
 * Set subtraction [s1] \ [s2]
 * @param s1 First set
 * @param s2 Second set
 */
const subtract: (s1: Set<any>, s2: Set<any>) => Set<any> = (s1, s2) => {
  const diff = new Set(s1);
  for (let e of s2) {
    diff.delete(e);
  }
  return diff;
}

/**
 * Set union [s1] U [s2]
 * @param s1 First set
 * @param s2 Second set
 */
const union: (s1: Set<any>, s2: Set<any>) => Set<any> = (s1, s2) => {
  let un = new Set(s1);
  for (let e of s2) {
    un.add(e);
  }
  return un;
}

/**
 * Generates notes for each space on the sudoku board [nums]
 * @param nums Sudoku board
 */
const makeNotes: (nums: number[]) => Set<number>[] = nums => {
  const sets: Set<number>[] = Array(27);
  const notes: Set<number>[] = Array(81);
  for (let i = 0; i < 27; i++) {
    sets[i] = new Set();
  }
  const possibleNums = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
    if (nums[i] !== 0) {
      sets[row].add(nums[i])
      sets[9 + col].add(nums[i])
      sets[18 + box].add(nums[i])
    }
  }
  for (let i = 0; i < 81; i++) {
    if (nums[i] === 0) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      const box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      notes[i] = subtract(possibleNums, union(sets[row], union(sets[9 + col], sets[18 + box])));
    }
  }
  return notes;
}

/**
 * Updates [notes] after inserting [val] at index [p]
 * @param notes Current notes for a sudoku board
 * @param p Index of changed value
 * @param val Value of changed value
 */
const updateNotes: (notes: Set<number>[], p: number, val: number) => void =
  (notes, p, val) => {
    let i: number;
    let j: number;
    const row = Math.floor(p / 9);
    const col = p % 9;
    const boxTop = row < 3 ? 0 : row < 6 ? 3 : 6;
    const boxLeft = col < 3 ? 0 : col < 6 ? 3 : 6;
    //Iter row
    for (i = row * 9; i < row * 9 + 9; i++) {
      if (notes[i]) notes[i].delete(val);
    }
    //Iter col
    for (i = col; i < 81; i = i + 9) {
      if (notes[i]) notes[i].delete(val);
    }
    //Iter box
    for (i = boxTop * 9; i < boxTop * 9 + 27; i = i + 9) {
      for (j = boxLeft; j < boxLeft + 3; j++) {
        if (notes[i + j]) notes[i + j].delete(val);
      }
    }
  }

/**
 * Copies an array of sets
 * @param l Array of sets
 */
const copySetArray: (l: Set<any>[]) => Set<any>[] = l => {
  let r: Set<any>[] = Array(81).fill(null);
  for (let i = 0; i < l.length; i++) {
    if (l[i]) r[i] = new Set(l[i]);
  }
  return r;
}

const smartFill: (nums: number[], notes: Set<number>[], acc: Array<step>) => solution = (nums, notes, acc) => {
  let i = 0;
  let smallest = [-1, 10];
  while (i < 81 && (!notes[i] || notes[i].size !== 1)) {
    if (notes[i]) smallest = smallest[1] > notes[i].size ? [i, notes[i].size] : smallest;
    if (notes[i] && notes[i].size === 0) {
      return null;
    }
    i++;
  }
  if (!notes[i] || notes[i].size !== 1) {
    if (smallest[0] > -1) {
      i = smallest[0];
      const newNums = nums.slice();
      const val = notes[i].keys().next().value;
      acc.push({ notes: false, index: i, num: val, old: newNums[i] });
      newNums[i] = val;
      const newNotes = copySetArray(notes);
      newNotes[i] = null;
      updateNotes(newNotes, i, val);
      const ret = smartFill(newNums, newNotes, acc);
      if (ret === null) {
        notes[i].delete(val);
        return smartFill(nums, notes, acc);
      }
      return ret;
    }
    return { solution: nums, steps: acc };
  }
  nums[i] = notes[i].keys().next().value;
  acc.push({ notes: false, index: i, num: nums[i], old: 0 });
  notes[i] = null;
  updateNotes(notes, i, nums[i]);
  const ret = smartFill(nums, notes, acc);
  if (ret === null) {
    acc.push({ notes: false, index: i, num: 0, old: null });
  }
  return ret;
}

/**
 * Solves sudoku board [nums] using a smarter brute force algorithm
 * @param nums Sudoku board
 * @param givens Indices of hints on [nums]
 */
const smartBruteForce: (nums: number[], givens: Set<number>) => solution =
  (nums, givens) => {
    const notes = makeNotes(nums);
    return smartFill(nums, notes, []);
  }

/**
 * Generates given hints for new sudoku board [nums]
 * @param nums Sudoku board
 */
const makeGivens: (nums: number[]) => Set<number> = (nums: number[]) => {
  const givens: Set<number> = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      givens.add(i);
    }
  }
  return givens;
}

export { bruteForce, makeGivens, checkUpdate, smartBruteForce };
