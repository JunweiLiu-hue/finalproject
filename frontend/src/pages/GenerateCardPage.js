import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config';

const GenerateCardPage = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/cards/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description })
      });

      if (!res.ok) throw new Error('Failed to generate card image');

      const data = await res.json();

      // ✅ 替換 localhost 或拼接統一格式
      const filename = data.imageUrl.split('/').pop(); // 取出圖片名
      const finalUrl = `/static/img/${filename}`;     // 拼接為 nginx 靜態資源地址

      setImageUrl(finalUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Failed to generate card image');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
      <h2>🧠 Generate Your Custom Card</h2>
      <input
        type="text"
        placeholder="Enter character name or description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={handleGenerate}>Generate</button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>🎴 Your Card:</h3>
          <img src={imageUrl} alt="Generated Card" style={{ width: '300px', border: '1px solid #ccc', borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: {
    backgroundColor: '#5c3b11',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px'
  }
};

export default GenerateCardPage;
