import React, { useState } from 'react';
import Container from '../../../../hoc/container/Container';
import { svgMap } from '../../../../../helpers/render-icon/svgMap';
import styles from './ProjectHeader.module.scss';
import Tooltip from '../../../../Custom/tooltip/Tooltip';
import Tab from '../../../../atoms/Tabs/Tab';
import NewDeployment from '../project-modal/new-deployment/NewDeployment';
import ConfirmationModal from '../../../../hoc/confirmation-modal/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';
const ProjectHeader = ({ data, activeTab, setActiveTab }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {};

  const handleEdit = () => {
    navigate(`/edit-project/${id}`);
  };

  const dataLinks = [
    {
      svgType: 'devops',
      tooltip: 'Devops',
    },
    {
      tooltip: 'GitHub',
      svgType: 'gitHub',
    },
    {
      tooltip: 'Figma File',
      svgType: 'figmaFile',
    },
    {
      tooltip: 'Figma',
      svgType: 'figma',
    },
  ];

  const tabArray = [
    {
      svgType: 'production',
      label: 'Production',
      key: 0,
    },
    { svgType: 'staging', label: 'Staging', key: 1 },
    { svgType: 'testing', label: 'Testing', key: 2 },
    {
      svgType: 'customerList',
      key: 3,
      label: 'Customer List',
    },
  ];

  const rightButtons = [
    {
      type: 'icon',
      svgType: 'editIcon',
      func: handleEdit,
      iconTooltip: 'Edit Project',
    },
    {
      type: 'icon',
      svgType: 'deleteIcon',
      func: () => setIsDeleteModalOpen(true),
      iconTooltip: 'Delete Project',
      red: true,
    },
  ];

  if (activeTab !== 2 && activeTab !== 3) {
    rightButtons.unshift({
      type: 'button',
      label: 'New Deployment',
      svgType: 'add',
      func: () => setIsModalOpen(true),
    });
  }

  const header = {
    title: data?.name,
    leftItems: (
      <div className={styles.dataLinks}>
        {dataLinks?.map((item) => (
          <Tooltip content={item.tooltip} key={item.svgType}>
            <img
              src={svgMap[item.svgType]}
              onClick={() =>
                window.open(
                  'https://www.figma.com/design/vFQRUWBpQhw1dY610ZUG4h/CTS-Version-control?node-id=5052-17141&m=dev',
                  '_blank',
                  'rel=noopener noreferrer'
                )
              }
            />
          </Tooltip>
        ))}
      </div>
    ),
  };

  return (
    <>
      <Container header={header} rightButtons={rightButtons}>
        <Tab
          tabs={tabArray}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NewDeployment isOpen={isModalOpen} onClose={handleClose} />
      </Container>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleClose}
        onSubmit={handleDelete}
        closeOnSubmit={true}
        onApproveButton={{ text: 'delete' }}
        text="Delete"
        type="delete"
      />
    </>
  );
};

export default ProjectHeader;
