/**
 * This file is for Sudoku algorithms. A Sudoku board is represented
 * as a reference that contains one list with the indices of all given
 * numbers and another that represents the values in each position
 */

//Checks whether a board is still correct after updating at position [i]
const checkUpdate = (nums, p) => {
  const row = Math.floor(p / 9);
  const col = p % 9;
  const boxTop = row < 3 ? 0 : row < 6 ? 3 : 6;
  const boxLeft = col < 3 ? 0 : col < 6 ? 3 : 6;
  let elts = [];
  let i;
  let j;
  //Check row
  for (i = row * 9; i < row * 9 + 9; i++) {
    if (nums[i] !== 0) {
      if (elts.includes(nums[i])) {
        return false;
      }
      elts.push(nums[i]);
    }
  }
  elts = [];
  //Check col
  for (i = col; i < 81; i = i + 9) {
    if (nums[i] !== 0) {
      if (elts.includes(nums[i])) {
        return false;
      }
      elts.push(nums[i]);
    }
  }
  elts = [];
  //Check box
  for (i = boxTop * 9; i < boxTop * 9 + 3; i = i + 9) {
    for (j = boxLeft; j < boxLeft + 3; j++) {
      if (nums[i + j] !== 0) {
        if (elts.includes(nums[i + j])) {
          return false;
        }
        elts.push(nums[i + j]);
      }
    }
  }
  return true;
}

// For now, this assumes that the board has only the given numbers
const bfHelper = (nums, givens, i, j) => {
  if (i > 80) {
    return nums;
  }
  //If the cell is given, skip
  if (i === givens[j]) {
    return bfHelper(nums, givens, i + 1, j + 1);
  }

  if (nums[i] !== 9) {
    //At this point, we are going to mutate the board. Instead, we want to create a new one and modify that
    const newNums = nums.slice();
    //As long as the current number is not 9, we try the next number
    newNums[i] = newNums[i] + 1;
    if (!checkUpdate(newNums, i)) {
      return bfHelper(newNums, givens, i, j);
    }
    const ret = bfHelper(newNums, givens, i + 1, j);
    if (ret === null) {
      return bfHelper(newNums, givens, i, j);
    }
    return ret;
  } else {
    return null;
  }
}

const bruteForce = board => bfHelper(board.nums, board.givens, 0, 0);

const nums1 = [0, 0, 4, 3, 0, 0, 2, 0, 9, 0, 0, 5, 0, 0, 9, 0, 0, 1, 0, 7, 0, 0, 6, 0, 0, 4, 3, 0, 0, 6, 0, 0, 2, 0, 8, 7, 1, 9, 0, 0, 0, 7, 4, 0, 0, 0, 5, 0, 0, 8, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1, 0, 5, 0, 0, 3, 5, 0, 8, 6, 9, 0, 0, 4, 2, 9, 1, 0, 3, 0, 0];
const makeGivens = nums => {
  const givens = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      givens.push(i);
    }
  }
  return givens;
}
const givens1 = makeGivens(nums1);
const puzzle1 = { givens: givens1, nums: nums1 };

const nums2 = [8, 6, 4, 3, 7, 1, 2, 5, 9, 3, 2, 5, 8, 4, 9, 7, 6, 1, 9, 7, 1, 2, 6, 5, 8, 4, 3, 4, 3, 6, 1, 9, 2, 5, 8, 7, 1, 9, 8, 6, 5, 7, 4, 3, 2, 2, 5, 7, 4, 8, 3, 9, 1, 6, 6, 8, 9, 7, 3, 4, 1, 2, 5, 7, 1, 3, 5, 2, 8, 6, 9, 4, 5, 4, 2, 9, 1, 6, 3, 7, 8];
const givens2 = makeGivens(nums2);
const puzzle2 = { givens: givens2, nums: nums2 };

const nums3 = [0, 4, 0, 1, 0, 0, 0, 5, 0, 1, 0, 7, 0, 0, 3, 9, 6, 0, 5, 2, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 0, 0, 0, 9, 0, 6, 8, 0, 0, 8, 0, 3, 0, 5, 0, 6, 2, 0, 0, 9, 0, 0, 6, 0, 5, 4, 3, 6, 0, 0, 0, 8, 0, 7, 0, 0, 2, 5, 0, 0, 9, 7, 1, 0, 0];
const givens3 = makeGivens(nums3);
const puzzle3 = { givens: givens3, nums: nums3 };

console.log(bruteForce(puzzle3))