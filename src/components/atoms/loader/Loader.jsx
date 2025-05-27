import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ backdrop, style, isComponent = false, classname }) => {
  const containerClassName = backdrop
    ? styles.backdropContainer
    : `${styles.loaderContainer} ${classname}`;
  return (
    <div className={containerClassName}>
      <div className={styles.loaderWrapper} style={style}>
        {isComponent ? (
          <div className={styles.loader}>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
          </div>
        ) : (
          <div className={styles.loader}>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
          </div>
        )}

        {/* <p>Please wait ...</p> */}
      </div>
    </div>
  );
};

export default Loader;
