import React from 'react';
import TableComponent from '../../../components/molecules/Table/table-component/TableComponent';
import Container from '../../../components/hoc/container/Container';
import * as tableHeader from './factory/emailHeader';
import { useNavigate } from 'react-router-dom';

const EmailTemplatePage = () => {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/edit-email-template/${item.id}`);
  };

  const filterButtons = [
    {
      type: 'button',
      label: 'Add New',
      svgType: 'add',
      func: () => navigate('/new-email-template'),
    },
  ];

  return (
    <Container>
      <TableComponent
        rowKey="id"
        headerData={tableHeader.headerData}
        externalData={[
          {
            name: 'When student submit the request',
            emailType: 'Reminder',
            attachment: 'Yes',
            application: 'Course Withdrawal',
            status: true,
            id: '1',
          },
        ]}
        actions={{
          hasEdit: {
            func: handleEdit,
          },
        }}
        filterButtons={filterButtons}
      />
    </Container>
  );
};

export default EmailTemplatePage;
