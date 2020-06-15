import React from 'react';
import './App.css';
import { makeGivens, bruteForce, checkUpdate, smartBruteForce } from './sudoku.ts';
import { puzzles } from './data.js';

const classNames = obj => {
  let str = '';
  for (let property in obj) {
    if (obj[property]) {
      str += property + ' ';
    }
  }
  return str;
}

const NoteSquare = props => (
  <div
    className={classNames({
      'cell': true,
      'show': !props.show,
    })}
    key={props.val}>
    {props.val}
  </div>
);

class Square extends React.Component {

  renderNotes() {
    let notes = [];
    for (let i = 1; i < 10; i++) {
      notes.push(<NoteSquare val={i} show={this.props.notes[i - 1]} />)
    }
    return <div className="grid">{notes}</div>;
  }

  render() {
    return (
      <td
        className={classNames({
          'square-selected': this.props.selected,
          'incorrect': this.props.value !== this.props.solution,
          'given': this.props.given,
        })}
        onClick={this.props.onClick}
        key={this.props.val}>
        {this.props.value === 0 ? this.renderNotes() : this.props.value}
      </td>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        given={this.props.givens.has(i)}
        solution={this.props.solution[i]}
        selected={this.props.selected === i}
        notes={this.props.notes[i]}
        onClick={() => this.props.squareClick(i)}
        val={i} />
    );
  }

  makeRows() {
    const rows = [];
    for (var i = 0; i < 9; i++) {
      const row = [];
      for (var j = 0; j < 9; j++) {
        row.push(this.renderSquare(i * 9 + j));
      }
      rows.push(<tr key={i}>{row}</tr>);
    }
    return rows;
  }

