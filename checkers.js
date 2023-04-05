 /* * Title: (checkers-game-js) * Author:(Niement, M) * Date: (2022) * Code version:(v1.0.0.0) * Availability:(https://github.com/niemet0502/checkers-game-js) * */
//initializes a game board for checkers with a 8x8 grid
const checkerBoard = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

//values for variables that will be used to keep track of the game
//true represents red's turn, false represents black's turn
let turn = true; 
let redPlay = 12;
let blackPlay = 12;
let playerPieces;
let redPiece = document.querySelectorAll("p");
let blackPiece = document.querySelectorAll("span")
const cells = document.querySelectorAll("td");
const redTurnText = document.querySelectorAll(".red-text");
const blackTurntext = document.querySelectorAll(".black-text");
const divider = document.querySelector(".divider")

//keep track of the selected piece on the board
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    king: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

//adds a click event listener to each of the current player's pieces
function givePiecesEventListeners() {
    const pieces = turn ? redPiece : blackPiece;
    for (const piece of pieces) {
      piece.addEventListener("click", getPlayerPieces);
    }
}

//function is called when a player clicks on one of their pieces
function getPlayerPieces() {
    playerPieces = turn ? redPiece : blackPiece;
    removeCellonclick();
    resetBorders();
}

//removes the "onclick" attribute from all cells on the board
function removeCellonclick() {
    for (const cell of cells) {
      cell.removeAttribute("onclick");
    }
}

//resets the borders of all the current player's pieces
function resetBorders() {
    for (const piece of playerPieces) {
      piece.style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

//resets all the properties of the selected piece
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.king = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

//function gets the selected piece and sets its index on the board
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = checkerBoard.indexOf(selectedPiece.pieceId);
    isPieceKing();
}

//function checks if the selected piece is a king and gets its available spaces
function isPieceKing() {
    selectedPiece.king = document.getElementById(selectedPiece.pieceId).classList.contains("king");
    getAvailableSpaces();
}

//function calculates the available spaces a selected piece can move to
function getAvailableSpaces() {
     //calculate the index of potential spaces based on the selected piece's current index
    const seventhSpace = selectedPiece.indexOfBoardPiece + 7;
    const ninthSpace = selectedPiece.indexOfBoardPiece + 9;
    const minusSeventhSpace = selectedPiece.indexOfBoardPiece - 7;
    const minusNinthSpace = selectedPiece.indexOfBoardPiece - 9;
    //check if the space is empty and does not have a "noPiece" class then mark as available
    if (checkerBoard[seventhSpace] === null && !cells[seventhSpace].classList.contains("noPiece")) {
        selectedPiece.seventhSpace = true;
    }
    if (checkerBoard[ninthSpace] === null && !cells[ninthSpace].classList.contains("noPiece")) {
        selectedPiece.ninthSpace = true;
    }
    if (checkerBoard[minusSeventhSpace] === null && !cells[minusSeventhSpace].classList.contains("noPiece")) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (checkerBoard[minusNinthSpace] === null && !cells[minusNinthSpace].classList.contains("noPiece")) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

//function checks for available jump spaces based on the current turn and selected piece's position
function checkAvailableJumpSpaces() {
    const isTurn = turn;
    const selectedBoardIndex = selectedPiece.indexOfBoardPiece;
    if (isTurn) {
      //check for available jump spaces when it's the player's turn.
      const canJumpToFourteenthSpace = (
        checkerBoard[selectedBoardIndex + 14] === null &&
        !cells[selectedBoardIndex + 14].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex + 7] >= 12
      );
      const canJumpToEighteenthSpace = (
        checkerBoard[selectedBoardIndex + 18] === null &&
        !cells[selectedBoardIndex + 18].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex + 9] >= 12
      );
      const canJumpToMinusFourteenthSpace = (
        checkerBoard[selectedBoardIndex - 14] === null &&
        !cells[selectedBoardIndex - 14].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex - 7] >= 12
      );
      const canJumpToMinusEighteenthSpace = (
        checkerBoard[selectedBoardIndex - 18] === null &&
        !cells[selectedBoardIndex - 18].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex - 9] >= 12
      );
      //update the selected piece's jump spaces status based on the above checks
      selectedPiece.fourteenthSpace = canJumpToFourteenthSpace;
      selectedPiece.eighteenthSpace = canJumpToEighteenthSpace;
      selectedPiece.minusFourteenthSpace = canJumpToMinusFourteenthSpace;
      selectedPiece.minusEighteenthSpace = canJumpToMinusEighteenthSpace;
    } else {
      //check for available jump spaces when it's the opponent's turn
      const canJumpToFourteenthSpace = (
        checkerBoard[selectedBoardIndex + 14] === null &&
        !cells[selectedBoardIndex + 14].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex + 7] < 12 &&
        checkerBoard[selectedBoardIndex + 7] !== null
      );
      const canJumpToEighteenthSpace = (
        checkerBoard[selectedBoardIndex + 18] === null &&
        !cells[selectedBoardIndex + 18].classList.contains("noPiece") &&
        checkerBoard[selectedBoardIndex + 9] < 12 &&
        checkerBoard[selectedBoardIndex + 9] !== null
      );
      const canJumpToMinusFourteenthSpace = (
        checkerBoard[selectedBoardIndex - 14] === null &&
        !cells[selectedBoardIndex - 14].classList.contains("noPieceHere") &&
        checkerBoard[selectedBoardIndex - 7] < 12 &&
        checkerBoard[selectedBoardIndex - 7] !== null
      );
      const canJumpToMinusEighteenthSpace = (
        checkerBoard[selectedBoardIndex - 18] === null &&
        !cells[selectedBoardIndex - 18].classList.contains("noPieceHere") &&
        checkerBoard[selectedBoardIndex - 9] < 12 &&
        checkerBoard[selectedBoardIndex - 9] !== null
      );
      //update the selected piece's jump spaces status based on the above
      selectedPiece.fourteenthSpace = canJumpToFourteenthSpace;
      selectedPiece.eighteenthSpace = canJumpToEighteenthSpace;
      selectedPiece.minusFourteenthSpace = canJumpToMinusFourteenthSpace;
      selectedPiece.minusEighteenthSpace = canJumpToMinusEighteenthSpace;
    }
    checkPieceConditions();
}

