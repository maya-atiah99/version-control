import React from 'react';
import RenderIcon from '../../../helpers/render-icon/RenderIcon';
import styles from './BurgerComponent.module.scss';
import { useAppContext } from '../../../context/AppContext';
import collapsedLogo from '../../../assets/images/sidebar/collapsedLogo.svg';
import Navlink from '../navlink/Navlink';
import { svgMap } from '../../../helpers/render-icon/svgMap';

const BurgerComponent = () => {
  const { isOpen, setIsOpen } = useAppContext();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles['burger-icon']} onClick={toggleSidebar}>
        <RenderIcon type="burger" className={styles.icon} color="#FFFF" />
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.closeBtn}>
          <img src={collapsedLogo} alt="logo" className={styles['logo']} />
          <img
            src={svgMap?.['closeIcon']}
            alt="close"
            className={styles.icon}
            onClick={toggleSidebar}
          />
        </div>

        <Navlink isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default BurgerComponent;
