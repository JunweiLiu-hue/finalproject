import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config';

const API_BASE_URL = `${API_BASE.replace('/api', '')}/user`;

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('You are not logged in');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch user info');
        const data = await res.json();
        setUser(data);
        setEmail(data.email || '');
        setAvatarPreview(data.avatarUrl || '');
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE.replace('/api', '')}/user/upload/avatar`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      body: formData
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.avatarUrl;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) return;

    try {
      let avatarUrl = user.avatarUrl;
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile);
      }

      const updatePayload = { email, avatarUrl };

      const res = await fetch(`${API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      if (!res.ok) throw new Error('Failed to update profile');
      alert('Profile updated!');
      navigate('/personal');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <label>Username:</label>
          <span>{user.username}</span>
        </div>
        <div style={styles.row}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {avatarPreview && (
          <div style={styles.preview}>
            <img src={avatarPreview} alt="Avatar Preview" style={styles.avatar} />
          </div>
        )}
        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#faf3dc',
    minHeight: '100vh'
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fffbe6',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  row: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  preview: {
    marginTop: '15px',
    textAlign: 'center'
  },
  avatar: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #aaa'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#5c3b11',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
  }
};

export default EditProfilePage;
