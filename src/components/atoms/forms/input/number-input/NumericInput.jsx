import React, { useEffect, useState } from 'react';
import styles from './NumericInput.module.scss';
import Label from '../../label/Label';
import { useId } from 'react';

const NumericInput = ({
  label,
  placeholder,
  required,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  style,
  disabled,
  step = 1,
  min = 0,
  max = 100,
  actionImg,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || 0);
  const id = useId();

  useEffect(() => {
    setInputValue(value || 0);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) onChange(event);
  };

  return (
    <div className={styles['numeric-input-container']} style={style}>
      {label && <Label text={label} required={required} htmlFor={id} />}
      <div
        className={`${styles['input-wrapper']} ${
          error && touched ? styles['input-error'] : ''
        }`}
      >
        <div className={styles['numeric-input-inner']}>
          <input
            id={id}
            name={name}
            type="number"
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            step={step}
            min={min}
            max={max}
            {...props}
          />
        </div>
      </div>
      {error && touched && (
        <div className={styles['error-message']}>{error}</div>
      )}
    </div>
  );
};

export default NumericInput;
