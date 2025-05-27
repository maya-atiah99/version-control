import React, { useState } from 'react';
import ConfigForm from './ConfigForm';
import Tab from '../../../../atoms/Tabs/Tab';
import Button from '../../../../atoms/forms/button/Button';
import styles from './ConfigForm.module.scss';

const NewProjectConfig = ({ formikProps }) => {
  const [activeTab, setActiveTab] = useState(0);
  const lastStep = activeTab === 3;
  const tabArray = [
    { svgType: 'production', label: 'Production', key: 0 },
    { svgType: 'staging', label: 'Staging', key: 1 },
    { svgType: 'testing', label: 'Testing', key: 2 },
    { svgType: 'links', label: 'Links', key: 3 },
  ];

  const config = [
    {
      title: 'Frontend',
      svgType: 'frontendConfig',
      inputs: [
        { name: 'url', label: 'URL', svgType: 'link' },
        { name: 'server', label: 'Server', svgType: 'folder' },
        { name: 'ipAddress', label: 'IP Address', svgType: 'hashtag' },
      ],
    },
    {
      title: 'Backend',
      svgType: 'backendConfig',
      inputs: [
        { name: 'url', label: 'URL', svgType: 'link' },
        { name: 'server', label: 'Server', svgType: 'folder' },
        { name: 'ipAddress', label: 'IP Address', svgType: 'hashtag' },
        { name: 'database', label: 'Database', svgType: 'folder' },
      ],
    },
  ];

  const tabKeyMap = {
    0: 'production',
    1: 'staging',
    2: 'testing',
    3: 'links',
  };

  const handleNextAndSave = () => {
    if (!lastStep) {
      setActiveTab((prev) => prev + 1);
    }
  };

  return (
    <>
      <Tab tabs={tabArray} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ConfigForm
        config={config}
        activeTab={tabKeyMap[activeTab]}
        formikProps={formikProps}
      />
      <div className={styles.button}>
        <Button label="Cancel" variant="#B3B5BD" />
        <Button
          label={lastStep ? 'Save' : 'Next'}
          onClick={handleNextAndSave}
        />
      </div>
    </>
  );
};

export default NewProjectConfig;
