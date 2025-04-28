import React from 'react';
import SiteHeader from '../siteHeader';

const Template = ({ children }) => {
  return (
    <div style={styles.template}>
      <SiteHeader />
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  template: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#faf3dc', // 页面背景色
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    marginTop: '80px', // 为固定导航栏预留空间
  },
};

export default Template;
