import React from 'react';
import styles from './Container.module.scss';
import Button from '../../atoms/forms/button/Button';
import { svgMap } from '../../../helpers/render-icon/svgMap';
import { useResponsive } from '../../../assets/styles/breakpoints/breakpoints';
import MoreButton from '../../atoms/moreButton/MoreButton';
import PopOver from '../../atoms/moreButton/popOver/PopOver';
import Tooltip from '../../Custom/tooltip/Tooltip';
const Container = ({ children, className, header, rightButtons }) => {
  const { isMobile } = useResponsive();

  const dropdownItems = rightButtons?.map((icon) => ({
    title: icon.label || icon.iconTooltip,
    handleFunction: icon.func,
  }));

  return (
    <div className={`${styles.cont} ${className}`}>
      {header && (
        <div className={`${header ? styles.header : ''}`}>
          <div className={styles['title_cont']}>
            <h3>{header?.title}</h3>
            {header?.leftItems}
          </div>
          <div className={styles['title_cont']}>
            {isMobile && rightButtons?.length > 1 ? (
              <MoreButton icon="more" toolTipText="More">
                <PopOver stop info={dropdownItems} />
              </MoreButton>
            ) : (
              rightButtons &&
              rightButtons?.map((icon, index) =>
                icon.type === 'icon' ? (
                  <Tooltip content={icon.iconTooltip} red={icon.red}>
                    <img
                      src={svgMap[icon.svgType]}
                      onClick={icon.func}
                      className={styles.icon}
                    />
                  </Tooltip>
                ) : (
                  <Button
                    label={icon.label}
                    variant={icon.variant}
                    onClick={icon.func}
                    key={index}
                    svgType={icon.svgType}
                    isLoading={icon.isLoading}
                  />
                )
              )
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default Container;
