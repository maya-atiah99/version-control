import React from 'react';
import { svgMap } from '../../../../../helpers/render-icon/svgMap';
import Input from '../../../../atoms/forms/input/input/Input';
import styles from './ConfigForm.module.scss';
import FormLinks from './form-links/FormLinks';
const ConfigForm = ({ config, formikProps, activeTab }) => {
  return activeTab !== 'links' ? (
    config?.map((item, index) => {
      return (
        <div key={index} className={styles.frontend}>
          <div className={styles.title}>
            <img src={svgMap[item.svgType]} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
          <div className={styles.fields}>
            {item?.inputs?.map((i) => {
              const fullName = `${activeTab}.${item.title.toLowerCase()}.${
                i.name
              }`;
              return (
                <Input
                  key={i.name}
                  label={i.label}
                  name={fullName}
                  formik={formikProps}
                  svgType={i.svgType}
                />
              );
            })}
          </div>
        </div>
      );
    })
  ) : (
    <FormLinks formikProps={formikProps} />
  );
};

export default ConfigForm;
