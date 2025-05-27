import React from 'react';
import styles from './Sidebar.module.scss';
import expandedLogo from '../../assets/images/sidebar/expandedLogo.svg';
import collapsedLogo from '../../assets/images/sidebar/collapsedLogo.svg';
import RenderIcon from '../../helpers/render-icon/RenderIcon';
import Navlink from './navlink/Navlink';
import Button from '../atoms/forms/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useResponsive } from '../../assets/styles/breakpoints/breakpoints';
import Tooltip from '../Custom/tooltip/Tooltip';

const Sidebar = () => {
  const { isOpen, setIsOpen } = useAppContext();
  const { isTablet } = useResponsive();
  const navigate = useNavigate();

  const handleExpandCollapseSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return !isTablet ? (
    <div className={`${styles['sidebar']} ${isOpen ? styles.open : ''}`}>
      <div
        className={styles['expanded_container']}
        onClick={handleExpandCollapseSidebar}
      >
        <RenderIcon
          type="arrow"
          className={`${styles['arrow']}  ${!isOpen ? styles.open : ''}`}
        />
      </div>
      <img
        src={isOpen ? expandedLogo : collapsedLogo}
        alt="logo"
        className={styles['logo']}
      />
      <Navlink isOpen={isOpen} />
      <Tooltip
        content="Add Project"
        disabled={isOpen || isTablet}
        placement="right"
      >
        {' '}
        <Button
          label={isOpen ? 'Add Project' : null}
          svgType="add"
          transparent
          onClick={() => {
            navigate('/new-project');
          }}
        />
      </Tooltip>
    </div>
  ) : null;
};

export default Sidebar;
