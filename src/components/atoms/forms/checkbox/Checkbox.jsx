import React, { useEffect, useId } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({
  label,
  ischecked,
  onChange,
  isDisabled,
  name = '',
  rounded = false,
}) => {
  const id = useId();
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  return (
    <div
      className={`${styles.checkbox}  ${label ? styles['label'] : ''}${
        isDisabled ? styles.checkboxDisabled : ''
      }`}
    >
      <label htmlFor={id} className={`${styles['checkbox-label']}`}>
        <input
          id={id}
          type="checkbox"
          checked={ischecked}
          onChange={(e) => handleCheckboxChange(e)}
          className={styles['checkbox-input']}
          disabled={isDisabled}
          name={name}
        />
        <span
          className={styles['checkbox-square']}
          style={{
            // backgroundColor: ischecked ? page_ButtonColor : '',
            // borderColor: ischecked ? page_ButtonColor : '',
            borderRadius: rounded ? '100px' : '',
            border: `1px solid grey`,
          }}
        />
        <p className={styles.label}>{label}</p>
      </label>
    </div>
  );
};

export default Checkbox;
