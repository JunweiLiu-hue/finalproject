import React from 'react';
import Template from '../components/template';
import WarehouseList from '../components/WarehouseList';

const WarehousePage = () => {
    return (
        <Template>
            <div style={styles.pageContainer}>
                <h2 style={styles.title}>My Warehouse</h2>
                <WarehouseList /> 
            </div>
        </Template>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#faf3dc',
        padding: '20px 40px',
        boxSizing: 'border-box',
        minHeight: '100vh',
        overflowY: 'auto',
    },
    title: {
        textAlign: 'center',
        fontSize: '1.8rem',
        color: '#4a3314',
        marginBottom: '20px',
    },
};

export default WarehousePage;
