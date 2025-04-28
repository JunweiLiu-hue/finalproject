import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  
import styles from './register.module.css';
import { API_BASE } from '../../config'; // ✅ 引入 API 地址

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const user = {
            username,
            password,
            confirmPassword
        };

        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('Registration successful! Please log in.');
                navigate('/');
            } else {
                const text = await response.text();
                setError(text || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred while registering');
        }
    };

    return (
        <div className={styles['register-container']}>
            <h2>Register</h2>
            {error && <div className={styles['register-error']}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles['register-input-field']}>
                    <input 
                        type="text" 
                        placeholder=" " 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <label>Username</label>
                </div>
                <div className={styles['register-input-field']}>
                    <input 
                        type="password" 
                        placeholder=" " 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <label>Password</label>
                </div>
                <div className={styles['register-input-field']}>
                    <input 
                        type="password" 
                        placeholder=" " 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                    <label>Confirm Password</label>
                </div>
                <button className={styles['register-button']} type="submit">Register</button>
            </form>

            <div className={styles['login-link']}>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default RegisterForm;
