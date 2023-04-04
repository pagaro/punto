// Définition d'une fonction pour vérifier si un joueur a gagné
export function checkWinner(board) {
    // Liste des directions dans lesquelles il faut chercher des jetons connectés
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

    // Fonction pour vérifier si les jetons dans une direction donnée sont connectés
    const checkDirection = (x, y, dx, dy) => {
        const color = board[y][x].color; // Couleur du jeton à la position (x, y)
        let count = 1; // Nombre de jetons connectés

        // Boucle pour vérifier les jetons dans la direction donnée
        for (let i = 1; i < 4; i++) {
            const newX = x + dx * i; // Nouvelle position en x
            const newY = y + dy * i; // Nouvelle position en y

            // Vérification que la position est valide et que le jeton à cette position est de la même couleur
            if (
                newX < 0 ||
                newX >= board[0].length ||
                newY < 0 ||
                newY >= board.length ||
                board[newY][newX] === null ||
                board[newY][newX].color !== color
            ) {
                break; // Si les conditions ne sont pas remplies, on sort de la boucle
            }

            count++; // Sinon, on incrémente le nombre de jetons connectés
        }

        return count >= 4; // Si le nombre de jetons connectés est de 4 ou plus, le joueur a gagné
    };

    // Boucle pour parcourir tous les jetons du plateau
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] !== null) { // Si le jeton existe à la position (x, y)
                for (const [dx, dy] of directions) { // Boucle pour parcourir toutes les directions
                    if (checkDirection(x, y, dx, dy)) { // Si les jetons dans la direction donnée sont connectés
                        return true; // Le joueur a gagné
                    }
                }
            }
        }
    }

    return false; // Aucun joueur n'a gagné
}
