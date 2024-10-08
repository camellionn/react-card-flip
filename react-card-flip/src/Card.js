import React from 'react';

export default function Card({ card, onClick }) {
    return (
        <div
        className={`w-24 h-32 border rounded shadow-md flex items-center justify-center cursor-pointer transition transform ${ 
            card.flipped || card.matched ? 'bg-pink-400' : 'bg-blue-600'
        }`}
        onClick = {onClick}>
            <span className='text-xl font-semibold'>
                {card.flipped || card.matched ? card.value: '?'}
            </span>
        </div>
    );
}