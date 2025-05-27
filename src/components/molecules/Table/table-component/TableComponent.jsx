import React, { useEffect, useState } from 'react';
import {
  RenderTableBody,
  RenderTableHeader,
} from './Components';
import styles from './Table.module.scss';
import { useFetch } from '../../../../hooks/useFetch';
import TableFilters from './TableFilters';
import Paginator from '../paginator/Paginator';

//actions: for edit functionality we pass hasEdit:{func}
//additional buttons : if u want to add new buttons to the right side in filter component OR add icons in the last column
//handleDelete is inside RenderTableBody : where we have to pass the api with post
const TableComponent = ({
  //required, rowKey == id (ex: =userId,groupId..) , inside table component use item[rowKey] instead of id
  rowKey,
  headerData,
  externalData,
  actions = {
    hasEdit: {
      //this for edit function,just handle it from parent
      func: null,
    },
    onRowClick: {
      //this for row click
      hasRowClick: false,
      func: null,
    },
  },
  //add foreignState: true , if the button do functionality related to selectedItems state
  filterButtons = [],
  rowButtons = [],
  api,
  isRefetch,
  noPadding,
  handleExport,
  handleUploadCSV,
  filterData = [],
  filter,
  isFormResponse,
  isKnowledgeBase,
  exportApi,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);
  const [hasIsLoading, setHasIsLoading] = useState(false);
  const [query, setQuery] = useState(
    !headerData?.hasPaging
      ? api?.get?.params ?? {}
      : {
          // Include additional params from API prop
          pageSize: 10,
          pageNumber: 1,
          ...(api?.get?.params || {}),
        }
  );

  useEffect(() => {
    // Update query when API params change dynamically
    //u can send it as {botId:value}
    if (api?.get?.params) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        ...api.get.params,
      }));
    }
  }, [api?.get?.params]);

  const {
    data: urlData,
    refetch: refetchData,
    isFetching,
  } = useFetch(
    [api?.get?.queryKey, query],
    api?.get?.url,
    {
      enabled: api?.get?.url !== null && api?.get?.url !== undefined,
    },
    query,
    hasIsLoading ? api?.get?.refetchInterval : false
  );

  useEffect(() => {
    if (urlData?.data?.items?.some((item) => item.isLoading)) {
      setHasIsLoading(true);
    }
  }, [urlData]);

  useEffect(() => {
    if (externalData) {
      setData(externalData);
    } else {
      if (urlData?.data?.items) {
        if (isFormResponse) {
          setData(
            urlData?.data?.items?.map((item) => {
              const formDetails = item.formDetails?.reduce((acc, i) => {
                acc[i.fieldLabel] = i.value;
                return acc;
              }, {});

              return {
                ...formDetails,
                createdOn: item.createdOn,
              };
            })
          );
        } else {
          setData(urlData?.data?.items);
        }
      } else {
        setData(urlData?.data);
      }
    }
  }, [externalData, urlData]);

  const totalPages = Math.ceil(
    urlData?.data?.totalCount / urlData?.data?.pageSize
  );
  const hasData = data?.length > 0 || urlData?.data?.totalCount;

  const handlePageChange = (page) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageNumber: page,
    }));
  };
  useEffect(() => {
    if (isRefetch !== null && isRefetch !== undefined) refetchData();
  }, [isRefetch]);


  return (
    <div className={`${styles.cont} ${noPadding ? styles.wider : ''}`}>
      <TableFilters
        headerData={headerData}
        setQuery={setQuery}
        query={query}
        selectedItems={selectedItems}
        filterButtons={filterButtons}
        rowKey={rowKey}
        handleExport={handleExport}
        handleUploadCSV={handleUploadCSV}
        filterData={filterData}
        filter={filter}
        data={data}
        exportApi={exportApi}
      />
      <div className={styles['table-wrapper']}>
        <div className={styles['table-scroll-container']}>
          <table className={styles['table-container']}>
            <RenderTableHeader
              headerData={headerData}
              setQuery={setQuery}
              query={query}
              rowKey={rowKey}
              rowButtons={rowButtons}
            />
            <RenderTableBody
              headerData={headerData}
              data={data}
              actions={actions}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              rowButtons={rowButtons}
              hasData={hasData}
              rowKey={rowKey}
              api={api}
              refetch={refetchData}
              isFetching={isFetching}
              isKnowledgeBase={isKnowledgeBase}
            />
          </table>
        </div>
      </div>
      {headerData?.hasPaging &&
      urlData?.data?.totalCount > 0 &&
      data?.length > 0 &&
      totalPages !== 1 ? (
        <Paginator
          onPageChange={handlePageChange}
          currentPage={query.pageNumber}
          totalPages={totalPages}
        />
      ) : null}
    </div>
  );
};

export default TableComponent;
