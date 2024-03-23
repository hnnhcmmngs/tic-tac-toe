const gameBoard = (function() {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let gameOver = false;

    function Player(name, marker) {
        let getName = () => name;
        let getMarker = () => marker;
        return {getName, getMarker};
    }
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");

    let currentPlayer = player1;

    document.addEventListener('DOMContentLoaded', () => {
        displayManager.updateMessage(gameOver, currentPlayer.getName());
    });

    let getCurrentPlayer = () => currentPlayer;

    let toggleCurrentPlayer = () => currentPlayer = currentPlayer == player1 ? player2 : player1;

    let markBoard = (n) => {
        if (gameOver) {
            return;
        }
        let i = Math.floor(n / 3);
        let j = n % 3;
        if (board[i][j] == "") {
            board[i][j] = currentPlayer.getMarker();
            displayManager.updateCell(n, currentPlayer.getMarker());
            if (checkPlayerWin()) {
                console.log(`Game over! ${currentPlayer.getName()} wins!`);
                gameOver = true;
                displayManager.updateMessage(gameOver, currentPlayer.getName());
            } else if (checkTie()) {
                console.log("Game over! Tie! Nobody wins!");
                gameOver = true;
                displayManager.updateMessage(gameOver);
            } else {
                toggleCurrentPlayer();
                displayManager.updateMessage(gameOver, currentPlayer.getName());
            }
        }
        console.log(board);
    };

    let checkPlayerWin = () => {
        let currMarker = currentPlayer.getMarker();
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == currMarker && board[i][1] == currMarker && board[i][2] == currMarker) {
                return true;
            }
        }
        // check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] == currMarker && board[1][j] == currMarker && board[2][j] == currMarker) {
                return true;
            }
        }
        // check diagonals
        if (board[0][0] == currMarker && board[1][1] == currMarker && board[2][2] == currMarker) {
            return true;
        }
        if (board[0][2] == currMarker && board[1][1] == currMarker && board[2][0] == currMarker) {
            return true;
        }
        return false;
    };

    let checkTie = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    let resetGame = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = ""
            }
        }
        gameOver = false;
        currentPlayer = player1;
    }

    let getBoard = () => board;

    return {getCurrentPlayer, toggleCurrentPlayer, markBoard, getBoard, resetGame};
})();

const displayManager = (function() {
    const board = document.querySelector("#board");
    const message = document.querySelector("#message");
    for (let i = 0; i < board.children.length; i++) {
        board.children[i].addEventListener("click", () => {
            gameBoard.markBoard(i);
        });
    }
    let updateCell = (n, marker) => {
        board.children[n].textContent = marker;
    }
    let updateMessage = (over, player = "") => {
        if (over) {
            if (player) {
                message.textContent = `Game over! ${player} wins!`;
            } else {
                message.textContent = `Game over! Tie! Nobody wins!`;
            } 
        } else {
            message.textContent = `${player}'s turn!`;
        }
    }
    return {updateCell, updateMessage};
})();