//function checks the conditions of the selected piece and decides whether to apply borders to the spaces it can move to
function checkPieceConditions() {
    if (selectedPiece.king) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        //otherwise, give borders only to the spaces that the selected piece can move to based on its current position and turn
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

//function applies borders to the available spaces for the selected piece
function givePieceBorder() {
    //list of spaces that the selected piece can move to
    const spaces = ['seventhSpace', 'ninthSpace', 'fourteenthSpace', 'eighteenthSpace', 'minusSeventhSpace', 'minusNinthSpace', 'minusFourteenthSpace', 'minusEighteenthSpace'];
    //selected piece can move to any of the available spaces, give it a green border
    if (spaces.some(space => selectedPiece[space])) {
      const pieceId = selectedPiece.pieceId;
      document.getElementById(pieceId).style.border = "3px solid green";
      giveCellsClick();
    }
  }

//sets the cells of available spaces for the selected piece to be clickable
function giveCellsClick() {
    const offsets = [7, 9, 14, 18, -7, -9, -14, -18];
    offsets.forEach(offset => {
      const targetIndex = selectedPiece.indexOfBoardPiece + offset;
      if (selectedPiece[`plus${Math.abs(offset)}thSpace`] && cells[targetIndex]) {
        cells[targetIndex].setAttribute("onclick", `makeMove(${offset})`);
      }
    });
  }

function giveCellsClick() {
    //an array of moves that the selected piece can make
    const moves = [
      { space: selectedPiece.seventhSpace, index: selectedPiece.indexOfBoardPiece + 7, value: 7 },
      { space: selectedPiece.ninthSpace, index: selectedPiece.indexOfBoardPiece + 9, value: 9 },
      { space: selectedPiece.fourteenthSpace, index: selectedPiece.indexOfBoardPiece + 14, value: 14 },
      { space: selectedPiece.eighteenthSpace, index: selectedPiece.indexOfBoardPiece + 18, value: 18 },
      { space: selectedPiece.minusSeventhSpace, index: selectedPiece.indexOfBoardPiece - 7, value: -7 },
      { space: selectedPiece.minusNinthSpace, index: selectedPiece.indexOfBoardPiece - 9, value: -9 },
      { space: selectedPiece.minusFourteenthSpace, index: selectedPiece.indexOfBoardPiece - 14, value: -14 },
      { space: selectedPiece.minusEighteenthSpace, index: selectedPiece.indexOfBoardPiece - 18, value: -18 }
    ];
    for (const move of moves) {
      if (move.space) {
        cells[move.index].setAttribute("onclick", `makeMove(${move.value})`);
      }
    }
}

//function handles the piece movement and updates the board accordingly
function makeMove(number) {
    const selectedPieceElement = document.getElementById(selectedPiece.pieceId);
    selectedPieceElement.remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    const targetCell = cells[selectedPiece.indexOfBoardPiece + number];
    const pieceColor = turn ? "red" : "black";
    const pieceClass = selectedPiece.king ? `${pieceColor}-piece king` : `${pieceColor}-piece`;
    const pieceElement = turn ? document.createElement("p") : document.createElement("span");
    pieceElement.className = pieceClass;
    pieceElement.id = selectedPiece.pieceId;
    targetCell.appendChild(pieceElement);
    if (turn) {
      redPiece = document.querySelectorAll("p");
    } else {
      blackPiece = document.querySelectorAll("span");
    }
}

/* * Title: (Checkers) * Author:(Branco, R) * Date: (2020) * Code version:(v1) * Availability:(https://github.com/RyanBranco/Checkers) * */
function makeMove(number) {
    //remove the selected piece from its current position
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.king) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redPiece = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redPiece = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.king) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blackPiece = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blackPiece = document.querySelectorAll("span");
        }
    }
    //if the piece made a jump move, then the piece that was jumped over is removed from the board and its data is updated
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

