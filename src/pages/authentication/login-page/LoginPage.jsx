import React from 'react';
import styles from './LoginPage.module.scss';
import { useResponsive } from '../../../assets/styles/breakpoints/breakpoints';
import expandedLogo from '../../../assets/images/sidebar/expandedLogo.svg';
import collapsedLogo from '../../../assets/images/sidebar/collapsedLogo.svg';
import Input from '../../../components/atoms/forms/input/input/Input';
import Button from '../../../components/atoms/forms/button/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isTablet } = useResponsive();
  return (
    <div className={styles['login-page']}>
      <div className={`${styles['form-container']} `}>
        <div className={styles['form']}>
          <div className={styles.logo}>
            <img
              src={isTablet ? collapsedLogo : expandedLogo}
              alt="logo"
              className={styles['logo']}
            />
          </div>
          <form>
            <div className={styles['input-container']}>
              <Input
                label="Username"
                svgType="userInput"
                style={{ color: '#FFFF' }}
              />

              <Input
                label="Password"
                svgType="userInput"
                style={{ color: '#FFFF' }}
              />
              <div className={styles.footer}>
                <Button
                  label="Login"
                  transparent
                  onClick={() => navigate('/users')}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
