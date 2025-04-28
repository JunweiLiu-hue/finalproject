import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config';

const PersonalPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('You are not logged in');
        return;
      }

      try {
        const res = await fetch(`${API_BASE.replace('/api', '')}/user/me`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        });

        if (!res.ok) throw new Error('Failed to fetch user info');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBack = () => {
    navigate('/homePage');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>👤 Personal Information</h2>
      {error && <p style={styles.error}>{error}</p>}

      {user ? (
        <div style={styles.card}>
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              style={styles.avatar}
            />
          )}
          <div style={styles.row}>
            <span style={styles.label}>Username:</span>
            <span style={styles.value}>{user.username}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{user.email || 'N/A'}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Balance:</span>
            <span style={styles.value}>{user.balance} coins</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Join Date:</span>
            <span style={styles.value}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.backButton} onClick={handleBack}>← Back to Home</button>
            <button style={styles.editButton} onClick={handleEditProfile}>✏️ Edit Info</button>
          </div>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: '40px',
    backgroundColor: '#faf3dc',
    minHeight: '100vh',
    fontFamily: 'Georgia, serif',
  },
  title: {
    fontSize: '2rem',
    color: '#4a3314',
    marginBottom: '30px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fffbe6',
    padding: '25px 30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '2px solid #ccc',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    color: '#5c3b11',
  },
  value: {
    color: '#4a3314',
  },
  buttonGroup: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#5c3b11',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#d9a874',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default PersonalPage;
