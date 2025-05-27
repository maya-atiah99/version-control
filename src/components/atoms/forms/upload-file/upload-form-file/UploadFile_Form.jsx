import React, { useRef, useState } from 'react';
import styles from './UploadFile_Form.module.scss';
import Button from '../../button/Button';
import toast from 'react-hot-toast';
import { svgMap } from '../../../../../helpers/render-icon/svgMap';

const UploadFile_Form = ({
  title,
  label = 'Upload',
  name,
  type,
  value,
  onChange,
  error,
  touched,
  onBlur,
  allowedExtensions,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState(value || '');
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const size = type == 'Video' ? '50' : '3';
  const isValidExtension = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!isValidExtension(file.name)) {
        toast.error('Invalid file type. Please upload a valid file.');
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      if (file.size > size * 1024 * 1024) {
        toast.error(`File is too large. Max size is ${size}MB.`);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        return;
      }
      setUploadedFileName(file.name);
      setFilePreview(fileUrl);

      onChange?.({
        target: {
          name,
          value: file,
          preview: fileUrl,
        },
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      if (!isValidExtension(file.name)) {
        toast.error('Invalid file type. Please upload a valid file.');
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setUploadedFileName(file.name);
      setFilePreview(fileUrl);

      onChange?.({
        target: {
          name,
          value: file,
          preview: fileUrl,
        },
      });
    }
  };

  const handleFileRemove = () => {
    setUploadedFileName('');
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }

    onChange?.({
      target: {
        name,
        value: '',
        preview: '',
      },
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles['upload-container']}>
      {title && <h2 className={styles['upload-title']}>{title}</h2>}

      {!uploadedFileName && (
        <div
          className={`${styles['drag-drop-container']} ${
            isDragging ? styles['dragging'] : ''
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Button
            buttonType="button"
            label={label}
            onClick={() => fileInputRef.current?.click()}
            className={styles['button']}
            svgType="attachment"
            variant="#c3cc00"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedExtensions.map((ext) => `.${ext}`).join(',')}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            onBlur={onBlur}
          />
        </div>
      )}

      {uploadedFileName &&
        ((type === 'Video' && filePreview) ||
        (type === 'Image' && filePreview) ? (
          <div className={styles.imageCont}>
            {type == 'Video' ? (
              <video autoPlay loop muted className={styles.video}>
                <source src={filePreview} type="video/mp4" />
              </video>
            ) : (
              <img
                src={filePreview}
                alt="Uploaded Preview"
                className={styles.image}
              />
            )}

            <div className={styles['content-image']} onClick={handleFileRemove}>
              {/* <img src={svgMap?.['closeIcon']} className={styles['exit-img']} /> */}
            </div>
          </div>
        ) : (
          <div className={styles['file-list']}>
            <div className={styles['file-item']}>
              <div className={styles['file-name-container']}>
                <img
                  src="/images/file-icon.svg"
                  alt="File Icon"
                  className={styles['file-icon']}
                />
                <span className={styles['file-name']}>{uploadedFileName}</span>
              </div>
              <img
                className={styles['close-icon']}
                src="/images/close-grey.svg"
                alt="Remove"
                onClick={handleFileRemove}
              />
            </div>
          </div>
        ))}

      {error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UploadFile_Form;
