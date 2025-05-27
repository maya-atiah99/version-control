import React from 'react';
import Container from '../../../components/hoc/container/Container';
import styles from './ProfilePage.module.scss';
import { svgMap } from '../../../helpers/render-icon/svgMap';
const ProfilePage = () => {
  return (
    <Container>
      <div className={styles.cont}>
        <div className={styles.headerSub}>
          <img
            src={svgMap?.['profile']}
            alt="User Icon"
            className={styles['user-image']}
          />

          <div className={styles['name-cont']}>
            <h3>Maya Atiah</h3>
            <p>Role Name : Admin</p>
            <p>@mayaAT</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
