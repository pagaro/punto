// Import de la liste d'images pour chaque couleur de carte
import cardImages from './cardImages';

// Fonction pour générer un deck de cartes d'une couleur donnée
const generateDeck = (color) => {
    const deck = [];
    const colorImages = cardImages[color]; // Liste d'images pour la couleur donnée

    // Boucle pour créer les cartes de 1 à 9
    for (let i = 1; i <= 9; i++) {
        const card = {
            value: i, // Valeur de la carte (de 1 à 9)
            id: i +"."+ color +"."+ Math.random().toString( 16 ).slice( 2, 10 ), // Identifiant unique de la carte
            color: color, // Couleur de la carte
            image: colorImages[i - 1], // Image correspondant à la valeur de la carte
        };
        deck.push(card); // Ajout de la carte au deck
    }

    return deck;
};

// Fonction pour mélanger un tableau d'éléments
const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // Tant qu'il reste des éléments à mélanger...
    while (currentIndex !== 0) {
        // Choisissez un élément restant...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Et échangez-le avec l'élément actuel
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Fonction pour générer une liste de joueurs avec des cartes en fonction du nombre de joueurs
export const generatePlayers  = (numPlayers) => {
    const blueDeck = generateDeck('blue'); // Deck de cartes bleues
    const greenDeck = generateDeck('green'); // Deck de cartes vertes
    const orangeDeck = generateDeck('orange'); // Deck de cartes oranges
    const redDeck = generateDeck('red'); // Deck de cartes rouges

    const players = []; // Liste des joueurs

    // Logique pour distribuer les cartes en fonction du nombre de joueurs
    if (numPlayers === 2) {
        players.push({ id: 1, cards: [...blueDeck, ...greenDeck], color: 'blue-green' });
        players.push({ id: 2, cards: [...orangeDeck, ...redDeck], color: 'orange-red' });
    } else if (numPlayers === 3) {
        const neutralCards = shuffle(orangeDeck).splice(0, 9); // Cartes neutres (9 cartes aléatoires dans le deck orange)

        players.push({ id: 1, cards: [...blueDeck, ...neutralCards.slice(0, 3)], color: 'blue-neutral' });
        players.push({ id: 2, cards: [...greenDeck, ...neutralCards.slice(3, 6)], color: 'green-neutral' });
        players.push({ id: 3, cards: [...redDeck, ...neutralCards.slice(6, 9)], color: 'red-neutral' });
    } else if (numPlayers === 4) {
        players.push({ id: 1, cards: blueDeck, color: 'blue' });
        players.push({ id: 2, cards: greenDeck, color: 'green' });
        players.push({ id: 3, cards: orangeDeck, color: 'orange' });
        players.push({ id: 4, cards: redDeck, color: 'red' });
    }

    return players;
};