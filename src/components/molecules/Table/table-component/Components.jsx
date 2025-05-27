import React, { useState } from 'react';
import styles from './Component.module.scss';
import RenderIcon from '../../../../helpers/render-icon/RenderIcon';
import Loader from '../../../atoms/loader/Loader';
import NoData from '../NoData/NoData';
import Checkbox from '../../../atoms/forms/checkbox/Checkbox';
import Tooltip from '../../../Custom/tooltip/Tooltip';
import Button from '../../../atoms/forms/button/Button';
import ConfirmationModal from '../../../hoc/confirmation-modal/ConfirmationModal';
import { usePost } from '../../../../hooks/usePost';
import { renderTableData } from '../factory/factory';
import { svgMap } from '../../../../helpers/render-icon/svgMap';

const RenderTableHeader = ({ headerData, setQuery, query, rowButtons }) => {
  const handleSort = (header) => {
    const capitalizeFirstLetter = (header) => {
      return (
        header.fieldName.charAt(0).toUpperCase() + header.fieldName.slice(1)
      );
    };

    setQuery((prevQuery) => {
      const isCurrentSort = prevQuery.desc ?? false;
      return {
        ...prevQuery,
        sortBy: capitalizeFirstLetter(header),
        desc: isCurrentSort ?? false,
      };
    });
  };
  const additionalIconLength = rowButtons?.length || 0;
  return (
    <thead
    // style={{ backgroundColor: addOpacityToColor(page_ButtonColor) }}
    >
      <tr>
        {headerData?.hasCheckbox ? (
          <th
            className={`${
              headerData.isEdge
                ? `${styles['bordered-edge']} ${styles['bordered-edge-header']}`
                : ''
            }`}
          ></th>
        ) : null}
        {headerData?.fields?.map((header) => {
          return (
            <th
              key={header.fieldName}
              className={`${header.isPrimary ? styles['primary-item'] : ''} ${
                headerData.isEdge
                  ? `${styles['bordered-edge']} ${styles['bordered-edge-header']}`
                  : ''
              } `}
            >
              <div className={styles.headerIcon}>
                <p className={styles.headerTitle}>{header.headerName} </p>
                {header.hasSort ? (
                  <img
                    src={svgMap['tableArrow']}
                    className={`${
                      query?.sortBy?.toLowerCase() ===
                      header?.fieldName?.toLowerCase()
                        ? query.desc
                          ? styles['sort-desc']
                          : styles['sort-asc']
                        : styles['icon']
                    } ${
                      query.sortBy === header.fieldName ? styles['active'] : ''
                    }`}
                    onClick={() => header.hasSort && handleSort(header)}
                  />
                ) : null}
              </div>
            </th>
          );
        })}
        {headerData?.hasDelete ||
        headerData?.hasEdit ||
        headerData?.isExpandable ||
        headerData?.hasDefault ||
        additionalIconLength != 0 ? (
          <th
            colSpan={
              additionalIconLength +
              (headerData?.hasDelete ? 1 : 0) +
              (headerData?.hasEdit ? 1 : 0) +
              (headerData?.isExpandable ? 1 : 0) +
              (headerData?.hasDefault ? 1 : 0)
            }
            className={`${
              headerData.isEdge
                ? `${styles['bordered-edge']} ${styles['bordered-edge-header']}`
                : ''
            }`}
          ></th>
        ) : null}
      </tr>
    </thead>
  );
};

