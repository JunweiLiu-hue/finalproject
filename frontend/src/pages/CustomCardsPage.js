import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE, AUTH_BASE } from '../config';

const CustomCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_BASE}/cards/userCards`, {
          headers: {
            Authorization: `Bearer ${token}` 
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user cards');
        const data = await response.json();
        console.log('拿到的cards:', data); // ✅ 打印一下返回的数据
        setCards(data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchUserCards();
  }, []);

  // ✅ 只保留 Custom 稀有度的卡牌
  const customCards = cards.filter(card => card.rarityConfig?.rarity === 'Custom');

  const handleCardClick = (cardId) => {
    navigate(`/cardDetail/${cardId}`);
  };

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={handleBack}>← Back</button>

      <h2 style={styles.title}>My AI Designed Cards</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        {customCards.length > 0 ? (
          customCards.map(card => (
            <div key={card.cardId} style={styles.card} onClick={() => handleCardClick(card.cardId)}>
              <img
                src={card.imageUrl}
                alt={card.name}
                style={styles.image}
                onError={(e) => { e.target.src = '/static/img/default.jpg'; }}
              />
              <h3>{card.name}</h3>
            </div>
          ))
        ) : (
          <p style={styles.noCards}>You haven't designed any cards yet.</p>
        )}
      </div>
    </div>
  );
};

export default CustomCardsPage;

// ✅ 内联样式对象
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f5e9',
    minHeight: '100vh',
  },
  backButton: {
    backgroundColor: '#5c3b11',
    color: 'white',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#5c3b11',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  noCards: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#888',
    fontSize: '1.1rem',
  },
};
