import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './cardList.module.css';
import { API_BASE, AUTH_BASE } from '../../config'; // ✅ 引入后端地址

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // ✅ 获取当前用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`${AUTH_BASE}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to get user info');
        const data = await res.json();
        setUserId(data.userId);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);

  // ✅ 获取卡牌列表
  useEffect(() => {
    if (!userId) return;

    const fetchUserCards = async () => {
      try {
        const response = await fetch(`${API_BASE}/cards/userCards`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user cards');
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserCards();
  }, [userId]);

  const handleCardClick = (cardId) => {
    navigate(`/cardDetail/${cardId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Card Collection</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {cards.length > 0 ? (
          cards
            .filter(card => card.rarityConfig.rarity !== 'Custom') // ✅ 只加这一行：过滤掉 Custom
            .map((card) => (
              <div key={card.cardId} className={styles.card} onClick={() => handleCardClick(card.cardId)}>
                <img
                  src={`/static/img/${card.name.trim().replace(/\s+/g, '-')}.jpg`} 
                  alt={card.name}
                  className={styles.image}
                />
                <h3>{card.name}</h3>
                <p className={`rarity ${styles[`rarity-${card.rarityConfig.rarity}`]}`}>
                  Rarity: {card.rarityConfig.rarity}
                </p>
              </div>
            ))
        ) : (
          <p className={styles.noCards}>You haven't collected any cards yet.</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
