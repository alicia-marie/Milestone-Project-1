//initializes a game board for checkers with a 8x8 grid
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

//values for variables that will be used to keep track of the game state.
// True represents red's turn, false represents black's turn
let turn = true; 
let redScore = 12;
let blackScore = 12;
let playerPieces;
let redsPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span")
const cells = document.querySelectorAll("td");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")

//keep track of the selected piece on the board
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

//receives a pieceId and returns its index in the board array
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

//adds a click event listener to each of the current player's pieces
function givePiecesEventListeners() {
    const pieces = turn ? redsPieces : blacksPieces;
    for (const piece of pieces) {
      piece.addEventListener("click", getPlayerPieces);
    }
}

//function is called when a player clicks on one of their pieces
function getPlayerPieces() {
    playerPieces = turn ? redsPieces : blacksPieces;
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
    selectedPiece.isKing = false;
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
    selectedPiece.indexOfBoardPiece = board.indexOf(selectedPiece.pieceId);
    isPieceKing();
}

//function checks if the selected piece is a king and gets its available spaces
function isPieceKing() {
    selectedPiece.isKing = document.getElementById(selectedPiece.pieceId).classList.contains("king");
    getAvailableSpaces();
}

//function calculates the available spaces a selected piece can move to
function getAvailableSpaces() {
     //calculate the index of potential spaces based on the selected piece's current index
    const seventhSpace = selectedPiece.indexOfBoardPiece + 7;
    const ninthSpace = selectedPiece.indexOfBoardPiece + 9;
    const minusSeventhSpace = selectedPiece.indexOfBoardPiece - 7;
    const minusNinthSpace = selectedPiece.indexOfBoardPiece - 9;

    //check if the space is empty and does not have a "noPiece" class, then mark as available
    if (board[seventhSpace] === null && !cells[seventhSpace].classList.contains("noPiece")) {
        selectedPiece.seventhSpace = true;
    }
    if (board[ninthSpace] === null && !cells[ninthSpace].classList.contains("noPiece")) {
        selectedPiece.ninthSpace = true;
    }
    if (board[minusSeventhSpace] === null && !cells[minusSeventhSpace].classList.contains("noPiece")) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[minusNinthSpace] === null && !cells[minusNinthSpace].classList.contains("noPiece")) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

//function checks for available jump spaces based on the current turn and selected piece's position
function checkAvailableJumpSpaces() {
    const isTurn = turn;
    const selectedBoardIndex = selectedPiece.indexOfBoardPiece;
    if (isTurn) {
      // Check for available jump spaces when it's the player's turn.
      const canJumpToFourteenthSpace = (
        board[selectedBoardIndex + 14] === null &&
        !cells[selectedBoardIndex + 14].classList.contains("noPiece") &&
        board[selectedBoardIndex + 7] >= 12
      );
      const canJumpToEighteenthSpace = (
        board[selectedBoardIndex + 18] === null &&
        !cells[selectedBoardIndex + 18].classList.contains("noPiece") &&
        board[selectedBoardIndex + 9] >= 12
      );
      const canJumpToMinusFourteenthSpace = (
        board[selectedBoardIndex - 14] === null &&
        !cells[selectedBoardIndex - 14].classList.contains("noPiece") &&
        board[selectedBoardIndex - 7] >= 12
      );
      const canJumpToMinusEighteenthSpace = (
        board[selectedBoardIndex - 18] === null &&
        !cells[selectedBoardIndex - 18].classList.contains("noPiece") &&
        board[selectedBoardIndex - 9] >= 12
      );
      // Update the selected piece's jump spaces status based on the above checks
      selectedPiece.fourteenthSpace = canJumpToFourteenthSpace;
      selectedPiece.eighteenthSpace = canJumpToEighteenthSpace;
      selectedPiece.minusFourteenthSpace = canJumpToMinusFourteenthSpace;
      selectedPiece.minusEighteenthSpace = canJumpToMinusEighteenthSpace;
    } else {
      // Check for available jump spaces when it's the opponent's turn.
      const canJumpToFourteenthSpace = (
        board[selectedBoardIndex + 14] === null &&
        !cells[selectedBoardIndex + 14].classList.contains("noPiece") &&
        board[selectedBoardIndex + 7] < 12 &&
        board[selectedBoardIndex + 7] !== null
      );
      const canJumpToEighteenthSpace = (
        board[selectedBoardIndex + 18] === null &&
        !cells[selectedBoardIndex + 18].classList.contains("noPiece") &&
        board[selectedBoardIndex + 9] < 12 &&
        board[selectedBoardIndex + 9] !== null
      );
      const canJumpToMinusFourteenthSpace = (
        board[selectedBoardIndex - 14] === null &&
        !cells[selectedBoardIndex - 14].classList.contains("noPieceHere") &&
        board[selectedBoardIndex - 7] < 12 &&
        board[selectedBoardIndex - 7] !== null
      );
      const canJumpToMinusEighteenthSpace = (
        board[selectedBoardIndex - 18] === null &&
        !cells[selectedBoardIndex - 18].classList.contains("noPieceHere") &&
        board[selectedBoardIndex - 9] < 12 &&
        board[selectedBoardIndex - 9] !== null
      );
      // Update the selected piece's jump spaces status based on the above checks
      selectedPiece.fourteenthSpace = canJumpToFourteenthSpace;
      selectedPiece.eighteenthSpace = canJumpToEighteenthSpace;
      selectedPiece.minusFourteenthSpace = canJumpToMinusFourteenthSpace;
      selectedPiece.minusEighteenthSpace = canJumpToMinusEighteenthSpace;
    }
    checkPieceConditions();
}

