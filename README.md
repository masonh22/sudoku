# Sudoku Web App

This project is a web app for playing Sudoku. You can solve and verify the correctness of a random puzzle of a desired difficulty. There are multiple algorithms built in to solve a given puzzle automatically. This can be done instantly or you can watch the algorithm come to a solution step-by-step.

This is still a work in progress.

# Algorithms

Brute force:
The brute force algorithm works from right to left, top to bottom, trying numbers 1-9 and seeing if it violates one of the rules. If it does, it tries the next number. If it eventually leads to a contradiction (no numbers work at a square), it tries the next number. If it reaches a contradiction, it goes back to the previous square. This algorithm is very inefficient, but very simple to reason about and implement. It is garunteed to find a solution, provided one exists. There are, however, puzzles that are designed to combat this algorithm. For example, a puzzle designed to have the first row equal to 9, 8, 7, ..., 1 as the solution would take this algorithm a lot of time to solve (it froze my webpage when I tried a puzzle like this). This algorithm is good enough for most normal puzzles and will find a solution in a fraction of a second.

Smart brute force:
This algorithm is similar to brute force, except instead of working methodically from right to left, top to bottom, it chooses the cells with the fewest possible values and tries those values. After finding a cell with only one possible value, it puts that value in the cell and updates the possible values for cells affected by inserting that value. If no cell has only one possible value, we find the cell with the least possible values and guess one of those values. If this eventually leads to a contradiction (one cell has no possible values), we remove our guess from the possible values of that cell and continue the algorithm. This algorithm is far quicker than the brute force algorithm and it can solve many puzzles without needing to guess. When it does need to guess, it guesses efficiently.

# TODO:

- Mobile support
  + On screen buttons
  + Board sizing in css
- Random puzzles
  + Puzzle difficulty - find other datasets
  + Remember puzzles a user completed
- Display steps taken to solve puzzle