  render() {
    return (
      <div className="main-container">
        <table className="board">
          <tbody>
            {this.makeRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    let notes = Array(81).fill(null);
    for (let i = 0; i < 81; i++) {
      notes[i] = Array(9).fill(false);
    }
    const choice = Math.floor(Math.random() * puzzles.length);
    /**
     * History is represented as list of objects {notes: true/false, index: index, num: current number, old: old number}
     */
    this.state = {
      history: [],
      puzzle: puzzles[choice].puzzle.slice(),
      givens: makeGivens(puzzles[choice].puzzle),
      solution: puzzles[choice].solution,
      puzzleNum: choice,
      notes: this.emptyNotes(),
      selected: 0,
      stepNumber: 0,
      noteMode: false,
    };
    this.keyIn = this.keyIn.bind(this);
  }

  emptyNotes() {
    let notes = Array(81).fill(null);
    for (let i = 0; i < 81; i++) {
      notes[i] = Array(9).fill(false);
    }
    return notes;
  }

  squareClick(i) {
    this.setState({
      selected: i,
    });
  }

  undoClick() {
    this.setState(state => {
      if (state.stepNumber === 0) return;
      const newStep = state.stepNumber - 1;
      const hist = state.history[newStep];
      if (hist.notes) {
        state.notes[hist.index][hist.num - 1] = !state.notes[hist.index][hist.num - 1];
      } else {
        if (state.puzzleNum < 0 && hist.old === 0) state.givens.delete(hist.index);
        console.log(hist.old);
        state.puzzle[hist.index] = hist.old;
      }
      return {
        stepNumber: newStep,
        history: state.history.slice(0, newStep),
      }
    });
  }

  keyIn(e) {
    if (!e) {
      return;
    } else if (e.code === 'Space') {
      this.notesClick();
    } else {
      this.setState(state => {
        if (!isNaN(parseInt(e.key)) && e.code !== 'Digit0' && !state.givens.has(state.selected)) {
          const num = parseInt(e.key);
          if (state.noteMode) {
            state.notes[state.selected][num - 1] = !state.notes[state.selected][num - 1];
            return {
              history: state.history.concat([{ notes: true, index: state.selected, num: num, }]),
              stepNumber: state.stepNumber + 1,
            };
          } else {
            if (state.puzzleNum < 0) state.givens.add(state.selected);
            const old = state.puzzle[state.selected];
            state.puzzle[state.selected] = num;
            return {
              history: state.history.concat([{ notes: false, index: state.selected, num: num, old: old }]),
              stepNumber: state.stepNumber + 1,
            };
          }
        } else if (e.key === 'Backspace') {
          if (state.puzzleNum < 0 || !state.givens.has(state.selected)) {
            state.givens.delete(state.selected);
            const old = state.puzzle[state.selected];
            state.puzzle[state.selected] = 0;
            return {
              history: state.history.concat([{ notes: false, index: state.selected, num: 0, old: old }]),
              stepNumber: state.stepNumber + 1,
            };
          }
        } else if (e.key === 'ArrowRight') {
          if (state.selected % 9 !== 8) {
            return {
              selected: state.selected + 1,
            }
          }
          return {};
        } else if (e.key === 'ArrowLeft') {
          if (state.selected % 9 !== 0) {
            return {
              selected: state.selected - 1,
            }
          }
          return {};
        } else if (e.key === 'ArrowUp') {
          if (Math.floor(state.selected / 9) !== 0) {
            return {
              selected: state.selected - 9,
            }
          }
          return {};
        } else if (e.key === 'ArrowDown') {
          if (Math.floor(state.selected / 9) !== 8) {
            return {
              selected: state.selected + 9,
            }
          }
          return {};
        }
      });
    }
  }

  notesClick() {
    this.setState(state => ({
      noteMode: !state.noteMode
    }));
  }

  solveSteps(algorithm) {
    const solved = algorithm(this.state.puzzle.slice(),
      this.state.givens)
    if (solved === null) {
      return;
    }
    console.log('steps: ' + solved.steps.length);
    this.setState(state => ({
      history: state.history.concat(solved.steps),
      solution: solved.solution,
      selected: null,
    }));
    setTimeout(() => {
      let i = 0;
      let playback = setInterval(() => {
        this.setState(state => {
          const history = state.history[i];
          state.puzzle[history.index] = history.num;
          return {
            stepNumber: i + 1,
          }
        });
        i++;
        if (i === this.state.history.length) {
          clearInterval(playback);
        }
      }, 1)
    }, 100);
  }

  reset() {
    this.setState(state => {
      if (state.puzzleNum < 0) {
        this.clear();
      } else {
        return {
          history: [],
          puzzle: puzzles[state.puzzleNum].puzzle.slice(),
          notes: this.emptyNotes(),
          selected: 0,
          stepNumber: 0,
          noteMode: false,
        }
      }
    });
  }

  randomPuzzle() {
    const choice = Math.floor(Math.random() * puzzles.length);
    this.setState(state => ({
      history: [],
      puzzle: puzzles[choice].puzzle.slice(),
      givens: makeGivens(puzzles[choice].puzzle),
      solution: puzzles[choice].solution,
      puzzleNum: choice,
      notes: this.emptyNotes(),
      selected: 0,
      stepNumber: 0,
      noteMode: false,
    }))
  }

  clear() {
    this.setState(state => {
      const puzzle = Array(81).fill(0);
      return {
        history: [],
        puzzle: puzzle,
        givens: new Set(),
        solution: puzzle,
        puzzleNum: -1,
        notes: this.emptyNotes(),
        selected: null,
        stepNumber: 0,
        noteMode: false,
      }
    });
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyIn);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyIn);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.puzzle}
            solution={
              this.state.puzzleNum === -1 ? this.state.solution :
                puzzles[this.state.puzzleNum].solution}
            givens={this.state.givens}
            selected={this.state.selected}
            notes={this.state.notes}
            squareClick={(i) => this.squareClick(i)}
          />
        </div>
        <button
          className="undo"
          onClick={() => this.undoClick()}>
          Undo
        </button>
        <button
          className="reset"
          onClick={() => this.reset()}>
          Reset
        </button>
        <button
          className="notes"
          onClick={() => this.notesClick()}>
          Notes
        </button>
        <button
          className="solve"
          onClick={() => this.solveSteps(smartBruteForce)}>
          Solve
        </button>
        <button
          className="random"
          onClick={() => this.randomPuzzle()}>
          Random Puzzle
        </button>
        <button
          className="clear"
          onClick={() => this.clear()}>
          Clear
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="app">
      <Game />
    </div>
  );
}

export default App;