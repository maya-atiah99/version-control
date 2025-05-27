import React from 'react';
import styles from './NoData.module.scss';
import nodataImage from './NoData.svg';
const NoData = ({ text }) => {
  return (
    <div className={`${styles['cont']} `}>
      <img src={nodataImage} alt="no data" />
      <p>No {text ? text : 'Data'} Available</p>
    </div>
  );
};

export default NoData;
