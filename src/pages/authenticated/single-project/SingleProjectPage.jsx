import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from '../../../components/molecules/pages-molecules/project/project-details/ProjectDetails';
import ProjectHeader from '../../../components/molecules/pages-molecules/project/project-header/ProjectHeader';
import styles from './SingleProject.module.scss';

const projects = [
  {
    id: '1',
    name: 'AiDucator',
    environments: {
      frontend: {
        apiUrl: 'https://api.example.com',
        server: 'prod-api-1',
        ipAddress: '192.168.10.10',
      },
      backend: {
        apiUrl: 'https://api.example.com',
        server: 'prod-api-1',
        ipAddress: '192.168.10.10',
        database: 'ecommerce_prod',
      },
    },
  },
  {
    id: '2',
    name: 'Edulytics',
    environments: {
      frontend: {
        apiUrl: 'https://edulytics.example.com',
        server: 'edu-api-1',
        ipAddress: '192.168.10.11',
      },
      backend: {
        apiUrl: 'https://edulytics.example.com/api',
        server: 'edu-api-1',
        ipAddress: '192.168.10.11',
        database: 'edulytics_prod',
      },
    },
  },
  {
    id: '3',
    name: 'DPA',
    environments: {
      frontend: {
        apiUrl: 'https://dpa.example.com',
        server: 'dpa-api-1',
        ipAddress: '192.168.10.12',
      },
      backend: {
        apiUrl: 'https://dpa.example.com/api',
        server: 'dpa-api-1',
        ipAddress: '192.168.10.12',
        database: 'dpa_prod',
      },
    },
  },
  {
    id: '4',
    name: 'AUD',
    environments: {
      frontend: {
        apiUrl: 'https://aud.example.com',
        server: 'aud-api-1',
        ipAddress: '192.168.10.13',
      },
      backend: {
        apiUrl: 'https://aud.example.com/api',
        server: 'aud-api-1',
        ipAddress: '192.168.10.13',
        database: 'aud_prod',
      },
    },
  },
];

const SingleProjectPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const project = projects?.find((i) => i.id === id);
  return (
    <div className={styles.cont}>
      <ProjectHeader
        data={project}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ProjectDetails data={project} activeTab={activeTab} />
    </div>
  );
};

export default SingleProjectPage;
