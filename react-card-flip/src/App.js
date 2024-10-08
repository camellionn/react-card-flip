import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import './App.css';

const initialCards = [
  { id: 1, matched: false, value: 'A' },
  { id: 2, matched: false, value: 'A' },
  { id: 3, matched: false, value: 'B' },
  { id: 4, matched: false, value: 'B' },
  { id: 5, matched: false, value: 'C' },
  { id: 6, matched: false, value: 'C' },
  { id: 7, matched: false, value: 'D' },
  { id: 8, matched: false, value: 'D' },
  { id: 9, matched: false, value: 'E' },
  { id: 10, matched: false, value: 'E' },
  { id: 11, matched: false, value: 'F' },
  { id: 12, matched: false, value: 'F' }
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    initializeGame() }, []);

    const initializeGame = () => {
      const shuffledCards = shuffleArray([...initialCards]);
      setCards(shuffledCards);
      setScore(0);
      setHighScore(prevHighScore => (score > prevHighScore ? score : prevHighScore));
      resetBoard();
    };

  // Fisher-Yates Shuffle Algorithm for better randomness
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const flipCard = (card) => {
    if (lockBoard || card.flipped || card.matched) return;
    if (card === firstCard) return;

    const updateCards = cards.map((c) => 
    c.id === card.id ? { ...c, flipped: true } : c);
    setCards(updateCards);

    if(!firstCard) {
      setFirstCard(card);
      return;
    }

    setSecondCard(card);
    setLockBoard(true);

  if(firstCard.value === card.value) {
    const matchedCards = updateCards.map((c) => 
    c.value === card.value ? { ...c, matched: true} : c);
    setCards(matchedCards);
    setScore(prevScore => {
      const newScore = prevScore + 10;
      if(newScore > highScore) setHighScore(newScore);
      return newScore;
    });
    resetBoard();
    } else {
      //Not a match, flip back after delay
      setTimeout(() => {
        const revertCards = updateCards.map((c) =>
        c.id === firstCard.id || c.id === card.id 
        ? { ...c, flipped: false }
        : c
    );
    setCards(revertCards);
        resetBoard();
      }, 1000);
    }
  };

  const resetBoard = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="min-h-screen text-center  bg-blue-200 flex flex-col items-center justify-center text-base text-white ">
     <div className="scoreboard flex justify-center space-x-10 my-5">
      <div className="text-1xl font-bold text-indigo-300">Score {score}</div>
      <div className="text-1xl font-bold text-amber-100">High Score {highScore}</div>
      <button className="w-32 px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600 transition"onClick={resetGame} >Reset Game</button>
     </div>
     <div className="board grid grid-cols-3 gap-4 mx-auto max-w-md justify-center">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={() => flipCard(card)}/>
      ))}
     </div>
    </div>
  );
}
