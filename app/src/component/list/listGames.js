import React from 'react';
import "./list.css"
import {useNavigate} from "react-router-dom";

function ListGames({items}) {

    // Utilise "useNavigate" pour déclarer une fonction "navigate" qui permet de changer de page en utilisant l'API "react-router-dom"
    const navigate = useNavigate();

    // Déclare une fonction "handleClick" qui est appelée lorsque l'utilisateur clique sur un élément de la liste
    function handleClick(item) {
        console.log(item + " clicked!");

        // Utilise la fonction "navigate" pour changer de page en utilisant l'ID de l'élément cliqué
        navigate('/game/' + item._id);
    }

    // Parcourt le tableau "items" et crée une liste d'éléments <li> à partir des noms des éléments
    let listItems = []
    items.forEach((item, index) => {
        listItems.push(
            <li key={index} onClick={() => handleClick(item)}>
                {item.name}
            </li>
        )
    });

    // Renvoie une liste HTML avec les éléments créés précédemment
    return (
        <ul className="ul-games">
            {listItems}
        </ul>
    );
}

// Exporte l'élément "ListGames" pour l'utiliser dans d'autres composants
export default ListGames;
