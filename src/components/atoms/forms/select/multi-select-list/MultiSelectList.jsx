import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './MultiSelectList.module.scss';
import Label from '../../label/Label';
import Checkbox from '../../checkbox/Checkbox';
import SvgWithBranding from 'component/hoc/branding/withBrandingColor.hoc';
import Tooltip from 'component/Custom/tooltip/Tooltip';

const MultiSelectList = ({
  label,
  placeholder,
  name,
  value: initialValue = [],
  onChange,
  style,
  type,
  error,
  touched,
  options,
  config = { hasClear: true, hasPlusBtn: true },
  clearText,
  isLoading,
  isFolder,
  isAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(initialValue) ? initialValue : []
  );
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(20);


  // select a value function
  const handleSelect = useCallback(
    (newValue, newType) => {
      let updatedValues;
      const selectedTypes = selectedValues.map((val) => {
        const option = options.find((opt) => opt.value === val);
        return option ? option.type : null;
      });

      if (newValue === 'all') {
        updatedValues = ['all'];
      } else {
        const hasType1OrTrue =
          selectedTypes.includes(1) || selectedTypes.includes(true);
        const hasTypeFalse = selectedTypes.includes(false);

        if (
          (newType === false && hasType1OrTrue) ||
          ((newType === 1 || newType === true) && hasTypeFalse)
        ) {
          setIsError(true);
          return;
        }

        updatedValues = selectedValues.includes('all')
          ? [newValue]
          : selectedValues.includes(newValue)
          ? selectedValues.filter((val) => val !== newValue)
          : [...selectedValues.filter((val) => val !== 'all'), newValue];
      }

      setSelectedValues(updatedValues);
      if (onChange) {
        onChange({
          target: {
            name,
            value: updatedValues,
          },
        });
      }
    },
    [name, onChange, selectedValues, options]
  );

  // clear values functions
  const handleClear = () => {
    setSelectedValues([]);
    if (onChange) {
      onChange({
        target: {
          name,
          value: [],
        },
      });
    }
  };

  const filteredOptions = useMemo(() => {
    const safeOptions = Array.isArray(options) ? options : [];

    const nonSelectedOptions = safeOptions
      .filter(
        (option) =>
          !selectedValues?.includes(option.value) &&
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.map((option) => ({
        value: option.value,
        label: option.label,
        checked: false,
        type: isFolder ? option.type : false,
      }));

    return nonSelectedOptions.slice(0, visibleItemsCount);
  }, [options, searchTerm, selectedValues, visibleItemsCount]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const { height, top, left, width } =
        inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'absolute',
        width: `${width}px`,
        top: `${top + height + window.scrollY}px`,
        left: `${left + window.scrollX}px`,
        color: page_TextColor,
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
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
  useEffect(() => {
    if (!Array.isArray(initialValue)) return;
    if (JSON.stringify(initialValue) !== JSON.stringify(selectedValues)) {
      setSelectedValues(initialValue);
    }
  }, [initialValue, selectedValues]);

  const handleDropdownScroll = useCallback(() => {
    if (
      dropdownRef.current &&
      dropdownRef.current.scrollTop + dropdownRef.current.clientHeight >=
        dropdownRef.current.scrollHeight - 20
    ) {
      // each time we reach the bottom of the scroll we will add 50 items more
      setVisibleItemsCount((prevCount) => prevCount + 50);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, [3000]);
  }, [isError]);
  return (
    <div className={styles['select-container']} style={style}>
      {label && <Label text={label} htmlFor={`for-${name}`} />}
      <div
        className={styles['select-flex']}
        tabIndex={0}
        aria-controls={`select-dropdown-${name}`}
        aria-expanded={isOpen}
      >
        <div
          className={styles['select-wrapper']}
          onClick={isLoading ? () => {} : () => setIsOpen(!isOpen)}
        >
          <div className={styles['select-display']}>
            {/* {type && (
              <img
                className={styles.svg}
                src={getSvgByType(type)}
                alt={placeholder}
              />
            )} */}
            <input
              id={`select-${name}`}
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target?.value);
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
              autoComplete="off"
              placeholder={placeholder}
              className={`${styles['select']} ${
                !searchTerm && !selectedValues?.length
                  ? styles['placeholder']
                  : ''
              }`}
            />
            {config.hasPlusBtn ? (
              isLoading ? (
                <div className={styles['loader-container']}>
                  {/* <div className={styles.loader}>
                    <Loader
                      style={{ width: "20px", height: "20px" }}
                      isComponent
                    />
                  </div> */}
                </div>
              ) : (
                <SvgWithBranding type="select" className={styles.icon} />
              )
            ) : null}
          </div>

          {isOpen &&
            createPortal(
              <div
                className={`${styles['options']} ${styles['dropdown-animation']}`}
                style={dropdownStyle}
                ref={dropdownRef}
                onScroll={handleDropdownScroll}
              >
                {isAll && (
                  <div
                    className={`${styles['option']} `}
                    onClick={() => {
                      setSelectedValues([
                        '00000000-0000-0000-0000-000000000000',
                      ]);
                      if (onChange) {
                        onChange({
                          target: {
                            name,
                            value: ['all'],
                          },
                        });
                      }
                    }}
                  >
                    <div className={styles['folder-container']}>
                      <p>All </p>
                    </div>
                  </div>
                )}

                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    if (option?.value == 'all') return;
                    return (
                      <div
                        key={option.value}
                        className={`${styles['option']} ${
                          option.checked ? styles['selected'] : ''
                        }`}
                        onClick={() => handleSelect(option.value, option.type)}
                      >
                        {isFolder ? (
                          <div className={styles['folder-container']}>
                            <SvgWithBranding
                              type={
                                option.type === 1
                                  ? 'url'
                                  : option.type === true
                                  ? 'folder'
                                  : 'table-file'
                              }
                              className={styles['icon']}
                            />
                            <p>{option.label}</p>
                          </div>
                        ) : (
                          <Checkbox
                            label={option.label}
                            ischecked={option.checked}
                            onChange={() => handleSelect(option.value)}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles['no-options']}>No data found</div>
                )}
              </div>,
              document.body
            )}
        </div>
        {config.hasClear && clearText && (
          <p onClick={handleClear} className={styles.clear}>
            {clearText}
          </p>
        )}
      </div>

      {selectedValues?.length > 0 && (
        <div className={styles['selected-items-container']}>
          {selectedValues?.length > 0 && (
            <div className={styles['selected-items-container']}>
              {selectedValues?.map((value) => {
                const option = options?.find((opt) => opt.value === value);
                return (
                  option && (
                    <Tooltip content={option.label} placement="top">
                      <div
                        key={option.value}
                        className={styles['selected-item']}
                      >
                        {isFolder && (
                          <SvgWithBranding
                            type={
                              option.label == 'All'
                                ? 'folder'
                                : option.type === 1
                                ? 'url'
                                : option.type === true
                                ? 'folder'
                                : 'table-file'
                            }
                            className={styles['icon']}
                          />
                        )}

                        <p> {option.label}</p>

                        <img
                          src="/images/close-grey.svg"
                          onClick={() => handleSelect(option.value)}
                        />
                      </div>
                    </Tooltip>
                  )
                );
              })}
            </div>
          )}
        </div>
      )}
      {error && touched && <div className={'error-message'}>{error}</div>}
      {isError && (
        <p className="error-message">
          You can't choose folders and files together
        </p>
      )}
    </div>
  );
};

export default MultiSelectList;
