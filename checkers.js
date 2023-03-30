/*checker board*/
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, 
    12, null, 13, null, 14, null, 15, null, 
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null, 
]

const cells = document.querySelectorAll("td")
let redsPieces = document.querySelectorAll("p")
let blacksPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".red-turn-text")
const blackTurnText = document.querySelectorAll(".black-turn-text")
const divider = document.querySelector("#divider")

let turn = true;
let redScore = 12;
let blackSCore = 12;
let playerPieces;

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhPace: false,
    minusNinthSpae: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
}

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redPiecesLength; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPiecesLength; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

function getPlayerPieces() {
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removerCellonclick();
    resetBorders();
}

function removerCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px sold white";
    }
    resetSelctedPieceProperties();
    getSelectedPiece();
}

function resetSelctedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false; 
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhPace = false;
    selectedPiece.minusNinthSpae = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
}

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.is = false;
    }
    getAvailableSpace();
}

function getAvailableSpace() {
    if (board[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPiece") !== true) {
        selectedPiece.ninthSpace = true;
    } 
    if (board[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPiece") !== true) {
        selectedPiece.minusSeventhPace = true;
    }    
    if (board[selectedPiece.indexOfBoardPiece - 9] === null &&
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPiece") !== true) {
        selectedPiece.minusNinthSpae = true;
    }
    checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces(){
    if(turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPiece") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        } else {
            is (board[selectedPiece.indexOfBoardPiece + 14] === null
            && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPiece") !== true
            && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null); {
                selectedPiece.fourteenthSpace = true;
            }
        }
    }
}

function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhPace = false;
            selectedPiece.minusNinthSpae = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece. ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
        || selectedPiece.minusSeventhPace || selectedPiece.minusNinthSpae || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
    } else {
        return;
    }
}

givePiecesEventListeners()

