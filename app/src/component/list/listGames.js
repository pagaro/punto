import React from 'react';
import "./list.css"
import {useNavigate} from "react-router-dom";

function ListGames({items}) {
    const navigate = useNavigate();

    function handleClick(item) {
        console.log(item + " clicked!");
        navigate('/game/' + item._id);

    }

    let listItems = []
    items.forEach((item, index) => {
        listItems.push(
            <li key={index} onClick={() => handleClick(item)}>
                {item.name}
            </li>
        )
    });

    return (
        <ul className="ul-games">
            {listItems}
        </ul>
    );
}

export default ListGames;
