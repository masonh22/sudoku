/**
 * This file is for Sudoku algorithms. A Sudoku board is represented
 * as a reference that contains one list with the indices of all given
 * numbers and another that represents the values in each position
 */

//Checks whether a board is still correct after updating at position [i]
const checkUpdate: (nums: number[], p: number) => boolean =
  (nums: number[], p: number) => {
    const row = Math.floor(p / 9);
    const col = p % 9;
    const boxTop = row < 3 ? 0 : row < 6 ? 3 : 6;
    const boxLeft = col < 3 ? 0 : col < 6 ? 3 : 6;
    let elts: number[] = [];
    let i: number;
    let j: number;
    //Check row
    for (i = row * 9; i < row * 9 + 9; i++) {
      if (nums[i] !== null) {
        if (elts.includes(nums[i])) {
          return false;
        }
        elts.push(nums[i]);
      }
    }
    elts = [];
    //Check col
    for (i = col; i < 81; i = i + 9) {
      if (nums[i] !== null) {
        if (elts.includes(nums[i])) {
          return false;
        }
        elts.push(nums[i]);
      }
    }
    elts = [];
    //Check box
    for (i = boxTop * 9; i < boxTop * 9 + 27; i = i + 9) {
      for (j = boxLeft; j < boxLeft + 3; j++) {
        if (nums[i + j] !== null) {
          if (elts.includes(nums[i + j])) {
            return false;
          }
          elts.push(nums[i + j]);
        }
      }
    }
    return true;
  }

// Add comment maybe
const bfStepsHelper: (nums: number[], givens: number[],
  i: number, j: number, acc: number[][]) => number[][] =
  (nums: number[], givens: number[], i: number, j: number, acc: number[][]) => {
    if (i > 80) {
      return acc;

    } else if (i === givens[j]) {
      //If the cell is given, skip
      return bfStepsHelper(nums, givens, i + 1, j + 1, acc);

    } else if (nums[i] !== 9) {
      //As long as the current number is not 9, we try the next number
      const newNums = nums.slice()
      newNums[i] = newNums[i] + 1;
      acc.push(newNums);
      if (!checkUpdate(newNums, i)) {
        //If the new number does not work
        return bfStepsHelper(newNums, givens, i, j, acc);
      }
      const ret = bfStepsHelper(newNums, givens, i + 1, j, acc);
      if (ret === null) {
        return bfStepsHelper(newNums, givens, i, j, acc);
      }
      return ret;
    } else {
      return null;
    }
  }

// Outputs an array containing each step in order
const bfSteps: (nums: number[], givens: number[]) => number[][] =
  (nums: number[], givens: number[]) => {
    const sol = bfStepsHelper(nums, givens, 0, 0, []);
    return sol.slice();
  }

// For now, this assumes that the board has only the given numbers
const bfHelper: (nums: number[], givens: number[], i: number, j: number)
  => number[][] =
  (nums: number[], givens: number[], i: number, j: number) => {
    if (i > 80) {
      return [nums];

    } else if (i === givens[j]) {
      //If the cell is given, skip
      return bfHelper(nums, givens, i + 1, j + 1);

    } else if (nums[i] !== 9) {
      //At this point, we are going to mutate the board. Instead, we want to create a new one and modify that
      const newNums = nums.slice();
      //As long as the current number is not 9, we try the next number
      newNums[i] = newNums[i] + 1;
      if (!checkUpdate(newNums, i)) {
        //If the new number does not work
        return bfHelper(newNums, givens, i, j);
      } else {
        const ret = bfHelper(newNums, givens, i + 1, j);
        if (ret === null) {
          return bfHelper(newNums, givens, i, j);
        } else {
          return ret;
        }
      }
    } else {
      return null;
    }
  }

const bruteForce: (nums: number[], givens: number[]) => number[][] =
  (nums: number[], givens: number[]) => bfHelper(nums, givens, 0, 0);

const makeGivens = (nums: number[]) => {
  const givens = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== null) {
      givens.push(i);
    }
  }
  return givens;
}

export { bruteForce, bfSteps, makeGivens };
