import React, { useState } from 'react';
import Container from '../../../components/hoc/container/Container';
import * as tableHeader from './factory/header';
import TableComponent from '../../../components/molecules/Table/table-component/TableComponent';
import { useNavigate } from 'react-router-dom';
const Projects = () => {
  const navigate = useNavigate();
  const rowClick = (item) => {
    navigate(`/project/${item.id}`);
  };
  const handleEdit = (item) => {
    navigate(`/edit-project/${item.id}`);
  };
  const filterButtons = [
    {
      type: 'button',
      label: 'Add Project',
      svgType: 'add',
      func: () => navigate(`/new-project`),
    },
  ];
  return (
    <Container>
      <TableComponent
        rowKey="id"
        headerData={tableHeader.headerData}
        externalData={[
          {
            id: '1',
            project: 'Aiducator',
            frontendVersion: 'V1.6',
            backendVersion: 'V1.9',
            links: 'hi',
          },
          {
            id: '2',
            project: 'Edulytics',
            frontendVersion: 'V1.6',
            backendVersion: 'V1.9',
            links: 'hi',
          },
        ]}
        actions={{
          onRowClick: { hasRowClick: true, func: rowClick },
          hasEdit: {
            func: handleEdit,
          },
        }}
        filterButtons={filterButtons}
      />
    </Container>
  );
};

export default Projects;
