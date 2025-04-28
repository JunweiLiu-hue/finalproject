import React, { useState } from 'react';
import styles from './PublicChat.module.css';

const PublicChat = ({ client, username, publicMessages }) => {
  const [input, setInput] = useState('');

  const sendPublicMessage = () => {
    if (!client || !client.connected || input.trim() === '') return;

    client.publish({
      destination: '/app/chat/public',
      body: JSON.stringify({
        sender: username,
        content: input,
        timestamp: new Date().toLocaleTimeString()
      })
    });
    setInput('');
  };

  return (
    <div className={styles.publicChatBox}>
      <div className={styles.messageList}>
        {publicMessages.map((msg, idx) => (
          <div key={idx} className={styles.messageItem}>
            <strong>{msg.sender}</strong>: {msg.content}
            <span className={styles.timestamp}>({msg.timestamp})</span>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button onClick={sendPublicMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default PublicChat;
