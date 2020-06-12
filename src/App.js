import React from 'react';
import './App.css';
import { makeGivens, bfSteps, bruteForce } from './sudoku.ts';
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
    this.state = {
      history: [puzzles[choice].puzzle],
      solution: puzzles[choice].solution,
      givens: makeGivens(puzzles[choice].puzzle),
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
    console.log('undo');
    this.setState(state => {
      const newStep = state.stepNumber === 0 ? 0 : state.stepNumber - 1;
      return {
        stepNumber: newStep,
        history: state.history.slice(0, newStep + 1),
      }
    });
  }

  keyIn(e) {
    if (!e) {
      return;
    }
    if (!isNaN(parseInt(e.key)) && e.code !== 'Digit0' && this.state.history[0][this.state.selected] === 0) {//Update this later
      console.log('key in');
      this.setState(state => {
        if (state.noteMode) {
          const notes = state.notes.slice();
          notes[state.selected][parseInt(e.key) - 1] = !notes[state.selected][parseInt(e.key) - 1]
          return {
            notes: notes,
          }
        } else {
          const squares = state.history[state.stepNumber].slice();
          squares[state.selected] = parseInt(e.key);
          return {
            history: state.history.concat([squares]),
            stepNumber: state.stepNumber + 1,
          };
        }
      });
    } else if (e.key === 'Backspace') {
      this.setState(state => {
        const squares = state.history[state.stepNumber].slice();
        squares[state.selected] = 0;
        return {
          history: state.history.concat([squares]),
          stepNumber: state.stepNumber + 1,
        }
      });
    } else if (e.key === 'ArrowRight') {
      this.setState(state => {
        if (state.selected % 9 !== 8) {
          return {
            selected: state.selected + 1,
          }
        }
        return {};
      });
    } else if (e.key === 'ArrowLeft') {
      this.setState(state => {
        if (state.selected % 9 !== 0) {
          return {
            selected: state.selected - 1,
          }
        }
        return {};
      });
    } else if (e.key === 'ArrowUp') {
      this.setState(state => {
        if (Math.floor(state.selected / 9) !== 0) {
          return {
            selected: state.selected - 9,
          }
        }
        return {};
      });
    } else if (e.key === 'ArrowDown') {
      this.setState(state => {
        if (Math.floor(state.selected / 9) !== 8) {
          return {
            selected: state.selected + 9,
          }
        }
        return {};
      });
    } else if (e.code === 'Space') {
      this.notesClick();
    }
  }

  notesClick() {
    this.setState(state => ({
      noteMode: !state.noteMode
    }));
  }

  solve(algorithm) {
    console.log('solving');
    const solved = algorithm(this.state.history[this.state.stepNumber],
      this.state.givens)
    this.setState(state => ({
      history: state.history.concat(solved),
      stepNumber: state.stepNumber + solved.length,
    }));
  }

  bfSolveSteps() {
    const solved = bfSteps(this.state.history[this.state.stepNumber],
      this.state.givens)
    if (solved === null) {
      return;
    }
    this.setState(state => ({
      history: state.history.concat(solved)
    }));
    setTimeout(() => {
      let i = 0;
      let playback = setInterval(() => {
        this.setState({
          stepNumber: i,
        });
        i++;
        if (i === this.state.history.length) {
          clearInterval(playback);
        }
      }, 1)
    }, 100)
  }

  reset() {
    this.setState(state => ({
      history: state.history.slice(0, 1),
      notes: this.emptyNotes(),
      selected: 0,
      stepNumber: 0,
    }));
  }

  randomPuzzle() {
    const choice = Math.floor(Math.random() * puzzles.length);
    this.setState(state => ({
      history: [puzzles[choice].puzzle],
      solution: puzzles[choice].solution,
      givens: makeGivens(puzzles[choice].puzzle),
      notes: this.emptyNotes(),
      selected: 0,
      stepNumber: 0,
    }))
  }

  clear() {
    this.setState(state => ({
      history: [Array(81).fill(0)],
      notes: this.emptyNotes(),
      selected: null,
      stepNumber: 0,
    }));
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
            squares={this.state.history[this.state.stepNumber]}
            solution={this.state.solution}
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
          onClick={() => this.bfSolveSteps()}>
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