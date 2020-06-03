import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Square(props) {
  return (
    <td
      className={props.selected ? "square selected" : "square"}
      onClick={props.onClick}>
      {props.value}
    </td>
  );
}

function Undo(props) {
  return (
    <button
      className="undo"
      onClick={props.onClick}>
      Undo
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        selected={this.props.selected === i}
        onClick={() => this.props.squareClick(i)} />
    );
  }

  makeRows() {
    const rows = [];
    for (var i = 0; i < 9; i++) {
      const row = [];
      for (var j = 0; j < 9; j++) {
        row.push(this.renderSquare(i * 9 + j));
      }
      rows.push(<tr>{row}</tr>);
    }
    return rows;
  }

  render() {
    return (
      <div>
        <table class="board">
          {this.makeRows()}
        </table>
        <Undo onClick={this.props.undoClick} />
      </div>
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      selected: null,
      stepNumber: 0,
    };
    this.keyIn = this.keyIn.bind(this);
  }

  squareClick(i) {
    this.setState({
      selected: i,
    });
  }

  undoClick() {
    this.setState(state => {
      const newStep = state.stepNumber === 0 ? 0 : state.stepNumber - 1;
      return {
        stepNumber: newStep,
        history: state.history.slice(0, newStep + 1),
      }
    });
  }

  keyIn(e) {
    if (!isNaN(e.key) && e.key !== '0') {
      this.setState(state => {
        const squares = state.history[state.stepNumber].slice();
        squares[state.selected] = e.key;
        return {
          history: state.history.concat([squares]),
          stepNumber: state.stepNumber + 1,
        };
      });
    } else if (e.key === 'Backspace') {
      this.setState(state => {
        const squares = state.history[state.stepNumber].slice();
        squares[state.selected] = null;
        return {
          history: state.history.concat([squares]),
          stepNumber: state.stepNumber + 1,
        }
      });
    }
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
            squares={this.state.history[this.state.history.length - 1]}
            selected={this.state.selected}
            squareClick={(i) => this.squareClick(i)}
            undoClick={() => this.undoClick()}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
