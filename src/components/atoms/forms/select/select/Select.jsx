import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Select.module.scss';
import Label from '../../label/Label';
import Loader from '../../../loader/Loader';
import { svgMap } from '../../../../../helpers/render-icon/svgMap';

const Select = ({
  formik,
  label,
  placeholder,
  name,
  onChange,
  style,
  svgType,
  disabled,
  isLoading,
  classname,
  selectClassname,
  options,
  onSelectLabel,
  isClear = true,
  additionalIcon,
  ...props
}) => {
  const formikValue = formik?.values?.[name];
  const formikError = formik?.errors?.[name];
  const formikTouched = formik?.touched?.[name];

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const sourceOptions = options;
  const handleSelect = useCallback(
    (newValue) => {
      setIsOpen(false);
      setSearchTerm('');
      const selectedLabel = sourceOptions.find(
        (option) => option.value === newValue
      )?.label;

      if (props.onChange) {
        onChange({
          target: {
            name,
            value: newValue,
          },
        });
      }

      // Call onSelectLabel with the label of the selected option, if provided
      if (onSelectLabel && selectedLabel) {
        onSelectLabel(selectedLabel);
      }
    },
    [name, props.onChange, sourceOptions, onSelectLabel]
  );

  const filteredOptions = useMemo(
    () =>
      (sourceOptions || [])
        .filter((option) =>
          option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((option) => ({
          value: option.value,
          label: option.label,
        })),
    [sourceOptions, searchTerm]
  );

  const selectedOption = useMemo(
    () => filteredOptions.find((option) => option.value === formikValue),
    [filteredOptions, formikValue]
  );

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const { width, height, top, left } =
        containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.offsetHeight || 200;
      const spaceBelow = window.innerHeight - (top + height);
      const spaceAbove = top;
      setDropdownStyle({
        width: `${width}px`,
        top:
          spaceBelow < dropdownHeight && spaceAbove > dropdownHeight
            ? `${top - dropdownHeight + window.scrollY}px`
            : `${top + height + window.scrollY}px`,
        left: `${left + window.scrollX}px`,
        // color: page_TextColor,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScrollOutside, true);
      window.addEventListener('resize', handleResize);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOutside, true);
      window.removeEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOutside, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);
  return (
    <div
      className={`${styles['select-container']} ${classname ?? ''}`}
      style={style}
      ref={containerRef}
    >
      <div className={styles.labelCont}>
        {label && <Label text={label} htmlFor={`select-${name}`} />}
        {typeof additionalIcon === 'function'
          ? additionalIcon()
          : additionalIcon}
      </div>

      <div
        className={`${styles['select-wrapper']} ${
          disabled ? styles.disabled : ''
        } ${formikError && formikTouched ? styles['input-error'] : ''}${
          selectClassname ?? ''
        }`}
        tabIndex={0}
        aria-controls={`select-dropdown-${name}`}
        aria-expanded={isOpen}
        onClick={disabled ? () => {} : () => setIsOpen(!isOpen)}
      >
        <div className={styles['select-display']}>
          {svgType && (
            <img className={styles.svg} src={svgMap?.[svgType]} alt={svgType} />
          )}
          <input
            id={`select-${name}`}
            type="text"
            ref={inputRef}
            value={
              isOpen
                ? searchTerm
                : selectedOption
                ? selectedOption.label
                : `Select ${label}`
            }
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Select ${label}`}
            className={`${styles['select']} ${
              !selectedOption && !searchTerm
                ? styles['placeholder']
                : styles['has-value']
            }`}
            readOnly={!isOpen}
            style={{
              color: !selectedOption && !searchTerm ? '#757575' : 'black',
            }}
          />
          {isLoading ? (
            <div className={styles.loader}>
              <Loader style={{ width: '15px', height: '15px' }} isComponent />
            </div>
          ) : (
            <img
              className={styles.icon}
              src={svgMap?.['dropdownArrow']}
              alt="arrow"
            />
          )}
        </div>

        {isOpen &&
          createPortal(
            <div
              className={`${styles['options']} ${styles['dropdown-animation']}`}
              style={dropdownStyle}
              ref={dropdownRef}
              onScroll={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions?.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles['option']} ${
                      option.value === formikValue ? styles['selected'] : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className={styles['no-data']}>No Data</div>
              )}
            </div>,
            document.body
          )}
      </div>
      {formikError && formikTouched && (
        <div className={styles['error-message']}>{formikError}</div>
      )}
    </div>
  );
};

export default Select;
