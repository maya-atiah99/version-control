import React, { useState, useEffect } from 'react';

import styles from './RadioGroup.module.scss';
import Label from '../label/Label';
import { useBrandingContext } from 'app-context/BrandingsContext';
import SvgWithBranding from 'component/hoc/branding/withBrandingColor.hoc';

export const RadioButton = ({ label, name, value, checked, onChange }) => {
  const { brandingData } = useBrandingContext();
  const { page_TextColor, page_FontStyle, page_ButtonColor } = brandingData;

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--primary-color',
      page_ButtonColor
    );
  }, [page_ButtonColor]);

  return (
    <div className={styles['radio-button']}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{
          accentColor: page_ButtonColor,
          border: `1px solid ${page_ButtonColor}`,
        }}
      />
      {label ? (
        <label
          htmlFor={value}
          className={styles['radio-label']}
          style={{ color: page_TextColor, fontStyle: page_FontStyle }}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

const RadioGroup = ({
  name,
  selectedValue,
  onChange,
  label,
  options,
  error,
  column,
  onEdit,
  onDelete,
  variant,
}) => {
  return (
    <div className={`${styles['radio-group']} ${variant}`}>
      {label ? <Label text={label} /> : null}
      <div
        className={`${styles['options-wrapper']} ${
          column ? styles.wrapper : ''
        }`}
      >
        {options.map((option) => {
          return (
            <div className={styles['radio-container']}>
              <RadioButton
                key={option.value}
                label={option.label}
                name={name}
                value={option.value}
                checked={selectedValue == option.value}
                onChange={onChange}
              />
              {onEdit || onDelete ? (
                <div className={styles['variant-action']}>
                  {onEdit ? (
                    <SvgWithBranding
                      type="edit"
                      className={styles.icon}
                      onClick={() => onEdit(option)}
                    />
                  ) : null}
                  {onDelete ? (
                    <SvgWithBranding
                      type="delete_table"
                      className={styles.icon}
                      onClick={onDelete}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {error ? <p className={'error-message'}>{error}</p> : null}
    </div>
  );
};

export default RadioGroup;
