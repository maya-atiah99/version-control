import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.scss';
import { useNavigate } from 'react-router-dom';
import Portal from '../Portal/Portal';
import RenderIcon from '../../../helpers/render-icon/RenderIcon';
import Button from '../../atoms/forms/button/Button';
import { svgMap } from '../../../helpers/render-icon/svgMap';
const Modal = ({
  isOpen,
  onClose,
  title,
  modalContent, //component:form ,
  onSubmit, //component-form ->onSubmit
  route,
  onSubmitStyles, // {labe,type,variant,opicBackground} for button
  isLoading,
  classname,
  children,
  isHtml,
  showCancel = true,
}) => {
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

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
  };
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);
  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={150}
        classNames={{
          enter: styles['fade-enter'],
          enterActive: styles['fade-enter-active'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active'],
        }}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className={styles['modal-overlay']}>
          <div
            ref={nodeRef}
            className={`${styles['modal-content']} ${classname || ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles['title-container']}>
              <p className={styles['page-title']}>{title}</p>
              <img
                src={svgMap?.['closeIcon']}
                onClick={handleClose}
                className={styles['exit-img']}
              />
            </div>
            <div className={styles.horizantalLine}></div>
            {modalContent?.subtitle && (
              <div className={styles['sub-title']}>
                {modalContent?.subtitle ? (
                  <p>{modalContent?.subtitle}</p>
                ) : null}
              </div>
            )}

            <div className={styles.content}>
              {modalContent?.component}
              {isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: children }} />
              ) : (
                children
              )}
            </div>
            {modalContent?.component ? (
              <div className={styles.footer}>
                {showCancel && (
                  <Button
                    onClick={handleClose}
                    label="Cancel"
                    variant="#B3B5BD"
                  />
                )}
                <Button
                  onClick={handleSubmit}
                  label={onSubmitStyles?.onSubmit.label || 'Submit'}
                  svgType={onSubmitStyles?.onSubmit.type}
                  isLoading={isLoading}
                  variant={onSubmitStyles?.onSubmit.variant}
                />
              </div>
            ) : null}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
