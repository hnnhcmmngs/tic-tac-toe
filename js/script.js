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
    let player1;
    let player2;
    let currentPlayer;
    let wins = [0, 0];

    const dialog = document.querySelector("#names");
    const nameform = document.querySelector("#nameform");

    document.addEventListener('DOMContentLoaded', () => {
        dialog.showModal();
        nameform.addEventListener("submit", () => {
            player1 = Player(document.querySelector("#player1").value, "X");
            player2 = Player(document.querySelector("#player2").value, "O");
            currentPlayer = player1;
            displayManager.updateMessage(gameOver, currentPlayer.getName());
            displayManager.updatePlayerName(1, player1.getName());
            displayManager.updatePlayerName(2, player2.getName());
        });
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
            let status = checkPlayerWin();
            if (status[0]) {
                console.log(`Game over! ${currentPlayer.getName()} wins!`);
                gameOver = true;
                if (currentPlayer == player1) {
                    wins[0] += 1;
                    displayManager.updateWins(1, wins[0]);
                } else {
                    wins[1] += 1;
                    displayManager.updateWins(2, wins[1]);
                }
                displayManager.updateMessage(gameOver, currentPlayer.getName());
                displayManager.colorCells(status[1], "red");
                displayManager.toggleButton();
            } else if (checkTie()) {
                console.log("Game over! Tie! Nobody wins!");
                gameOver = true;
                displayManager.updateMessage(gameOver);
                displayManager.toggleButton();
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
                return [true, [3 * i, 3 * i + 1, 3 * i + 2]];
            }
        }
        // check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] == currMarker && board[1][j] == currMarker && board[2][j] == currMarker) {
                return [true, [j, 3 + j, 6 + j]];
            }
        }
        // check diagonals
        if (board[0][0] == currMarker && board[1][1] == currMarker && board[2][2] == currMarker) {
            return [true, [0, 4, 8]];
        }
        if (board[0][2] == currMarker && board[1][1] == currMarker && board[2][0] == currMarker) {
            return [true, [2, 4, 6]];
        }
        return [false, []];
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
                displayManager.updateCell(3 * i + j, "");
                displayManager.colorCells([3 * i + j], "black");
            }
        }
        gameOver = false;
        currentPlayer = player1;
        displayManager.updateMessage(gameOver, currentPlayer.getName());
    }

    let getBoard = () => board;

    return {getCurrentPlayer, toggleCurrentPlayer, markBoard, getBoard, resetGame};
})();

const displayManager = (function() {
    const board = document.querySelector("#board");
    const message = document.querySelector("#message");
    const player1 = document.querySelector("#firstplayer");
    const player2 = document.querySelector("#secondplayer");
    const resetButton = document.querySelector("#reset");

    resetButton.addEventListener("click", () => {
        gameBoard.resetGame();
        toggleButton();
    });

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
    let updatePlayerName = (n, playerName) => {
        if (n == 1) {
            player1.children[1].textContent = playerName;
        } else {
            player2.children[1].textContent = playerName;
        }
    }
    let updateWins = (n, wins) => {
        if (n == 1) {
            player1.children[3].textContent = wins;
        } else {
            player2.children[3].textContent = wins;
        }
    }
    let toggleButton = () => {
        resetButton.disabled = resetButton.disabled ? false : true;
    }
    let colorCells = (cells, color) => {
        for (let cell of cells) {
            board.children[cell].style.color = color;
        }
    }
    return {updateCell, updateMessage, updatePlayerName, updateWins, toggleButton, colorCells};
})();