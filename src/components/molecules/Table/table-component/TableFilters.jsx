import React, { useState, useMemo } from 'react';
import _debounce from 'lodash/debounce';
// import moreButtonIcon from '../../../../assets/icons/vector/moreButtonIcon.svg';
import styles from './Component.module.scss';
import { useResponsive } from '../../../../assets/styles/breakpoints/breakpoints';
import Button from '../../../atoms/forms/button/Button';
import RenderIcon from '../../../../helpers/render-icon/RenderIcon';
import MoreButton from '../../../atoms/moreButton/MoreButton';
import PopOver from '../../../atoms/moreButton/popOver/PopOver';
import SearchInput from '../../../atoms/forms/input/searchInput/SearchInput';

const TableFilters = ({
  headerData,
  filterButtons,
  handSearchQuery,
  query,
  setQuery,
  selectedItems,
  handleExport = () => {},
  handleUploadCSV = () => {},
  filter,
  data,
}) => {
  const { isMobile, isTablet } = useResponsive();
  const [searchValue, setSearchValue] = useState(query?.searchBy || '');

  const debouncedSearch = useMemo(
    () =>
      _debounce((value) => {
        setQuery({ ...query, searchBy: value });
      }, 500),
    [setQuery, query]
  );

  const handleSearchChange = (name, value) => {
    setSearchValue(value);
    debouncedSearch(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageNumber: 1,
    }));
  };

  const popOverItems = [
    ...(headerData?.hasExport
      ? [
          {
            title: 'Export Table',
            handleFunction: handleExport,
          },
        ]
      : []),
    ...(headerData?.hasUploadCSV
      ? [
          {
            title: 'Upload CSV',
            handleFunction: handleUploadCSV,
          },
        ]
      : []),
  ];

  const dropdownItems = filterButtons
    ?.filter((icon) => !icon.foreignState)
    ?.map((icon) => ({
      title: icon.label || icon.name,
      handleFunction: icon.func,
    }));

  const mergedItems = [...dropdownItems, ...popOverItems];
  return (
    <div className={styles.filterCont}>
      <div className={styles['filter-container']}>
        <div
          className={`${styles.left} ${
            headerData?.hasFilter ? styles.hasFilter : ''
          }`}
        >
          {headerData?.hasFilter && (
            <Select
              options={filter?.options}
              onChange={(e) => filter?.func(e.target.value)}
              value={filter?.value}
              placeholder={filter?.placeholder}
              style={{ width: 'unset', flexDirection: 'unset' }}
            />
          )}
          {headerData?.hasSearch ? (
            <div className={`${headerData?.hasFilter ? styles.search : ''}`}>
              <SearchInput
                onChange={handleSearchChange}
                value={searchValue}
                placeholder="Search"
              />
            </div>
          ) : null}
        </div>
        <div className={styles.right}>
          {filterButtons?.length > 0 ? (
            <>
              {!isMobile &&
                filterButtons &&
                filterButtons
                  ?.filter(
                    (icon) =>
                      icon.foreignState === true && selectedItems.length > 0
                  )
                  ?.map((icon, index) => (
                    <Button
                      label={icon.label}
                      variant={icon.variant}
                      onClick={() => icon.func(selectedItems)}
                      key={index}
                      svgType={icon.svgType}
                    />
                  ))}

              {!isMobile &&
                filterButtons &&
                filterButtons
                  ?.filter((icon) => !icon.foreignState)
                  ?.map((icon, index) =>
                    icon.type === 'icon' ? (
                      <RenderIcon
                        type={icon.name}
                        onClick={icon.func}
                        className={styles.icon}
                        key={index}
                      />
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
                  )}
            </>
          ) : null}

          {headerData?.hasExport || headerData?.hasUploadCSV ? (
            <MoreButton icon="more" toolTipText="More">
              <PopOver stop info={!isMobile ? popOverItems : mergedItems} />
            </MoreButton>
          ) : dropdownItems?.length > 0 && isMobile ? (
            <MoreButton icon="more" toolTipText="More">
              <PopOver stop info={dropdownItems} />
            </MoreButton>
          ) : null}
        </div>
      </div>
      {isMobile && (
        <div className={styles['mobile-actions']}>
          {filterButtons &&
            filterButtons
              ?.filter(
                (icon) => icon.foreignState === true && selectedItems.length > 0
              )
              ?.map((icon, index) => (
                <Button
                  label={icon.label}
                  variant={icon.variant}
                  onClick={() => icon.func(selectedItems)}
                  svgType={icon.svgType}
                  key={index}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default TableFilters;
