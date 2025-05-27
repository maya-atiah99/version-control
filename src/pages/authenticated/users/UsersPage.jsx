import React, { useState } from 'react';
import TableComponent from '../../../components/molecules/Table/table-component/TableComponent';
import Container from '../../../components/hoc/container/Container';
import * as tableHeader from './factory/usersData';
import NewUser from '../../../components/molecules/pages-molecules/users/NewUser';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (item) => {
    setItem(item);
    setIsModalOpen(true);
  };

  const filterButtons = [
    {
      type: 'button',
      label: 'Add New',
      svgType: 'add',
      func: () => setIsModalOpen(true),
    },
  ];

  return (
    <Container>
      <TableComponent
        rowKey="userId"
        headerData={tableHeader.headerData}
        externalData={[
          {
            fullName: 'Maya Atiah',
            username: 'maya',
            displayEmail: 'maya@gmail.com',
            roleName: 'Admin',
            status: true,
            userId: '1',
          },
        ]}
        actions={{
          hasEdit: {
            func: handleEdit,
          },
        }}
        filterButtons={filterButtons}
      />

      <NewUser isOpen={isModalOpen} onClose={handleClose} item={item} />
    </Container>
  );
};

export default UsersPage;
