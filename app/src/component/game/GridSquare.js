// Ce fichier contient le composant GridSquare qui est utilisé pour afficher une case de la grille de jeu
// Il importe les fichiers nécessaires pour le stylage et le composant Card
// Il utilise également le contexte CardContext pour récupérer la carte qui est en train d'être draguée
// La fonction validateDropCard est importée depuis le fichier utilitaire valideSquare.js pour vérifier si une carte peut être déposée sur cette case de la grille

import React, {useContext} from 'react';
import './GridSquare.css'
import Card from "./Card";
import CardContext from '../../context/CardContext';
import {validateDropCard} from "../../utils/valideSquare";

const GridSquare = ({x, y, handleCardDrop, board}) => {
// Utilisation du contexte CardContext pour récupérer la carte qui est en train d'être draguée
    const {draggedCard} = useContext(CardContext);
// Fonction pour gérer le survol d'une case de la grille avec la carte draguée
    const handleDragOver = (event) => {
        event.preventDefault()
        // Vérification si la carte peut être déposée sur cette case de la grille
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
        // Mise à jour de la couleur de fond de la case en fonction de la validité du drop
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";
    };

// Fonction pour gérer le dépôt d'une carte sur une case de la grille avec des coordonnées spécifiées
    const handleDropWithCoordinates = (event) => {
        // Vérification si la carte peut être déposée sur cette case de la grille
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
        if (isValidDrop) {
            // Appel de la fonction handleCardDrop pour mettre à jour le plateau de jeu avec la carte déposée
            handleCardDrop(event, x, y);
        } else {
            // Affichage d'une alerte si la carte ne peut pas être déposée sur cette case de la grille
            alert("Vous ne pouvez pas placer cette carte ici.");
        }
        // Réinitialisation de la couleur de fond de la case après le drop
        event.currentTarget.style.backgroundColor = ""
    };

// Fonction pour gérer l'entrée d'une carte dans une case de la grille
    const handleDragEnter = (event) => {
        event.preventDefault();
        // Vérification si la carte peut être déposée sur cette case de la grille
        const isValidDrop = validateDropCard(x, y, board, draggedCard);
        // Mise à jour de la couleur de fond de la case en fonction de la validité du drop
        event.currentTarget.style.backgroundColor = isValidDrop ? "green" : "red";
        //todo
        // if (event.currentTarget.firstChild) {
        //     event.currentTarget.firstChild.style.display = "none"
        // }
    };

// Fonction pour gérer la sortie d'une carte d'une case de la grille
    const handleDragLeave = (event) => {
        event.preventDefault()
        // Réinitialisation de la couleur de fond de la case
        event.currentTarget.style.backgroundColor = ""
        //todo
        // if (event.currentTarget.firstChild) {
        //     event.currentTarget.firstChild.style.display = ""
        // }
    };

// Affichage de la case de la grille avec la carte associée si elle existe
    return (
        <div
            className="grid-square"
            onDragOver={handleDragOver}
            onDrop={handleDropWithCoordinates}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {board[y][x] && <Card card={board[y][x]}/>}
        </div>
    );
};

export default GridSquare;
