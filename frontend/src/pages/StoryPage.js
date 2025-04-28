import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config'; // ✅ 确保 config.js 中定义了 API_BASE

const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE}/story/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();

        if (Array.isArray(data)) {
          setStories(data);
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStories();
  }, []);

  const handleClick = (id) => {
    navigate(`/story/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={handleBack}>← Back</button>
      <h2 style={styles.title}>📜 Famous Stories of the Three Kingdoms</h2>
      {error && <p style={styles.error}>❌ {error}</p>}

      <ul style={styles.list}>
        {Array.isArray(stories) && stories.map((story) => (
          <li
            key={story.id}
            onClick={() => handleClick(story.id)}
            style={styles.listItem}
          >
            {story.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#faf3dc',
    padding: '30px',
    minHeight: '100vh',
  },
  title: {
    color: '#4a3314',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#5c3b11',
    color: 'white',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    margin: '15px 0',
    padding: '15px',
    background: '#fffbe6',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#4a3314',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background 0.3s',
  },
};

export default StoryPage;
