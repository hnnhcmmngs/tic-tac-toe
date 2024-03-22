const gameBoard = (function() {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    function Player(name, marker) {
        let getName = () => name;
        let getMarker = () => marker;
        return {getName, getMarker};
    }
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");

    let currentPlayer = player1;

    let getCurrentPlayer = () => currentPlayer;

    let toggleCurrentPlayer = () => currentPlayer = currentPlayer == player1 ? player2 : player1;

    let markBoard = (i, j) => {
        if (board[i][j] == "") {
            board[i][j] = currentPlayer.getMarker();
            toggleCurrentPlayer();
        }
        console.log(board);
    };

    return {getCurrentPlayer, toggleCurrentPlayer, markBoard}
})();