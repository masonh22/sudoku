import React from 'react';
import './App.css';
import { makeGivens, bfSteps, bruteForce } from './sudoku.ts';

const puzzles = [
  {
    puzzle: [0, 0, 4, 3, 0, 0, 2, 0, 9, 0, 0, 5, 0, 0, 9, 0, 0, 1, 0, 7, 0, 0, 6, 0, 0, 4, 3, 0, 0, 6, 0, 0, 2, 0, 8, 7, 1, 9, 0, 0, 0, 7, 4, 0, 0, 0, 5, 0, 0, 8, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 1, 0, 5, 0, 0, 3, 5, 0, 8, 6, 9, 0, 0, 4, 2, 9, 1, 0, 3, 0, 0],
    solution: [8, 6, 4, 3, 7, 1, 2, 5, 9, 3, 2, 5, 8, 4, 9, 7, 6, 1, 9, 7, 1, 2, 6, 5, 8, 4, 3, 4, 3, 6, 1, 9, 2, 5, 8, 7, 1, 9, 8, 6, 5, 7, 4, 3, 2, 2, 5, 7, 4, 8, 3, 9, 1, 6, 6, 8, 9, 7, 3, 4, 1, 2, 5, 7, 1, 3, 5, 2, 8, 6, 9, 4, 5, 4, 2, 9, 1, 6, 3, 7, 8],
  },
  {
    puzzle: [0, 4, 0, 1, 0, 0, 0, 5, 0, 1, 0, 7, 0, 0, 3, 9, 6, 0, 5, 2, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 0, 0, 0, 9, 0, 6, 8, 0, 0, 8, 0, 3, 0, 5, 0, 6, 2, 0, 0, 9, 0, 0, 6, 0, 5, 4, 3, 6, 0, 0, 0, 8, 0, 7, 0, 0, 2, 5, 0, 0, 9, 7, 1, 0, 0],
    solution: [3, 4, 6, 1, 7, 9, 2, 5, 8, 1, 8, 7, 5, 2, 3, 9, 6, 4, 5, 2, 9, 6, 4, 8, 3, 7, 1, 9, 6, 5, 8, 3, 2, 4, 1, 7, 4, 7, 2, 9, 1, 6, 8, 3, 5, 8, 1, 3, 7, 5, 4, 6, 2, 9, 7, 9, 8, 2, 6, 1, 5, 4, 3, 6, 3, 1, 4, 8, 5, 7, 9, 2, 2, 5, 4, 3, 9, 7, 1, 8, 6],
  },
  {
    puzzle: Array(81).fill(0),
    solution: Array(81).fill(0),
  }
];

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
    this.state = {
      history: [puzzles[0].puzzle],
      solution: puzzles[0].solution,
      givens: makeGivens(puzzles[0].puzzle),
      notes: notes,
      selected: null,
      stepNumber: 0,
      noteMode: false,
    };
    this.keyIn = this.keyIn.bind(this);
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
    if (!isNaN(e.key) && e.key !== '0' && this.state.history[0][this.state.selected] === 0) {//Update this later
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

  //Still starts at step 0
  bfSolveSteps() {
    this.solve(bfSteps);
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

  clear() {
    this.setState(state => ({
      history: state.history.slice(0, 1),
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
          className="clear"
          onClick={() => this.clear()}>
          Clear
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