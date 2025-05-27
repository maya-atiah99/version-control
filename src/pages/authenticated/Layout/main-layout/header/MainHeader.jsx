import React from 'react';
import styles from './MainHeader.module.scss';
import { useAppContext } from '../../../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import RenderIcon from '../../../../../helpers/render-icon/RenderIcon';
import { useResponsive } from '../../../../../assets/styles/breakpoints/breakpoints';
import BurgerComponent from '../../../../../components/sidebar/burger-sidbar/BurgerComponent';
import ProfileDropdown from './profile-dropdown/ProfileDropdown';
const MainHeader = ({}) => {
  const location = useLocation();
  const { links } = useAppContext();
  const { isTablet } = useResponsive();

  const navigate = useNavigate();
  const link = links?.find(
    (item) => item.linkTo === location.pathname.split('/')[1]
  );
  const headerTitle = link?.title || 'Project';
  const hasBackIcon = link?.isBack;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.header}>
      {isTablet ? <BurgerComponent /> : null}
      <div className={styles.title}>
        {hasBackIcon && (
          <RenderIcon
            type="back"
            className={styles.backIcon}
            onClick={handleGoBack}
          />
        )}
        <h3>{headerTitle}</h3>
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default MainHeader;
