import React from 'react';
import styles from './Checkbox.module.scss';
import Label from '../label/Label';
import Checkbox from './Checkbox';

const CheckboxGroup = ({
  label,
  name,
  selectedValues = [],
  onChange,
  options = [],
  error,
  column = false,
  disabled,
}) => {
  const handleChange = (value, checked) => {
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);
    onChange(newValues);
  };

  return (
    <div className={styles['checkbox-group']}>
      {label && <Label text={label} />}
      <div
        className={`${styles['checkbox-wrapper']} ${
          column ? styles['column-layout'] : ''
        }`}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            name={name}
            ischecked={selectedValues.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            isDisabled={disabled}
          />
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
