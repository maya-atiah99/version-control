import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './MultiAttachment.module.scss';
import Label from '../label/Label';
import Button from '../button/Button';
import { svgMap } from '../../../../helpers/render-icon/svgMap';

const MultiAttachment = ({
  label,
  required,
  name,
  svgType,
  formik,
  style,
  autoComplete,
  ...props
}) => {
  const id = useId();
  const fileInputRefs = useRef(null);
  const formikValue = formik?.values?.[name];
  const formikError = formik?.errors?.[name];
  const formikTouched = formik?.touched?.[name];

  const [attachments, setAttachments] = useState(formikValue);

  useEffect(() => {
    if (JSON.stringify(formikValue) !== JSON.stringify(attachments)) {
      setAttachments(formikValue);
    }
  }, [formikValue]);

  const handleFileInputClick = () => {
    fileInputRefs.current.value = null;
    fileInputRefs.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files?.length > 0) {
      const newAttachments = [...attachments, ...files];
      setAttachments(newAttachments);

      if (formik.onChange) {
        formik.onChange({
          target: { name, value: newAttachments },
        });
      }
    }
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    if (formik.onChange) {
      formik.onChange({
        target: { name, value: newAttachments },
      });
    }
  };

  return (
    <div className={styles['input-container']} style={style}>
      {label && <Label text={label} required={required} htmlFor={id} />}
      <div
        className={`${styles['input-wrapper']} ${
          formikError && formikTouched ? styles['input-error'] : ''
        }`}
      >
        {svgType && (
          <img className={styles.svg} src={svgMap?.[svgType]} alt={svgType} />
        )}

        {attachments?.length > 0 ? (
          <div className={styles['attachments']}>
            {attachments?.map((file, index) => (
              <div key={index} className={styles['attachment-item']}>
                <span className={styles['file-name']}>
                  {file.fileName ?? file.name}
                </span>

                <button
                  type="button"
                  className={styles['remove-button']}
                  onClick={() => handleRemoveAttachment(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.placeholder}>Add {label}</p>
        )}
        <input
          id="fileInput"
          name={name}
          type="file"
          className={styles.input}
          onChange={handleFileChange}
          autoComplete={autoComplete}
          multiple
          ref={fileInputRefs}
          {...props}
        />

        <Button
          htmlFor="fileInput"
          className={styles['add-more']}
          svgType="add"
          onClick={handleFileInputClick}
        />
      </div>
      {formikError && formikTouched && (
        <div className={styles['error-message']}>{error}</div>
      )}
    </div>
  );
};

export default MultiAttachment;
