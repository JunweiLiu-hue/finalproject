import React from 'react';
import Template from '../components/template';
import CardPackList from '../components/cardPackList';

const MallPage = () => {
    return (
        <Template>
            <div style={styles.scrollContainer}>
                <h2 style={styles.title}>Mall</h2>
                <CardPackList />
            </div>
        </Template>
    );
};

const styles = {
    scrollContainer: {
        backgroundColor: '#faf3dc',
        padding: '20px 40px',
        boxSizing: 'border-box',
        minHeight: '100vh',
        maxHeight: '90vh', // ✅ 设置最大高度，防止内容太长
        overflowY: 'auto', // ✅ 让内容可上下滚动
        scrollbarWidth: 'thin', // ✅ 在 Firefox 中优化滚动条
    },
    title: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#4a3314',
    },
};

export default MallPage;
