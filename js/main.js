/*----- Constants -----*/
const PLAYERS = {
  1: {
    name: "Player 1",
    symbol: "X",
    color: "white"
  },
  "-1": {
    name: "Player 2",
    symbol: "O",
    color: "white"
  }
};
const WIN_COMBOS = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- State Variables -----*/
let turn, board, winner;

/*----- Cached Element References -----*/
const h2El = document.querySelector("h2");
const boardEl = document.getElementById("board");
const resetBtnEl = document.createElement("button");

/*----- Event Listeners -----*/
boardEl.addEventListener("click", handleBoardClick);
resetBtnEl.addEventListener("click", handleReset);

/*----- Initialize Game -----*/
init();

/*----- Functions -----*/
function init() {
  turn = 1;
  board = [null, null, null, null, null, null, null, null, null];
  winner = null;
  render();
}

function render() {
  renderMessage();
  renderBoard();
  renderResetBtn();
}

function handleBoardClick(evt) {
  if (!winner) {
    const idx = parseInt(evt.target.id.slice(4));
    if (!board[idx]) {
      board[idx] = turn;
      checkForWinner();
      if (!winner) changeTurn();
      render();
    } else {
      console.log("This tile is not empty");
    }
  }
}

function changeTurn() {
  turn *= -1;
}

function checkForWinner() {
  WIN_COMBOS.forEach(combo => {
    const score = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]);
    if (score === 3) {
      winner = turn;
    }
  });
}

function renderMessage() {
  if (winner) {
    h2El.innerText = `${PLAYERS[winner].name} has won!`;
  } else if (!winner && !board.includes(null)) {
    h2El.innerText = "It's a cat's game!";
  } else {
    h2El.innerText = `${PLAYERS[turn].name}'s turn`;
  }
}
      function renderBoard() {
        for (let cell of boardEl.children) {
          const idx = parseInt(cell.id.slice(4));
          cell.innerText = board[idx] ? PLAYERS[board[idx]].symbol : '';
          if (board[idx]) {
            cell.style.color = PLAYERS[board[idx]].color;
          } else {
            cell.style.color = "inherit";
          }
        }
      }
      


function renderResetBtn() {
  resetBtnEl.innerText = "Reset";
  h2El.appendChild(resetBtnEl);
}
function handleReset(){
  resetBtnEl.remove()
  init()
}

// Start the game
init();
