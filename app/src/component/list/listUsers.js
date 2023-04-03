import React from 'react';
import "./list.css"

function List({items}) {
    let listItems = []

    items.forEach((item, index) => {
        listItems.push(
            <li key={index}>
                {item.name}
            </li>
        )
    });


    return (
        <ul className="ul-users">
            {listItems}
        </ul>
    );
}

export default List;
