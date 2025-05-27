import React, { useState } from 'react';
import styles from './Button.module.scss';
import Loader from '../../loader/Loader';
import RenderIcon from '../../../../helpers/render-icon/RenderIcon';

const Button = ({
  label,
  onClick,
  isLoading,
  className = '',
  buttonType = 'button',
  isDisabled,
  svgType,
  svgClassName,
  variant = null,
  transparent = false,
  width,
  ...props
}) => {
  const [isHover, setIsHovered] = useState(false);

  const renderColor = () => {
    if (variant) {
      if (isHover) {
        return variant;
      }
    }
  };
  const renderBackgroundColor = () => {
    if (variant) {
      if (isHover) {
        return 'transparent';
      } else {
        return variant;
      }
    } else if (transparent) {
      if (isHover) {
        return '#FFFF';
      } else {
        return 'transparent';
      }
    }
  };

  const renderBorderColor = () => {
    if (variant) {
      return variant;
    } else if (transparent) {
      return '#FFFF';
    }
  };

  const customizedStyle = {
    width: width,
    color: renderColor(),
    backgroundColor: renderBackgroundColor(),
    borderColor: renderBorderColor(),
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      style={customizedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={buttonType}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading ? (
        <Loader style={{ width: '20px', height: '21px' }} />
      ) : (
        <>
          {svgType && (
            <span className={styles['text-container']}>
              <RenderIcon
                type={svgType}
                color={isHover ? (variant ? variant : '#0167b1') : '#FFFF'}
                className={`${styles.svg} ${svgClassName}`}
              />
            </span>
          )}
          {label && <p style={{ color: renderColor() }}>{label}</p>}
        </>
      )}
    </button>
  );
};

export default Button;
