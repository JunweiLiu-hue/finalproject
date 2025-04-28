import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE, AUTH_BASE } from '../config';

const API_ACTIVITY = `${API_BASE}/activity`;
const API_ME = `${AUTH_BASE}/user/me`;

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const resUser = await fetch(API_ME, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resUser.ok) throw new Error('Failed to get user info');
      const userData = await resUser.json();

      const res = await fetch(`${API_ACTIVITY}/list?userId=${userData.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch activities');
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComplete = async (activityId) => {
    try {
      await fetch(`${API_ACTIVITY}/join?activityId=${activityId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await fetch(`${API_ACTIVITY}/complete?activityId=${activityId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const msg = await res.text();
      alert(msg);
      fetchActivities();
    } catch (err) {
      alert('Error completing activity');
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/homepage')} style={styles.backButton}>← Back to Home</button>
      <h2 style={styles.title}>🎯 Activity Center</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={styles.list}>
        {activities.map(act => (
          <li key={act.activityId} style={styles.card}>
            <h3>{act.name}</h3>
            <p>{act.description}</p>
            <p><strong>Reward:</strong> {act.reward} coins</p>
            {act.status === 'COMPLETED' ? (
              <span style={{ color: 'gray' }}>✅ Completed</span>
            ) : (
              <button style={styles.button} onClick={() => handleComplete(act.activityId)}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#faf3dc',
    minHeight: '100vh',
  },
  backButton: {
    marginBottom: '20px',
    backgroundColor: '#5c3b11',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  title: {
    color: '#4a3314',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fffbe6',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    color: '#4a3314',
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
  },
};

export default ActivityPage;
