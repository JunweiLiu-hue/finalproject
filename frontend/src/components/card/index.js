import React from 'react';
import styles from './card.module.css';

const Card = ({ card }) => {
    return (
        <div className={styles.card}>
            <img
                src={`/static/img/${card.name.trim().replace(/\s+/g, '-')}.jpg`}
                alt={card.name}
                className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{card.name}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
            <p className={styles.cardRarity}>Rarity: {card.rarity}</p>
        </div>
    );
};

export default Card;
