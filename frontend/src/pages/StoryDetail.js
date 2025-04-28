import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE from '../config'; // ✅ 根据你的路径调整

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await fetch(`${API_BASE}/story/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch story');
        const data = await response.json();
        setStory(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStory();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!story) return <p>Loading...</p>;

  const paragraphs = story.content.split('\n\n').map((p, idx) => (
    <p key={idx} style={styles.paragraph}>{p}</p>
  ));

  return (
    <div style={styles.pageContainer}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
      <div style={styles.storyContainer}>
        <h1 style={styles.title}>{story.title}</h1>
        <div style={styles.scrollBox}>
          {paragraphs}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#faf3dc',
    minHeight: '100vh',
    padding: '30px',
    fontFamily: 'Georgia, serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  storyContainer: {
    backgroundColor: '#fffbe6',
    borderRadius: '12px',
    padding: '30px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#5c3b11',
    textAlign: 'center',
  },
  scrollBox: {
    maxHeight: '70vh',
    overflowY: 'auto',
    paddingRight: '10px',
  },
  paragraph: {
    marginBottom: '20px',
    textIndent: '2em',
    fontSize: '1.05rem',
    color: '#4a3314',
    lineHeight: '1.8',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: '20px',
    background: '#d9a874',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default StoryDetail;
