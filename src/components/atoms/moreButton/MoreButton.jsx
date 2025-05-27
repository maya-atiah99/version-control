import React, { Children, useEffect, useRef, useState } from 'react';
import style from './MoreButton.module.scss';
import RenderIcon from '../../../helpers/render-icon/RenderIcon';
const EventEmitter = (() => {
  const events = {};
  return {
    subscribe: (event, listener) => {
      if (!events[event]) events[event] = [];
      events[event].push(listener);
    },
    unsubscribe: (event, listener) => {
      if (!events[event]) return;
      events[event] = events[event].filter((l) => l !== listener);
    },
    emit: (event, data) => {
      if (!events[event]) return;
      events[event].forEach((listener) => listener(data));
    },
  };
})();

const MoreButton = ({
  icon,
  color,
  className,
  children,
  width,
  imgWidth,
  imgHeight,
  top,
  title,
  off,
  center,
  toolTipText,
  image,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleShowMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) {
      EventEmitter.emit('closeAllMenus');
    }
    setShowMenu(!showMenu);
  };

  const handleDocumentClick = (e) => {
    if (menuRef.current && !menuRef.current?.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    EventEmitter.subscribe('closeAllMenus', () => setShowMenu(false));

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      EventEmitter.unsubscribe('closeAllMenus', () => setShowMenu(false));
    };
  }, []);

  return (
    <div className={style['parent']} ref={menuRef}>
      <div className={style['parent-sub']}>
        <div
          className={style['title-container']}
          onClick={handleShowMenu}
          style={{ justifyContent: center ? 'center' : '' }}
        >
          {image ? (
            image
          ) : (
            <RenderIcon
              type={icon}
              className={`${style['more-img']} ${
                off ? style['off'] : ''
              } ${className}`}
              style={{ width: imgWidth, height: imgHeight }}
              color={color}
            />
          )}

          {title ? <h3>{title}</h3> : ''}
        </div>
        {showMenu && (
          <>
            <div className={`${style.backdrop}`} onClick={handleShowMenu}></div>
            <div
              className={`${style['menu-container']} ${
                width ? style['max_inner_width'] : ''
              }`}
              style={{
                width: width,
                top: top,
                zIndex: '12',
              }}
            >
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoreButton;
