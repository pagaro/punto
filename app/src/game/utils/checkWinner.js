export function checkWinner(board) {
    const directions = [
        [-1, 0], // gauche
        [1, 0], // droite
        [0, -1], // haut
        [0, 1], // bas
        [-1, -1], // diagonale haut-gauche
        [1, 1], // diagonale bas-droit
        [-1, 1], // diagonale haut-droit
        [1, -1], // diagonale bas-gauche
    ];

    const checkDirection = (x, y, dx, dy) => {
        const color = board[y][x].color;
        let count = 1;

        for (let i = 1; i < 4; i++) {
            const newX = x + dx * i;
            const newY = y + dy * i;

            if (
                newX < 0 ||
                newX >= board[0].length ||
                newY < 0 ||
                newY >= board.length ||
                board[newY][newX] === null ||
                board[newY][newX].color !== color
            ) {
                break;
            }

            count++;
        }

        return count >= 4;
    };

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] !== null) {
                for (const [dx, dy] of directions) {
                    if (checkDirection(x, y, dx, dy)) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}
