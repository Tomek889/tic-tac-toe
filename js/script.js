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
        if (board[position] === '' && !checkWinner()) {
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
    const markSquare = (position) => {
        return Gameboard.placeMarker(marker, position);
    };
    const setName = (newName) => { name = newName; };
    const getName = () => name;

    return { marker, markSquare, setName, getName };
};

const GameController = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    const playRound = (position) => {
        const successfulMove = currentPlayer.markSquare(position);
        if (!successfulMove) {
            return { status: 'invalid' };
        }

        if (Gameboard.checkWinner()) {
            return { status: 'win', winner: currentPlayer };
        }

        if (Gameboard.isDraw())  {
            return { status: 'draw' };
        }

        switchPlayer();
        return { status: 'continue', nextPlayer: currentPlayer};
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
    };

    const getCurrentPlayer = () => currentPlayer.getName();

    const setPlayer1Name = (newName) => {
        player1.setName(newName);
    };
    const setPlayer2Name = (newName) => {
        player2.setName(newName);
    };

    return {
        playRound,
        resetGame,
        getCurrentPlayer,
        setPlayer1Name,
        setPlayer2Name,
    };
})();

const DisplayController = (() => {
    const squares = document.querySelectorAll('.square');
    const turn = document.querySelector('.turn');
    const restartButton = document.querySelector('.restart');
    const changeNamesButton = document.querySelector('.set-names');
    const player1NameInput = document.querySelector('#player1-name');
    const player2NameInput = document.querySelector('#player2-name');

    const displayBoard = () => {
        const board = Gameboard.getBoard();
        board.forEach((marker, index) => {
            squares[index].textContent = marker;
        });
        turn.textContent = `${GameController.getCurrentPlayer()}'s turn`
    };

    const addClickEvents = () => {
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                const result = GameController.playRound(index);
                displayBoard();
                if (result.status === 'win') {
                    alert(`${result.winner.getName()} wins!`);
                } else if (result.status === 'draw') {
                    alert('Draw!');
                }
            });
        });
    };

    restartButton.addEventListener('click', () => {
        GameController.resetGame();
        displayBoard();
    });

    changeNamesButton.addEventListener('click', () => {
        console.log('klik')
        const name1 = player1NameInput.value.trim();
        const name2 = player2NameInput.value.trim();
        if (name1) {
            GameController.setPlayer1Name(name1);
        }    
        if (name2) {
            GameController.setPlayer2Name(name2);
        }
        displayBoard();
    });

    addClickEvents();
    displayBoard();
})();