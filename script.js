function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j =0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const selectCell = (row, column, player) => {
        //select cell with player, unless cell already filled in
    }

    const displayBoard = () => {
        //display board
    }

    return {
        getBoard, selectCell, displayBoard
    };
}

function Cell() {
    let value = 0;
    const setValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        setValue,
        getValue
    };
}

function GameController() {
    const board = GameBoard();

    const players = [
        {
            name: playerOne,
            sign: 1
        },
        {
            name: playerTwo,
            sign: 2
        }
    ];

    let activePlayer = players[0];

    const switchTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        board.selectCell(row,column,getActivePlayer().sign);
    }
}