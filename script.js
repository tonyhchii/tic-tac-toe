function GameBoard() {
    const rows = 3;
    const columns = 3;
    let winRow = [0,0,0];
    let winCol = [0,0,0];
    let winDiag = 0;
    let winAntiDiag = 0;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j =0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const selectCell = (row, column, player) => {
        //select cell with player, unless cell already filled in
        let currCell = board[row][column];
        if (currCell.getValue() == 0) {
            currCell.setValue(player);
        } else {
            return;
        }
    };

    const checkWin = (row, col, player) => {
        if (player == 1) {
            winRow[row] += 1;
            winCol[col] += 1;
            if (row + col == 2) {
                winAntiDiag += 1;
            }
            if (row == col) {
                winDiag += 1
            }
        } else {
            winRow[row] -= 1;
            winCol[col] -= 1;
            if (row + col == 2) {
                winAntiDiag -= 1;
            }
            if (row == col) {
                winDiag -= 1
            }
        }

        if (Math.abs(winRow[row]) == 3 || Math.abs(winCol[col]) == 3 || Math.abs(winDiag) == 3 || Math.abs(winAntiDiag) == 3) {
            console.log(player + ' wins');
            return player;
        }
        console.log(winRow[row], winCol[col], winAntiDiag, winDiag);
    }

    const displayBoard = () => {
        //display board
        const boardDisplay = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardDisplay);
    };

    return {
        getBoard, selectCell, displayBoard, checkWin
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
        board.checkWin(row, column, getActivePlayer().sign);
        switchTurns();
    };

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();