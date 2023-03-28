// src/components/Board.js
import React from "react";
import styled from "styled-components";
import Card from "./Card";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1px;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
`;

const Board = ({ cards, handleClick }) => {
    return (
        <BoardContainer>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    color={card}
                    onClick={() => handleClick(index)}
                />
            ))}
        </BoardContainer>
    );
};

export default Board;
