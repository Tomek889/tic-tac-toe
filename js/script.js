const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    

    const getBoard = () => board;
    const resetBoard = () => board.fill('');
    const placeMarker = (marker, position) => {
        if (board[position] === '') {
            board[position] = marker;
            return true;
        }
        return false;
    };
    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                board[a] !== '' &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {
                return board[a];
            }
        }
        return null;
    };
    const isDraw = () => {
        return board.every(cell => cell !== '') && !checkWinner();
    };
    

    return {
        getBoard,
        resetBoard,
        placeMarker,
        checkWinner,
        isDraw,
    };
})();

const Player = (name, marker) => {
    return { name, marker }
};

Player.prototype.markSquare = function(position) {
    Gameboard.placeMarker(this.marker, position);
};