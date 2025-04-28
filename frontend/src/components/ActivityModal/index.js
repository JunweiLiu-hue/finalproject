import React, { useEffect, useState } from 'react';
import API_BASE from '../../config';

const ActivityModal = ({ userId, onClose }) => {
  const [activities, setActivities] = useState([]);
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_BASE}/activity/list?userId=${userId}`);
        const data = await res.json();
        setActivities(data);
        // 标记已完成
        const map = {};
        data.forEach(act => {
          map[act.activityId] = act.completed;
        });
        setCompletedMap(map);
      } catch (err) {
        console.error('Failed to load activities:', err);
      }
    };
    fetchActivities();
  }, [userId]);

  const handleComplete = async (activityId) => {
    try {
      const res = await fetch(`${API_BASE}/activity/complete?userId=${userId}&activityId=${activityId}`, {
        method: 'POST',
      });
      if (res.ok) {
        setCompletedMap(prev => ({ ...prev, [activityId]: true }));
      } else {
        const errorText = await res.text();
        alert(errorText);
      }
    } catch (err) {
      alert('Failed to complete activity');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Activities</h2>
        <button style={styles.closeButton} onClick={onClose}>✖</button>
        <div>
          {activities.map(act => (
            <div key={act.activityId} style={styles.activityCard}>
              <h3>{act.title}</h3>
              <p>{act.description}</p>
              <p>Reward: {act.reward} coins</p>
              {completedMap[act.activityId] ? (
                <span style={styles.completed}>✅ Completed</span>
              ) : (
                <button style={styles.completeButton} onClick={() => handleComplete(act.activityId)}>Complete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
    width: '500px', maxHeight: '80vh', overflowY: 'auto', position: 'relative',
  },
  closeButton: {
    position: 'absolute', top: '10px', right: '15px', border: 'none',
    background: 'none', fontSize: '1.2rem', cursor: 'pointer',
  },
  title: {
    marginBottom: '20px', color: '#4a3314', textAlign: 'center',
  },
  activityCard: {
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '15px', marginBottom: '15px',
    backgroundColor: '#faf3dc',
  },
  completeButton: {
    backgroundColor: '#5c3b11', color: 'white', padding: '8px 12px',
    border: 'none', borderRadius: '5px', cursor: 'pointer',
  },
  completed: {
    color: 'green', fontWeight: 'bold',
  }
};

export default ActivityModal;
