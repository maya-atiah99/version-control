import React from 'react';
import styles from './Label.module.scss';

const Label = ({ text, isCursor, style, htmlFor, classname, required }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${isCursor ? styles.hover : ''} ${
        classname ?? ''
      }`}
      style={style}
    >
      {text} {required ? <span style={{ color: 'red' }}>*</span> : null}
    </label>
  );
};

export default Label;