//update the game board and check for any captured pieces
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    //clear the original board position and move the selected piece to the new position
    checkerBoard[indexOfBoardPiece] = null;
    checkerBoard[modifiedIndex] = parseInt(selectedPiece.pieceId);
    //check if a piece has reached the opposite end of the board and promote it to a king
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    //remove any captured piece from the board and update the scores
    if (removePiece) {
      checkerBoard[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackPlay--;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redPlay--;
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}


//remove event listeners for the current player's pieces
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redPiece.length; i++) {
            redPiece[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPiece.length; i++) {
            blackPiece[i].removeEventListener("click", getPlayerPieces);
        }
    }
    //check if the game has been won by either player
    checkForWin();
}

//check if the game has been won by either player and update the game
function checkForWin() {
    if (blackPlay === 0) {
        //black has no more pieces, so red wins the game
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (redPlay === 0) {
        //red has no more pieces, so black wins the game
        divider.style.display = "none";
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurntext[i].textContent = "BLACK WINS!";
        }
    }
    //switch to the other player's turn
    changePlayer();
}

function changePlayer() {
    const redText = document.querySelectorAll('.red-text');
    const blackText = document.querySelectorAll('.black-text');
    turn = !turn; //toggle the turn variable
    if (turn) {
      //switch to black player
      for (let i = 0; i < blackText.length; i++) {
        blackText[i].style.color = "#718171";
        redTurnText[i].style.color = "black";
      }
    } else {
      //switch to red player
      for (let i = 0; i < redText.length; i++) {
        redText[i].style.color = "#718171";
        blackText[i].style.color = "black";
      }
    }
    givePiecesEventListeners(); 
}
givePiecesEventListeners();