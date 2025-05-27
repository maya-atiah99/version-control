import React, { useState, useId } from 'react';
import styles from './SearchInput.module.scss';
import Label from '../../label/Label';
import searchIcon from '../../../../../assets/images/input/search.svg';
const SearchInput = ({
  label,
  placeholder = 'Search',
  name,
  value = '',
  onChange,
  onBlur,
  classname,
  style,
  disabled,
  props,
}) => {
  const id = useId();

  const [initialValue, setInitialValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInitialValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  return (
    <div className={styles['search-input-container']} style={style}>
      {label ? <Label text={label} htmlFor={id} /> : null}
      <div className={`${styles['input-wrapper']} ${classname ?? ''}`}>
        <img src={searchIcon} />
        <input
          id={id}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          value={initialValue}
          disabled={disabled}
          {...props}
        />
      </div>
    </div>
  );
};

export default SearchInput;
