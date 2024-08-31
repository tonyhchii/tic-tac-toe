function GameBoard() {
    const rows = 3;
    const columns = 3;
    let winRow = [0,0,0];
    let winCol = [0,0,0];
    let winDiag = 0;
    let rounds = 0;
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
            return checkWin(row, column, player);
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
        rounds += 1;

        if (Math.abs(winRow[row]) == 3 || Math.abs(winCol[col]) == 3 || Math.abs(winDiag) == 3 || Math.abs(winAntiDiag) == 3) {
            console.log(player + ' wins');
            return player;
        }
        console.log(winRow[row], winCol[col], winAntiDiag, winDiag);
        return rounds > 8 ? -1 : 0;
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

function GameController(
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
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
        const onGoing = board.selectCell(row,column,getActivePlayer().sign);
        if (onGoing == 0) {
            switchTurns();
        } else if (onGoing == 1 || onGoing == 2) {
            console.log(getActivePlayer().name + " Wins!")
        } else if (onGoing == -1) {
            console.log("Game is Tie");
        } else {
            console.log("Cell is already marked!");
        }
    };

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = activePlayer.name + `'s turn`;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add('cell');
                cellButton.dataset.column = j;
                cellButton.dataset.row = i;
                cellButton.textContent = board[i][j].getValue();
                boardDiv.appendChild(cellButton);
            }
        }
            
    }
    function clickHandlerBoard(event) {
        const selRow = event.target.dataset.row;
        const selCol = event.target.dataset.column;
        game.playRound(selRow, selCol);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
}

ScreenController();

