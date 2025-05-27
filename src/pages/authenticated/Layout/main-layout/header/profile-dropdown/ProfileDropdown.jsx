import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { svgMap } from '../../../../../../helpers/render-icon/svgMap';
import Tooltip from '../../../../../../components/Custom/tooltip/Tooltip';
import styles from './ProfileDropdown.module.scss';
const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      setAnimationClass('entering');
    } else {
      closeDropdown();
    }
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setAnimationClass('exiting');
    setTimeout(() => {
      setIsOpen(false);
      setAnimationClass('');
    }, 300);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  const onLogout = () => {
    setTimeout(() => {
      navigate('/');
      // window.location.reload('/');
      localStorage.clear();
    }, 100);
  };
  const handleMoveToProfile = () => {
    navigate('/profile');
  };

  const dropdownInfo = [
    {
      title: 'Profile',
      svgType: 'userIcon',
      func: handleMoveToProfile,
    },
    {
      title: 'Logout',
      svgType: 'logout',
      func: onLogout,
    },
  ];

  return (
    <Tooltip content="Profile / Logout" placement="left">
      <div
        className={styles['profile-dropdown']}
        ref={profileRef}
        onClick={toggleDropdown}
      >
        <img
          src={svgMap?.['profile']}
          alt="Profile"
          className={styles['profile-image-container']}
        />

        <div
          className={styles['info']}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <div>
            <p className={styles['name']}>Maya Atiah</p>
            <p className={styles['type']}>Admin</p>
          </div>
          <img
            className={styles['arrow']}
            src={svgMap?.['dropdownArrow']}
            alt="Toggle dropdown"
          />
        </div>

        {isOpen && (
          <div
            className={`${styles['dropdown-menu']} ${styles[animationClass]}`}
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: '100%',
              zIndex: 1000,
            }}
          >
            {dropdownInfo?.map((i, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => i.func()}
                  className={styles['div']}
                >
                  {/* <img src={svgMap?.[i.svgType]} alt="profile" /> */}
                  {i.title}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default ProfileDropdown;
