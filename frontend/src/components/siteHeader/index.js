import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Three Kingdoms Cards</h1>
      </div>
      <div style={styles.right}>
        <Link to="/homePage" style={styles.link}>
          <button style={styles.button}>HomePage</button>
        </Link>
        <Link to="/mallPage" style={styles.link}>
          <button style={styles.button}>Mall</button>
        </Link>
        <Link to="/userCardsPage" style={styles.link}>
          <button style={styles.button}>My Card</button>
        </Link>
        <Link to="/personal" style={styles.link}>
          <button style={styles.button}>Personal Page</button>
        </Link>
        <Link to="/warehouse" style={styles.link}>
          <button style={styles.button}>Warehouse</button>
        </Link>
        <Link to="/generateCard" style={styles.link}>
          <button style={styles.button}>Generate Card</button>
        </Link>
        <Link to="/myCustomCardsPage" style={styles.link}>
          <button style={styles.button}>CustomPage</button>
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b98956',
    padding: '10px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontFamily: "'Georgia', serif",
    margin: 0,
  },
  right: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: '#5c3b11',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: "'Arial', sans-serif",
  },
  link: {
    textDecoration: 'none',
  },
};

export default SiteHeader;
