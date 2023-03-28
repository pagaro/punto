// src/utils/gameLogic.js

import cardImages from "./cardImages";

const loadCardImages = async () => {
    const images = {};
    for (const color in cardImages) {
        images[color] = await Promise.all(cardImages[color]);
        images[color] = images[color].map((img) => img.default);
    }
    return images;
};
export const distributeCards = async (numPlayers) => {
    // Chargez toutes les images de cartes
    const images = await loadCardImages();

    // Créez un paquet de cartes
    let deck = createDeck(images);

    // Mélangez le paquet de cartes
    shuffle(deck);

    // Distribuez les cartes aux joueurs en fonction du nombre de joueurs
    const hands = distributeCardsToPlayers(deck, numPlayers);

    return hands;
};

const createDeck = (images) => {
    const deck = [];
    for (const color in images) {
        for (let i = 0; i < 9; i++) {
            deck.push({ value: i + 1, color: color[0].toUpperCase(), imagePath: images[color][i] });
        }
    }
    return deck;
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const distributeCardsToPlayers = (deck, numPlayers) => {
    const hands = Array(numPlayers).fill(null).map(() => []);

    if (numPlayers === 2) {
        hands[0] = deck.filter((card) => card.color === "R" || card.color === "B");
        hands[1] = deck.filter((card) => card.color === "V" || card.color === "O");
    } else if (numPlayers === 3) {
        const neutralCards = deck.filter((card) => card.color === "O");
        shuffle(neutralCards);

        hands[0] = deck.filter((card) => card.color === "R").concat(neutralCards.slice(0, 6));
        hands[1] = deck.filter((card) => card.color === "B").concat(neutralCards.slice(6, 12));
        hands[2] = deck.filter((card) => card.color === "V").concat(neutralCards.slice(12, 18));
    } else if (numPlayers === 4) {
        hands[0] = deck.filter((card) => card.color === "R");
        hands[1] = deck.filter((card) => card.color === "B");
        hands[2] = deck.filter((card) => card.color === "V");
        hands[3] = deck.filter((card) => card.color === "O");
    }

    return hands;
};

// Vérifie si une série de 4 cartes (ou 5 pour un jeu à 2 joueurs) est alignée
const checkForWin = (cards, numCardsToWin = 4) => {
    const directions = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
    ];

    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
            const currentCard = cards[y * 6 + x];
            if (!currentCard) continue;

            for (const direction of directions) {
                let matchCount = 1;
                let newX = x;
                let newY = y;

                while (true) {
                    newX += direction.x;
                    newY += direction.y;

                    if (newX < 0 || newX >= 6 || newY < 0 || newY >= 6) break;

                    const newCard = cards[newY * 6 + newX];
                    if (newCard === currentCard) {
                        matchCount++;
                    } else {
                        break;
                    }
                }

                if (matchCount === numCardsToWin) {
                    return true;
                }
            }
        }
    }

    return false;
};

// Retourne un nouvel état de cartes après avoir placé une carte
const placeCard = (cards, index, card) => {
    const newCards = cards.slice();
    newCards[index] = card;
    return newCards;
};

export { checkForWin, placeCard };
