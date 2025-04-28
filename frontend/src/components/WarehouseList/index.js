import React, { useState, useEffect } from 'react';
import { API_BASE, AUTH_BASE } from '../../config';

const API_STORE = `${API_BASE}/store`;
const API_OPEN = `${AUTH_BASE}/user/openPack`;

const WarehouseList = () => {
  const [packs, setPacks] = useState([]);
  const [error, setError] = useState('');
  const [drawnCard, setDrawnCard] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchUserPacks = async () => {
    try {
      const res = await fetch(`${API_STORE}/userWarehouse`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch card packs');
      const data = await res.json();
      setPacks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserPacks();
  }, []);

  const handleOpenPack = async (packId) => {
    try {
      const res = await fetch(`${API_OPEN}?packId=${packId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to open pack');
      const card = await res.json();
      setDrawnCard(card);
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        fetchUserPacks();
      }, 3000);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'gold';
      case 'Rare': return 'blue';
      case 'Historical': return 'green';
      case 'Common':
      default: return 'gray';
    }
  };

  // ✅ 拼接图片地址（统一处理空格为 -）
  const getImagePath = (name) => {
    const filename = name.trim().replace(/\s+/g, '-') + '.jpg';
    return `/static/img/${filename}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Card Packs</h2>
      {error && <p style={styles.error}>{error}</p>}

      {drawnCard && (
        <div style={{ ...styles.resultBox, ...(showAnimation ? styles.animated : {}) }}>
          <button style={styles.closeButton} onClick={() => setDrawnCard(null)}>✖</button>
          <img src={getImagePath(drawnCard.name)} alt={drawnCard.name} style={styles.cardImage} />
          <div style={styles.cardName}>{drawnCard.name}</div>
          <div style={{ ...styles.rarity, color: getRarityColor(drawnCard.rarityConfig.rarity) }}>
            Rarity: {drawnCard.rarityConfig.rarity}
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {packs.length > 0 ? (
          packs.map((pack) => (
            <div key={pack.id} style={styles.card}>
              <img src={getImagePath(pack.pack.name)} alt={pack.pack.name} style={styles.image} />
              <h3>{pack.pack.name}</h3>
              <p>Quantity: {pack.quantity}</p>
              <button style={styles.button} onClick={() => handleOpenPack(pack.pack.packId)}>
                🎲 Open Pack
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noPacks}>You don't have any card packs.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#faf3dc',
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    overflowY: 'auto',
  },
  title: {
    fontSize: '1.8rem',
    color: '#4a3314',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#d9a874',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'contain',
    marginBottom: '15px',
  },
  button: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#5c3b11',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  noPacks: {
    fontSize: '1.2rem',
    color: '#4a3314',
  },
  resultBox: {
    backgroundColor: '#fff6e6',
    border: '2px solid #d9a874',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    marginTop: '20px',
    width: '300px',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#4a3314',
  },
  cardImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  cardName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4a3314',
  },
  rarity: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  animated: {
    animation: 'zoomRotate 1s ease-in-out forwards',
  },
};

// 注入 CSS 动画
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes zoomRotate {
  0% {
    transform: scale(0.3) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.3) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}`;
document.head.appendChild(styleSheet);

export default WarehouseList;
