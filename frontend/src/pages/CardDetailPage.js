import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';

function CardDetailPage() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${API_BASE}/cards/getCardDetails/${cardId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch card details');
                const data = await response.json();
                setCard(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCardDetails();
    }, [cardId]);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!card) {
        return <div className="loading">Loading...</div>;
    }

    // ✅ 这里动态判断：如果是 AI 卡（Custom），直接用 imageUrl，否则自己拼名字
    const getImagePath = (card) => {
        if (card.rarityConfig.rarity === 'Custom') {
            return card.imageUrl;
        } else {
            const filename = card.name.trim().replace(/\s+/g, '-') + '.jpg';
            return `/static/img/${filename}`;
        }
    };

    return (
        <div style={styles.pageContainer}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
            <div style={styles.cardContainer}>
                <h2 style={styles.cardTitle}>{card.name}</h2>

                <p style={{ ...styles.rarity, ...rarityColors[card.rarityConfig.rarity] }}>
                    Rarity: {card.rarityConfig.rarity}
                </p>

                <div style={styles.imageWrapper}>
                    <img src={getImagePath(card)} alt={card.name} style={styles.imageLarge} />
                </div>

                <p style={styles.description}>{card.description}</p>

                <div style={styles.biography}>
                    {card.biography.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CardDetailPage;

const styles = {
    pageContainer: {
        backgroundColor: '#faf3dc',
        minHeight: '100vh',
        maxHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
    },
    backButton: {
        backgroundColor: '#5c3b11',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginBottom: '20px',
    },
    cardContainer: {
        backgroundColor: '#f9f3e6',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '800px',
        textAlign: 'center',
        maxHeight: '80vh',
        overflowY: 'auto',
    },
    imageWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: '15px',
    },
    imageLarge: {
        width: '100%',
        height: 'auto',
        maxHeight: '400px',
        objectFit: 'contain',
        borderRadius: '10px',
    },
    cardTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#4a3314',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1rem',
        color: '#4a3314',
        marginBottom: '15px',
        textAlign: 'justify',
    },
    biography: {
        fontSize: '1rem',
        color: '#3d2709',
        lineHeight: '1.6',
        maxWidth: '800px',
        textAlign: 'justify',
        overflowY: 'auto',
    },
    rarity: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
};

const rarityColors = {
    Common: { color: 'gray' },
    Rare: { color: 'blue' },
    Historical: { color: 'green' },
    Legendary: { color: 'gold', fontWeight: 'bold' },
    Custom: { color: 'purple' }, // ✅ 给 Custom 一个紫色
};
