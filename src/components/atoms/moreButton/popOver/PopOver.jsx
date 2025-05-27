import React, { useState } from 'react';
import styles from './PopOver.module.scss';

const PopOver = ({ info, scroll, stop = false }) => {
  const [active, setActive] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleOnClick = (index, handleFunction) => (e) => {
    if (stop) {
      setActiveIndex(index);
      if (index !== activeIndex) {
        handleFunction(e);
      }

      setTimeout(() => {
        setActiveIndex(null);
      }, 5000);
    } else {
      handleFunction(e);
    }
  };

  return (
    <div className={`${scroll ? styles['container'] : ''} `}>
      <div className={`${styles['popOver-container']} `}>
        {info?.map((item, index) => {
          const subContainerClassName = `${styles['popOver-subContainer']}  ${
            index == info?.length - 1 ? styles['noBorder'] : ''
          } ${item.active ? styles['active'] : ''}`;
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={`${subContainerClassName} ${
                isActive ? styles.inActiveDiv : ''
              }`}
              onClick={
                item.handleFunction
                  ? handleOnClick(index, item.handleFunction)
                  : null
              }
            >
              {item.icon && <img src={item.icon} alt={item.icon} />}

              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopOver;
