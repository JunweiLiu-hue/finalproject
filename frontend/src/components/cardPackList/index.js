import React, { useState, useEffect } from 'react';
import styles from './cardPackList.module.css';
import API_BASE from '../../config';

const imageMap = {
  wind: '/static/img/feng.jpg',
  forest: '/static/img/lin.jpg',
  fire: '/static/img/huo.jpg',
  mountain: '/static/img/shan.jpg',
};

function CardPackList() {
  const [cardPacks, setCardPacks] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [error, setError] = useState('');

  // 获取卡包列表
  useEffect(() => {
    const fetchCardPacks = async () => {
      try {
        const response = await fetch(`${API_BASE}/store/getAllPacks`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch card packs');
        const data = await response.json();
        setCardPacks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCardPacks();
  }, []);

  // 获取单个卡包详情
  const handlePackClick = async (packId) => {
    try {
      const response = await fetch(`${API_BASE}/store/getPack/${packId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      });
      if (!response.ok) throw new Error('Failed to fetch card pack details');
      const data = await response.json();
      setSelectedPack(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 购买卡包
  const handleBuyPack = async (packId) => {
    try {
      const response = await fetch(`${API_BASE}/store/buyPack?packId=${packId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      });
      const data = await response.text();
      alert(data);
    } catch (err) {
      alert('Purchase failed: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}

      {selectedPack ? (
        <div className={styles.details}>
          <img
            src={imageMap[selectedPack.name] || '/static/img/default.jpg'}
            alt={selectedPack.name}
            className={styles.imageLarge}
          />
          <h2>{selectedPack.name}</h2>
          <p>{selectedPack.description}</p>
          <p className={styles.detailText}>{selectedPack.detailDescription}</p>
          <p>Price: {selectedPack.price} coins</p>
          <button className={styles.buyButton} onClick={() => handleBuyPack(selectedPack.packId)}>
            Buy
          </button>
          <button className={styles.backButton} onClick={() => setSelectedPack(null)}>
            Back
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {cardPacks.map((pack) => (
            <div key={pack.packId} className={styles.card} onClick={() => handlePackClick(pack.packId)}>
              <img
                src={imageMap[pack.name] || '/static/img/default.jpg'}
                alt={pack.name}
                className={styles.image}
              />
              <h3>{pack.name}</h3>
              <p>{pack.description}</p>
              <p>Price: {pack.price} coins</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardPackList;
