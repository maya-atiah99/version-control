import React, { useState } from 'react';
import Tab from '../../../../../atoms/Tabs/Tab';
import DeploymentForm from './component/DeploymentForm';
import Modal from '../../../../../hoc/modal/Modal';

const NewDeployment = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabArray = [
    {
      svgType: 'frontendConfig',
      label: 'Frontend',
      key: 0,
    },
    { svgType: 'backendConfig', label: 'Backend', key: 1 },
  ];
  return (
    <Modal title="Add Deployment" isOpen={isOpen} onClose={onClose}>
      <Tab
        tabs={tabArray}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        grid
      />
      <DeploymentForm />
    </Modal>
  );
};

export default NewDeployment;
