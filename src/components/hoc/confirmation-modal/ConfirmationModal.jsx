import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../Portal/Portal';
import styles from './ConfirmationModal.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/forms/button/Button';
import warningSvg from '../../../assets/images/modal/warning-alert.svg';
import successSvg from '../../../assets/images/modal/success-alert.svg';
import { svgMap } from '../../../helpers/render-icon/svgMap';
const ConfirmationModal = ({
  isOpen,
  onClose,
  onSubmit,
  route,
  closeOnSubmit,
  children,
  onApproveButton,
  text,
  subText,
  isSuccess,
  timeout,
  isLoading,
  type,
  handleCancel,
}) => {
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (timeout) {
        const timer = setTimeout(() => {
          handleClose();
        }, timeout);

        return () => clearTimeout(timer);
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, timeout]);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
    if (route) {
      document.body.style.overflow = 'auto';
      navigate(route);
    }
    if (closeOnSubmit) handleClose();
  };

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: styles['fade-enter'],
          enterActive: styles['fade-enter-active'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active'],
        }}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className={styles.modal} onClick={handleClose} ref={nodeRef}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {onClose ? (
              <div className={styles.closeButton}>
                <img
                  src={svgMap['closeIcon']}
                  onClick={handleClose}
                  className={styles['exit-img']}
                />
              </div>
            ) : null}
            {isSuccess ? (
              <div className={styles['warning-img']}>
                <img src={successSvg} alt="Warning" />
              </div>
            ) : (
              <div className={styles['warning-img']}>
                <img src={warningSvg} alt="Warning" />
              </div>
            )}

            <div className={styles.textCont}>
              <p className={styles.title}>{text}</p>
              {subText && <p className={styles.subText}>{subText}</p>}
            </div>
            {children}
            {onSubmit ? (
              <div className={styles.actions}>
                <Button
                  label="Cancel"
                  onClick={handleCancel ? handleCancel : handleClose}
                  variant="#B3B5BD"
                />
                <Button
                  label={onApproveButton?.text}
                  variant="#C81111"
                  svgType={type ? type : null}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            ) : null}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default ConfirmationModal;
