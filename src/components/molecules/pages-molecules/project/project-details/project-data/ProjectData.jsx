import React, { useState } from 'react';
import Container from '../../../../../hoc/container/Container';
import Tab from '../../../../../atoms/Tabs/Tab';
import TableComponent from '../../../../Table/table-component/TableComponent';
import NewCompany from '../../project-modal/new-company/NewCompany';
import * as tableHeader from './factory/headerData';

const ProjectData = ({ projectActiveTab }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (item) => {
    setIsModalOpen(true);
  };

  const tabArray =
    projectActiveTab !== 3
      ? [
          {
            svgType: 'frontendConfig',
            label: 'Frontend History',
            key: 0,
          },
          { svgType: 'backendConfig', label: 'Backend History', key: 1 },
          { svgType: 'files', label: 'Files', key: 2 },
        ]
      : [
          {
            svgType: 'production',
            label: 'Production',
            key: 0,
          },
          { svgType: 'staging', label: 'Staging', key: 1 },
        ];

  const filterButtons = [
    {
      type: 'button',
      label: 'Add Company',
      svgType: 'add',
      func: () => setIsModalOpen(true),
    },
  ];

  const rowButtons = [
    {
      type: 'icon',
      svgType: 'send',
      iconTooltip: 'Send Release Email',
      func: () => setIsModalOpen(true),
    },
  ];

  return (
    <div>
      <Container>
        <Tab
          tabs={tabArray}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TableComponent
          rowKey="userId"
          headerData={
            projectActiveTab !== 3
              ? tableHeader?.headerData
              : tableHeader?.customerListHeader
          }
          externalData={
            projectActiveTab !== 3
              ? [
                  {
                    version: 'v1.62',
                    branch: 'feature/update-82',
                    notes: 'maya@gmail.com',
                    publishedOn: '2025-02-03T09:21:00',
                  },
                  {
                    version: 'v1.62',
                    branch: 'feature/update-82',
                    notes: 'maya@gmail.com',
                    publishedOn: '2025-02-03T09:21:00',
                  },
                  {
                    version: 'v1.62',
                    branch: 'feature/update-82',
                    notes: 'maya@gmail.com',
                    publishedOn: '2025-02-03T09:21:00',
                  },
                  {
                    version: 'v1.62',
                    branch: 'feature/update-82',
                    notes: 'maya@gmail.com',
                    publishedOn: '2025-02-03T09:21:00',
                  },
                ]
              : [
                  {
                    companyName: 'Vital source',
                    url: 'vital.aiducator.ae',
                    email: 'vital@gmail.com',
                    plan: 'Free Trial',
                    consumptions: '10,0000',
                    dateJoined: '2025-02-03T09:21:00',
                    status: true,
                  },
                  {
                    companyName: 'Vital source',
                    url: 'vital.aiducator.ae',
                    email: 'vital@gmail.com',
                    plan: 'Free Trial',
                    consumptions: '10,0000',
                    dateJoined: '2025-02-03T09:21:00',
                    status: false,
                  },
                  {
                    companyName: 'Vital source',
                    url: 'vital.aiducator.ae',
                    email: 'vital@gmail.com',
                    plan: 'Free Trial',
                    consumptions: '10,0000',
                    dateJoined: '2025-02-03T09:21:00',
                    status: true,
                  },
                ]
          }
          actions={{
            hasEdit: {
              func: handleEdit,
            },
          }}
          filterButtons={projectActiveTab === 3 ? filterButtons : []}
          rowButtons={projectActiveTab !== 3 ? rowButtons : []}
        />
        <NewCompany isOpen={isModalOpen} onClose={handleClose} />
      </Container>
    </div>
  );
};

export default ProjectData;
