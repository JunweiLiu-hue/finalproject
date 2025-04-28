import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/template';
import ChatRoom from '../components/ChatRoom.js';

const HomePage = () => {
  const navigate = useNavigate();
  const [showNotice, setShowNotice] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleNoticeClick = () => setShowNotice(true);
  const handleCloseNotice = () => setShowNotice(false);
  const handleStoryClick = () => navigate('/stories');
  const handleEventClick = () => navigate('/activities');

  return (
    <Template>
      <div style={styles.pageContainer}>
        <div style={styles.grid}>
          <div style={styles.card}>
            <img src="/img/qunxiongtaodong.jpg" alt="Card Pack" style={styles.image} />
            <h3 style={styles.cardTitle}>New Card Pack: The heroes fight against Dong</h3>
            <p style={styles.cardText}>Explore the latest card series...</p>
          </div>

          <div style={{ ...styles.card, cursor: 'pointer' }} onClick={handleNoticeClick}>
            <img src="/img/gonggaolan.jpg" alt="Notice Board" style={styles.image} />
            <h3 style={styles.cardTitle}>Notice Board</h3>
            <p style={styles.cardText}>Stay updated with the latest announcements.</p>
          </div>

          <div style={{ ...styles.card, cursor: 'pointer' }} onClick={handleStoryClick}>
            <img src="/img/huoshaochibi.jpg" alt="Famous Story" style={styles.image} />
            <h3 style={styles.cardTitle}>Famous Stories</h3>
            <p style={styles.cardText}>Explore legendary tales from the Three Kingdoms era.</p>
          </div>

          <div style={{ ...styles.card, cursor: 'pointer' }} onClick={handleEventClick}>
            <img src="/img/event.jpg" alt="Event" style={styles.image} />
            <h3 style={styles.cardTitle}>Event</h3>
            <p style={styles.cardText}>Participate in activities to win rewards.</p>
          </div>
        </div>

        {/* 📢 Notice 弹窗 */}
        {showNotice && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <button style={styles.closeButton} onClick={handleCloseNotice}>✖</button>
              <h2 style={styles.noticeTitle}>📢 System Announcement</h2>
              <p style={styles.noticeText}>
                🕹️ New Card Pack “Heroes Against Dong Zhuo” is now live!<br /><br />
                🎉 Red Cliffs event starts on April 5th!<br /><br />
                🛠️ Version 1.3.2 includes bug fixes and new animations.<br /><br />
                💡 Tip: You can now view each card's biography from “My Cards” page.
              </p>
            </div>
          </div>
        )}

        {/* 💬 Chat 按钮 */}
        <button
          onClick={() => setChatOpen(true)}
          style={styles.chatButton}
        >
          💬
        </button>

        {/* 💬 ChatRoom 弹窗 */}
        {chatOpen && (
          <div style={styles.chatPopup}>
            <div style={styles.chatHeader}>
              Global Chat Room
              <button onClick={() => setChatOpen(false)} style={styles.closeChat}>✖</button>
            </div>
            <div style={{ flex: 1 }}>
              <ChatRoom />
            </div>
          </div>
        )}
      </div>
    </Template>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#faf3dc',
    padding: '20px 40px',
    boxSizing: 'border-box',
    position: 'relative'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#d9a874',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px'
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4a3314',
    marginBottom: '10px'
  },
  cardText: {
    fontSize: '0.9rem',
    color: '#4a3314',
    lineHeight: '1.5'
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modal: {
    backgroundColor: '#fffbe6',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    textAlign: 'left',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    position: 'relative'
  },
  noticeTitle: {
    color: '#4a3314',
    fontSize: '1.5rem',
    marginBottom: '15px'
  },
  noticeText: {
    color: '#4a3314',
    fontSize: '1rem',
    lineHeight: '1.6'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '1.2rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#4a3314'
  },
  chatButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#4a3314',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    zIndex: 999
  },
  chatPopup: {
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    width: '400px',
    height: '500px',
    backgroundColor: '#fffbe6',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    zIndex: 1000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  chatHeader: {
    backgroundColor: '#4a3314',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'relative'
  },
  closeChat: {
    position: 'absolute',
    right: '10px',
    top: '5px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.2rem',
    cursor: 'pointer'
  }
};

export default HomePage;
