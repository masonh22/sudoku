# Sudoku Web App

This project is a web app for playing Sudoku. You can solve and verify the correctness of a random puzzle of a desired difficulty. There are multiple algorithms built in to solve a given puzzle automatically. This can be done instantly or you can watch the algorithm come to a solution step-by-step.

This is still a work in progress.

# Algorithms

Brute force:
The brute force algorithm works from right to left, top to bottom, trying numbers 1-9 and seeing if it violates one of the rules. If it does, it tries the next number. If it eventually leads to a contradiction (no numbers work at a square), it tries the next number. If it reaches a contradiction, it goes back to the previous square. This algorithm is very inefficient, but very simple to reason about and implement. It is garunteed to find a solution, provided one exists. There are, however, puzzles that are designed to combat this algorithm. For example, a puzzle designed to have the first row equal to 9, 8, 7, ..., 1 as the solution would take this algorithm a lot of time to solve (it froze my webpage when I tried a puzzle like this). This algorithm is good enough for most normal puzzles and will find a solution in a fraction of a second.

Smart brute force:
This algorithm is similar to brute force, except instead of working methodically from right to left, top to bottom, it chooses the cells with the fewest possible values and tries those values. After finding a cell with only one possible value, it puts that value in the cell and updates the possible values for cells affected by inserting that value. If no cell has only one possible value, we find the cell with the least possible values and guess one of those values. If this eventually leads to a contradiction (one cell has no possible values), we remove our guess from the possible values of that cell and continue the algorithm. This algorithm is far quicker than the brute force algorithm and it can solve many puzzles without needing to guess. When it does need to guess, it guesses efficiently.

# TODO:

- Add Algorithm X
  + Dropdown algorithm selector (or another algorithm selector)
- Mobile support
  + On screen buttons
  + Board sizing in css
- Random puzzles
  + Puzzle difficulty - find other datasets
  + Remember puzzles a user completed
- Display steps taken to solve puzzle

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
