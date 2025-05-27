import React, { useEffect, useState } from 'react';
import styles from './Input.module.scss';
import Label from '../../label/Label';
import { useId } from 'react';
import { svgMap } from '../../../../../helpers/render-icon/svgMap';
import { getIn } from 'formik';
const Input = ({
  label,
  required,
  svgType,
  name,
  formik,
  style,
  autoComplete,
  inputType,
  disabled,
  actionImg,
  inputClassname,
  maxLength,
  ...props
}) => {
  const id = useId();

  const formikValue = getIn(formik?.values, name);
  const formikError = getIn(formik?.errors, name);
  const formikTouched = getIn(formik?.touched, name);

  const [inputValue, setInputValue] = useState(formikValue ?? '');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (formikValue !== undefined) {
      setInputValue(formikValue);
    }
  }, [formikValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    const nonSpaceChars = newValue.replace(/\s/g, '');

    if (!maxLength || nonSpaceChars.length <= maxLength) {
      setInputValue(newValue);

      // Call Formik handler if available
      if (formik && name) {
        formik.handleChange(event);
      }

      // Also allow external onChange if passed manually
      if (props.onChange) {
        props.onChange(event);
      }
    }
  };

  const handleBlur = (event) => {
    if (formik && name) {
      formik.handleBlur(event);
    }

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <div className={styles['input-container']} style={style}>
      {label && <Label text={label} required={required} htmlFor={id} />}
      <div
        className={`${styles['input-wrapper']} ${
          formikError && formikTouched ? styles['input-error'] : ''
        } ${inputClassname ?? ''}`}
      >
        <div className={`${styles['img-input-cont']}`}>
          {svgType && (
            <img className={styles.svg} src={svgMap?.[svgType]} alt={svgType} />
          )}
          <input
            id={id}
            name={name}
            type={
              inputType === 'password'
                ? showPassword
                  ? 'text'
                  : 'password'
                : inputType
            }
            className={styles.input}
            placeholder={`Enter ${label}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputValue}
            autoComplete={autoComplete}
            disabled={disabled}
            {...props}
          />
        </div>
        {actionImg ? actionImg : null}
      </div>
      {formikError && formikTouched && (
        <div className={styles['error-message']}>{formikError}</div>
      )}
    </div>
  );
};

export default Input;
