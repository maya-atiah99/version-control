import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navlink.module.scss';
import RenderIcon from '../../../helpers/render-icon/RenderIcon';
import { useResponsive } from '../../../assets/styles/breakpoints/breakpoints';
import Tooltip from '../../Custom/tooltip/Tooltip';

const Navlink = ({ isOpen, setIsOpen }) => {
  const { isTablet } = useResponsive();

  const appData = [
    {
      label: 'Projects',
      icon: 'projectsSvg',
      to: '/projects',
      child: [
        { label: 'AiDucator', icon: 'aiDucator', to: '/project/1' },
        { label: 'Edulytics', icon: 'edulytics', to: '/project/2' },
        { label: 'DPA', icon: 'dpa', to: '/project/3' },
        { label: 'AUD', icon: 'aud', to: '/project/4' },
      ],
    },
    { label: 'Users', icon: 'usersSvg', to: '/users' },
    {
      label: 'Email Template',
      icon: 'emailTemp',
      to: '/email-template',
    },
  ];

  const handleMobileClick = () => {
    if (isTablet) {
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.nav}>
      {appData.map((item, index) => {
        const hasChild = !!item.child?.length;
        return (
          <div key={index} onClick={handleMobileClick}>
            <Tooltip
              content={item.label}
              disabled={isOpen || isTablet}
              placement="right"
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles['nav-link']} ${
                    isOpen ? styles['nav-link-open'] : ''
                  } ${isActive ? styles.active : ''}`
                }
              >
                <RenderIcon type={item.icon} className={styles.icon} />
                {isOpen && <p>{item.label}</p>}
              </NavLink>
            </Tooltip>

            {hasChild && (
              <div
                className={`${styles['nav-children']} ${
                  !isOpen ? styles.close : null
                }`}
              >
                {item.child.map((child, childIdx) => (
                  <Tooltip
                    content={child.label}
                    disabled={isOpen || isTablet}
                    placement="right"
                  >
                    {' '}
                    <NavLink
                      to={child.to}
                      key={childIdx}
                      className={({ isActive }) =>
                        `${styles['nav-child-link']} ${
                          !isOpen ? styles['close'] : ''
                        }${isActive ? styles.active : ''}`
                      }
                      style={{
                        width: !isOpen ? 'fit-content' : null,
                      }}
                    >
                      <RenderIcon type={child.icon} className={styles.icon} />
                      {isOpen && <p>{child.label}</p>}
                    </NavLink>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Navlink;
