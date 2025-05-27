import React from 'react';
import Sidebar from '../../../../components/sidebar/Sidebar';
import MainHeader from './header/MainHeader';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <div className={styles['main']}>
      <Sidebar />
      <div className={styles['layout']}>
        <MainHeader />
        <div className={styles['page-container']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
