// src/utils/gameLogic.js
import cardImages from './cardImages';

const generateDeck = (color) => {
    const deck = [];
    const colorImages = cardImages[color];

    for (let i = 1; i <= 9; i++) {
        const card = {
            value: i,
            id: i +"."+ color +"."+ Math.random().toString( 16 ).slice( 2, 10 ),
            color: color,
            image: colorImages[i - 1],
        };
        deck.push(card);
    }

    return deck;
};

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


export const generatePlayers  = (numPlayers) => {
    const blueDeck = generateDeck('blue');
    const greenDeck = generateDeck('green');
    const orangeDeck = generateDeck('orange');
    const redDeck = generateDeck('red');

    const players = [];

    // Logique pour distribuer les cartes en fonction du nombre de joueurs
    if (numPlayers === 2) {
        players.push({ id: 1, cards: [...blueDeck, ...greenDeck], color: 'blue-green' });
        players.push({ id: 2, cards: [...orangeDeck, ...redDeck], color: 'orange-red' });
    } else if (numPlayers === 3) {
        const neutralCards = shuffle(orangeDeck).splice(0, 9);

        players.push({ id: 1, cards: [...blueDeck, ...neutralCards.slice(0, 3)], color: 'blue-neutral' });
        players.push({ id: 2, cards: [...greenDeck, ...neutralCards.slice(3, 6)], color: 'green-neutral' });
        players.push({ id: 3, cards: [...redDeck, ...neutralCards.slice(6, 9)], color: 'red-neutral' });
    } else if (numPlayers === 4) {
        players.push({ id: 1, cards: blueDeck, color: 'blue' });
        players.push({ id: 2, cards: greenDeck, color: 'green' });
        players.push({ id: 3, cards: orangeDeck, color: 'orange' });
        players.push({ id: 4, cards: redDeck, color: 'red' });
    }
    //todo
    // Mélangez les cartes de chaque joueur
    // players.forEach((player) => {
    //     player.cards = shuffle(player.cards);
    // });

    return players;
};
