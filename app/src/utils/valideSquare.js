export const validateDropCard = (x, y, board, draggedCard) => {

    return (!board[y][x] || (board[y][x] && draggedCard.value > board[y][x].value)) &&
        validateDropSquare(x, y, board)
};

export const validateDropSquare = (x, y, board) => {
    const isGridEmpty = board.every(row => row.every(cell => !cell));

    const isMiddleSquare = x === Math.floor(board.length / 2) && y === Math.floor(board[0].length / 2);

    const isAdjacentSquare = (
        (x > 0 && board[y][x - 1]) ||
        (y > 0 && board[y - 1][x]) ||
        (x < board.length - 1 && board[y][x + 1]) ||
        (y < board[0].length - 1 && board[y + 1][x]) ||
        (x > 0 && y > 0 && board[y - 1][x - 1]) ||
        (x < board.length - 1 && y < board[0].length - 1 && board[y + 1][x + 1]) ||
        (x < board.length - 1 && y > 0 && board[y - 1][x + 1]) ||
        (x > 0 && y < board[0].length - 1 && board[y + 1][x - 1])
    );

    const isCardPlacementValid = (x, y, board) => {
        let minX = board[0].length, maxX = 0, minY = board.length, maxY = 0;

        for (let y1 = 0; y1 < board.length; y1++) {
            for (let x1 = 0; x1 < board[y].length; x1++) {
                if (board[y1][x1] || (y1 === y && x1 === x)) {
                    minX = Math.min(minX, x1);
                    maxX = Math.max(maxX, x1);
                    minY = Math.min(minY, y1);
                    maxY = Math.max(maxY, y1);
                }
            }
        }

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;

        return width <= 6 && height <= 6;
    };

    return ((isGridEmpty && isMiddleSquare) || (!isGridEmpty && isAdjacentSquare)) && isCardPlacementValid(x,y,board)
}