const RenderTableBody = ({
  data = [],
  headerData,
  selectedItems,
  setSelectedItems,
  actions,
  onDeleteSuccess, //if u want to pass refetch on success
  rowButtons,
  hasData,
  rowKey,
  api,
  refetch,
  isFetching,
  isKnowledgeBase,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [switchConfirm, setSwitchConfirm] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState(null);

  const [item, setItem] = useState(null);
  const { mutate: Delete, isPending } = usePost({
    onSuccessToast: api?.delete?.toast
      ? api.delete.toast
      : 'Deleted Successfully',
    toastType: 'add',
  });
  const { mutate: Switch } = usePost({
    onSuccessToast: 'Updated Successfully',
    toastType: 'update',
    onErrorToast: api?.toggleToast?.error,
  });
  const additionalIconLength = rowButtons?.length || 0;
  const handleRowClick = (func, item) => {
    if (typeof func === 'function') {
      func(item);
    }
  };

  const handleEdit = (e, func, item) => {
    e.stopPropagation();
    if (func === null) return;
    if (typeof func === 'function') {
      func(item);
    }
  };

  const handleDelete = () => {
    // this is for knowledge base because it has different delete url for folder and file
    const deleteUrl = isKnowledgeBase
      ? item.isFolder
        ? api.delete.url(item[rowKey])
        : api.delete.fileUrl(item[rowKey])
      : api.delete.url(item[rowKey]);

    Delete({ method: 'DELETE', url: deleteUrl }, { onSuccess: refetch });
  };

  const handleAdditionalIcon = (e, func, item) => {
    e.stopPropagation();
    if (func === null) return;
    if (typeof func === 'function') {
      func(item);
    }
  };
  const handleCheckbox = (e) => {
    e.stopPropagation();
  };

  const toggleCheckUser = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems?.includes(itemId)
        ? prevSelectedItems?.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId];

      return newSelectedItems;
    });
  };

  const handleSwitchClick = (id, status) => {
    if (api.toggleConfirm && status) {
      setSelectedSwitch({ id, status });
      setSwitchConfirm(true);
    } else {
      handleSwitch(id, status);
    }
  };

  const handleSwitch = (id, status) => {
    if (api?.toggleUrl) {
      Switch(
        {
          url: api?.toggleUrl(id, !status),
          method: 'Put',
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };
  //this function are for delete functionality
  const handleOpenModal = (e, item) => {
    e.stopPropagation();
    setItem(item);
    setIsDeleteModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleRow = (rowId) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };
  const safeData = Array.isArray(data) ? data : [];

  return (
    <>
      <tbody>
        {isFetching ? (
          <tr style={{ backgroundColor: 'transparent' }}>
            <td
              colSpan={
                headerData?.fields?.length +
                (headerData?.hasCheckbox ? 1 : 0) +
                (headerData?.hasDelete ? 1 : 0) +
                (headerData?.hasEdit ? 1 : 0)
              }
            >
              <Loader isComponent />
            </td>
          </tr>
        ) : !hasData || data?.length == 0 ? (
          <tr
            style={{ backgroundColor: 'transparent' }}
            className={styles.noData}
          >
            <td
              colSpan={
                headerData?.fields?.length +
                (headerData?.hasCheckbox ? 1 : 0) +
                (headerData?.hasDelete ? 1 : 0) +
                (headerData?.hasEdit ? 1 : 0)
              }
            >
              <NoData text={headerData?.tableName} />
            </td>
          </tr>
        ) : (
          safeData?.map((item, index) => {
            const isExpanded = expandedRows.includes(item[rowKey]);

            return (
              <tr
                key={index}
                onClick={() => handleRowClick(actions?.onRowClick?.func, item)}
                style={{
                  cursor: actions?.onRowClick?.hasRowClick
                    ? 'pointer'
                    : 'cursor',
                }}
              >
                {headerData?.hasCheckbox ? (
                  <td
                    className={styles.checkbox}
                    onClick={(e) => handleCheckbox(e)}
                  >
                    {(api?.delete?.blockDelete ? item.roleId !== 0 : true) && (
                      <Checkbox
                        ischecked={selectedItems?.includes(item[rowKey])}
                        onChange={() => toggleCheckUser(item[rowKey])}
                      />
                    )}
                  </td>
                ) : null}

                {headerData?.fields?.map((header, index) => {
                  return (
                    <td
                      key={index}
                      style={{
                        whiteSpace: isExpanded ? 'normal' : 'nowrap', // Wrap text when expanded
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px',
                      }}
                    >
                      {renderTableData({
                        item,
                        header,
                        handleSwitch: handleSwitchClick,
                        rowKey,
                      })}
                    </td>
                  );
                })}

                {headerData?.isExpandable && (
                  <RenderIcon
                    type="arrow" //here name the icon after u define it in svg.data.jsx
                    className={`${styles.icon} ${
                      isExpanded ? styles.up : styles.down
                    }`}
                    onClick={() => toggleRow(item[rowKey])}
                  />
                )}

                {headerData?.hasDelete ||
                headerData?.hasEdit ||
                headerData?.hasDefault ||
                rowButtons?.length > 0 ? (
                  <td
                    colSpan={
                      additionalIconLength +
                      (headerData?.hasDelete ? 2 : 0) +
                      (headerData?.hasEdit ? 2 : 0)
                    }
                  >
                    {/*send type : icon or button   */}

                    <div className={styles.imgCont}>
                      {rowButtons?.length > 0
                        ? rowButtons?.map((icon, index) => {
                            return icon.type == 'icon' ? (
                              icon.iconTooltip ? (
                                <Tooltip content={icon.iconTooltip} key={index}>
                                  <RenderIcon
                                    type={icon.svgType} //here name the icon after u define it in svg.data.jsx
                                    onClick={(e) =>
                                      handleAdditionalIcon(e, icon?.func, item)
                                    }
                                    className={styles.icon}
                                    key={index}
                                  />
                                </Tooltip>
                              ) : (
                                <RenderIcon
                                  type={icon.svgType} //here name the icon after u define it in svg.data.jsx
                                  onClick={(e) =>
                                    handleAdditionalIcon(e, icon?.func, item)
                                  }
                                  className={styles.icon}
                                  key={index}
                                />
                              )
                            ) : (
                              <Button
                                label={icon.label}
                                variant={icon.variant}
                                onClick={(e) =>
                                  handleAdditionalIcon(e, icon?.func, item)
                                }
                                key={index}
                              />
                            );
                          })
                        : null}

                      {(headerData?.hasDelete || headerData?.hasEdit) && (
                        <>
                          {headerData?.hasEdit && (
                            <Tooltip content="Edit">
                              <img
                                src={svgMap?.['editIcon']}
                                onClick={(e) =>
                                  handleEdit(e, actions?.hasEdit?.func, item)
                                }
                                className={styles.icon}
                              />
                            </Tooltip>
                          )}
                          {headerData?.hasDelete && (
                            <Tooltip content="Delete" red>
                              <img
                                src={svgMap?.['deleteIcon']}
                                onClick={(e) => handleOpenModal(e, item)}
                                className={styles.icon}
                              />
                            </Tooltip>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                ) : null}
              </tr>
            );
          })
        )}
      </tbody>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleDelete}
        closeOnSubmit={true}
        onApproveButton={{ text: 'delete' }}
        text="Delete"
        subText={headerData?.deleteSubtext}
        type="delete"
        isLoading={isPending}
      />
      <ConfirmationModal
        isOpen={switchConfirm}
        onClose={() => setSwitchConfirm(false)}
        onSubmit={() => {
          if (selectedSwitch) {
            handleSwitch(selectedSwitch.id, selectedSwitch.status);
          }
          setSwitchConfirm(false);
        }}
        closeOnSubmit={true}
        onApproveButton={{ text: 'confirm' }}
        text="Deactivate"
        subText={api?.toggleToast?.deactivate}
        isLoading={isPending}
      />
    </>
  );
};

export { RenderTableHeader, RenderTableBody };
