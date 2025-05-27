import React from 'react';
import styles from './ProjectConfig.module.scss';
import Container from '../../../../../hoc/container/Container';
import { svgMap } from '../../../../../../helpers/render-icon/svgMap';
const ProjectConfig = ({ data }) => {
  console.log('procdscsdcsdcject', data?.environments);
  const environment = data?.environments;
  const details = [
    {
      title: 'Frontend',
      svgType: 'frontendConfig',
      links: {
        url: environment?.frontend?.apiUrl,
        server: environment?.frontend?.server,
        ipAddress: environment?.frontend?.ipAddress,
      },
    },
    {
      title: 'Backend',
      svgType: 'backendConfig',

      links: {
        url: environment?.backend?.apiUrl,
        server: environment?.backend?.server,
        ipAddress: environment?.backend?.ipAddress,
        database: environment?.backend?.database,
      },
    },
  ];

  return (
    <div className={styles.cont}>
      {details?.map((item, index) => (
        <Container className={styles.details} key={index}>
          <div className={styles['url_details']}>
            <img src={svgMap[item.svgType]} />
            <h3>{item.title}</h3>
          </div>

          <div className={styles['url_sub_details']}>
            {Object.entries(item.links).map(([key, value], i) => (
              <div key={i} className={styles.url}>
                <p>{key}</p>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </Container>
      ))}
    </div>
  );
};

export default ProjectConfig;
