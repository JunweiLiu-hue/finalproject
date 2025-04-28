import React, { useState } from 'react';
import styles from './PrivateChat.module.css';

const PrivateChat = ({ client, username, privateMessages }) => {
  const [input, setInput] = useState('');
  const [receiver, setReceiver] = useState('');

  const sendPrivateMessage = () => {
    if (!client || !client.connected || input.trim() === '' || receiver.trim() === '') return;

    client.publish({
      destination: '/app/chat/private',
      body: JSON.stringify({
        sender: username,
        receiver: receiver.trim(),
        content: input,
        timestamp: new Date().toLocaleTimeString()
      })
    });
    setInput('');
  };

  return (
    <div className={styles.privateChatBox}>
      <input
        type="text"
        placeholder="Enter receiver's username"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className={styles.receiverInput}
      />
      <div className={styles.messageList}>
        {privateMessages.map((msg, idx) => (
          <div key={idx} className={styles.privateMessageItem}>
            <strong>{msg.sender}</strong>: {msg.content}
            <span className={styles.timestamp}>({msg.timestamp})</span>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          placeholder="Type your private message..."
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button onClick={sendPrivateMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default PrivateChat;
