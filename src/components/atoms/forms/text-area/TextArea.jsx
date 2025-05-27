import React, { useEffect, useId, useState } from 'react';
import styles from './TextArea.module.scss';
import Label from '../label/Label';
import { svgMap } from '../../../../helpers/render-icon/svgMap';
import Modal from '../../../hoc/modal/Modal';

const TextArea = ({
  label,
  placeholder,
  name,
  value,
  svgType,
  formik,
  onChange,
  onBlur,
  style,
  type,
  disabled,
  error,
  touched,
  isExpanded,
  minHeight,
  ...props
}) => {
  const id = useId();

  const formikValue = formik?.values?.[name];
  const formikError = formik?.errors?.[name];
  const formikTouched = formik?.touched?.[name];

  const [initialValue, setInitialValue] = useState(formikValue ?? '');
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setInitialValue(formikValue ?? '');
  }, [formikValue ?? '']);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setInitialValue(newValue);
    if (formik && name) {
      formik.handleChange(event);
    }
    // Also allow external onChange if passed manually
    if (props.onChange) {
      props.onChange(event);
    }
  };
  const renderTextarea = (min) => {
    return (
      <div
        className={`${styles['textarea-wrapper']} ${
          disabled ? styles.disabled : ''
        }`}
      >
        {svgType && (
          <img className={styles.svg} src={svgMap?.[svgType]} alt={svgType} />
        )}

        <textarea
          id={id}
          name={name}
          className={styles.textarea}
          placeholder={`Enter ${label}`}
          onChange={handleChange}
          onBlur={onBlur}
          style={{ minHeight: min }}
          value={initialValue}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  };
  return (
    <>
      <div className={`${styles['textarea-container']}`} style={style}>
        <div className={`${styles['label-cont']}`}>
          {label ? (
            <Label
              text={label}
              htmlFor={id}
              classname={disabled ? styles['label-disable'] : ''}
            />
          ) : null}

          {isExpanded && initialValue !== '' ? (
            <p style={{ cursor: 'pointer' }} onClick={() => setExpand(true)}>
              Expand
            </p>
          ) : null}
        </div>
        {renderTextarea()}
        {formikError && formikTouched && (
          <div className={styles['error-message']}>{formikError}</div>
        )}
      </div>
      <Modal isOpen={expand} onClose={() => setExpand(false)} title={label}>
        {renderTextarea(minHeight)}
      </Modal>
    </>
  );
};

export default TextArea;
