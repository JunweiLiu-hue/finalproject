import React from 'react';
import Template from '../components/template';
import CardList from '../components/cardList';

const UserCardsPage = () => {
    const userId = parseInt(localStorage.getItem('userId'));

    return (
        <Template>
            <div style={styles.pageContainer}>
                <h2 style={styles.title}>My Cards</h2>
                <CardList userId={userId} />
            </div>
        </Template>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#faf3dc',
        padding: '20px 40px',
        boxSizing: 'border-box',
        height: '100vh',  
        overflowY: 'scroll',  
    },
    title: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#4a3314',
        marginBottom: '20px',
    },
};




export default UserCardsPage;
