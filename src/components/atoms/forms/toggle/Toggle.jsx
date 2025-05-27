import React, { useEffect, useId, useState } from 'react';
import styles from './Toggle.module.scss';
import Label from '../label/Label';

const Toggle = ({
  label,
  required,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  style,
  disabled = false,
  onToggleChange,
  left = false,
  ...props
}) => {
  const id = useId();
  const [toggleValue, setToggleValue] = useState(value);

  useEffect(() => {
    setToggleValue(value);
  }, [value]);

  const handleToggleChange = () => {
    if (disabled) return;

    const newValue = !toggleValue;
    setToggleValue(newValue);
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    }
    if (onToggleChange) {
      onToggleChange(newValue);
    }
  };

  return (
    <div className={`${styles['toggle-container']}`} style={style}>
      {label && left && (
        <Label
          text={label}
          required={required}
          htmlFor={id}
          classname={styles['label-space']}
        />
      )}
      <div
        className={`${styles['toggle-wrapper']} ${
          error && touched ? styles['toggle-error'] : ''
        }`}
      >
        <div
          className={`${styles.toggle} ${styles.inOut} ${
            toggleValue ? styles['toggle-on'] : styles['toggle-off']
          } ${disabled ? styles['toggle-disabled'] : ''}`}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
          onClick={handleToggleChange}
          onBlur={onBlur}
          {...props}
        >
          <div
            className={styles['toggle-handle']}
          >
            <span
            ></span>
          </div>
        </div>
      </div>
      {label && !left && (
        <Label
          text={label}
          required={required}
          htmlFor={id}
          classname={styles['label-space']}
        />
      )}
      {error && touched && (
        <div className={styles['error-message']}>{error}</div>
      )}
    </div>
  );
};

export default Toggle;