// This function checks the conditions of the selected piece and decides whether to apply borders to the spaces it can move to.
function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        // Otherwise, give borders only to the spaces that the selected piece can move to based on its current position and turn.
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
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

//unction handles the piece movement and updates the board accordingly
function makeMove(number) {
    const selectedPieceElement = document.getElementById(selectedPiece.pieceId);
    selectedPieceElement.remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
  
    const targetCell = cells[selectedPiece.indexOfBoardPiece + number];
    const pieceColor = turn ? "red" : "black";
    const pieceClass = selectedPiece.isKing ? `${pieceColor}-piece king` : `${pieceColor}-piece`;
    const pieceElement = turn ? document.createElement("p") : document.createElement("span");
    pieceElement.className = pieceClass;
    pieceElement.id = selectedPiece.pieceId;
  
    targetCell.appendChild(pieceElement);
  
    if (turn) {
      redsPieces = document.querySelectorAll("p");
    } else {
      blacksPieces = document.querySelectorAll("span");
    }
  }
function makeMove(number) {

    //remove the selected piece from its current position
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        }
    }

    //If the piece made a jump move, then the piece that was jumped over is removed from the board and its data is updated
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
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);

    //check if a piece has reached the opposite end of the board and promote it to a king
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }

    //remove any captured piece from the board and update the scores
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--;
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

//remove event listeners for the current player's pieces
function removeEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    //check if the game has been won by either player
    checkForWin();
}

//check if the game has been won by either player and update the game
function checkForWin() {
    if (blackScore === 0) {
        //black has no more pieces, so red wins the game
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (redScore === 0) {
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
    const redTurnText = document.querySelectorAll('.red-turn-text');
    const blackTurnText = document.querySelectorAll('.black-turn-text');
    
    turn = !turn; // toggle the turn variable
    
    if (turn) {
      // switch to black player
      for (let i = 0; i < blackTurnText.length; i++) {
        blackTurnText[i].style.color = "lightGrey";
        redTurnText[i].style.color = "black";
      }
    } else {
      // switch to red player
      for (let i = 0; i < redTurnText.length; i++) {
        redTurnText[i].style.color = "lightGrey";
        blackTurnText[i].style.color = "black";
      }
    }
    givePiecesEventListeners(); 
}
givePiecesEventListeners();