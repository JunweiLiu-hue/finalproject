import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import PublicChat from '../PublicChat';
import PrivateChat from '../PrivateChat';
import { AUTH_BASE } from '../../config';
import styles from './ChatRoom.module.css';

const ChatRoom = () => {
  const [client, setClient] = useState(null);
  const [publicMessages, setPublicMessages] = useState(() => {
    const saved = localStorage.getItem('publicMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [privateMessages, setPrivateMessages] = useState(() => {
    const saved = localStorage.getItem('privateMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('public'); // 'public' or 'private'

  // 保存 publicMessages 到 localStorage
  useEffect(() => {
    localStorage.setItem('publicMessages', JSON.stringify(publicMessages));
  }, [publicMessages]);

  // 保存 privateMessages 到 localStorage
  useEffect(() => {
    localStorage.setItem('privateMessages', JSON.stringify(privateMessages));
  }, [privateMessages]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    fetch(`${AUTH_BASE}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsername(data.username))
      .catch(err => console.error('Failed to fetch user', err));
  }, []);

  useEffect(() => {
    if (!username) return;

    const socket = new SockJS('http://54.155.202.250:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log('Connected ✅');

      stompClient.subscribe('/topic/public', (message) => {
        const body = JSON.parse(message.body);
        setPublicMessages(prev => [...prev, body]);
      });

      stompClient.subscribe(`/queue/private/${username}`, (message) => {
        const body = JSON.parse(message.body);
        setPrivateMessages(prev => [...prev, body]);
      });
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, [username]);

  const toggleMode = () => {
    setMode(prev => (prev === 'public' ? 'private' : 'public'));
  };

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.header}>
        Global Chat Room
        <button onClick={toggleMode} className={styles.switchButton}>
          Switch to {mode === 'public' ? 'Private' : 'Public'} Chat
        </button>
      </div>

      {mode === 'public' ? (
        <PublicChat client={client} username={username} publicMessages={publicMessages} />
      ) : (
        <PrivateChat client={client} username={username} privateMessages={privateMessages} />
      )}
    </div>
  );
};

export default ChatRoom;
