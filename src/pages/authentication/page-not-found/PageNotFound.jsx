import React from 'react';
import styles from './PageNotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/atoms/forms/button/Button';
import image from '../../../assets/images/notFound/notFound.svg';
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['page-container']}>
      <img src={image} alt="image" />
      <Button onClick={() => navigate(-1)} label="Back Home" />
    </div>
  );
};

export default PageNotFound;
