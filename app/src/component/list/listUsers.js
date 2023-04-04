import React from 'react';
import "./list.css"

function List({items}) {
    let listItems = []

    // Parcourt le tableau "items" et crée une liste d'éléments <li> à partir des noms des éléments
    items.forEach((item, index) => {
        listItems.push(
            <li key={index}>
                {item.name}
            </li>
        )
    });

    // Rendu de l'élément "List" qui retourne une liste HTML avec les éléments créés précédemment
    return (
        <ul className="ul-users">
            {listItems}
        </ul>
    );
}

// Exporte l'élément "List" pour l'utiliser dans d'autres composants
export default List;
