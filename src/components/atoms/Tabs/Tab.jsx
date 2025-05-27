import React from 'react';
import styles from './Tab.module.scss';
import { svgMap } from '../../../helpers/render-icon/svgMap';
const Tab = ({ tabs, activeTab, setActiveTab, grid }) => {
  return (
    <div
      className={`${styles['tabs-container']} ${
        grid ? styles['grid'] : ''
      }`}
    >
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`${styles.tab} ${
            activeTab === tab.key ? styles.active : ''
          }`}
        >
          <img src={svgMap[tab.svgType]} />
          <p>{tab.label}</p>
        </div>
      ))}
    </div>
  );
};
export default Tab;
