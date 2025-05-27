import React from 'react';
import styles from './FormLinks.module.scss';
import Input from '../../../../../atoms/forms/input/input/Input';
import { svgMap } from '../../../../../../helpers/render-icon/svgMap';
import Button from '../../../../../atoms/forms/button/Button';

const FormLinks = ({ formikProps }) => {
  const linksConfig = [
    {
      key: 'devops',
      svgType: 'devops',
      title: 'Devops',
      fields: ['frontend', 'backend'],
    },
    {
      key: 'github',
      svgType: 'gitHub',
      title: 'Github',
      fields: ['frontend', 'backend'],
    },
    {
      key: 'figmaDesign',
      svgType: 'figmaFile',
      title: 'Figma Design',
      fields: ['name', 'url'],
      addMore: true,
    },
    {
      key: 'figmaPrototype',
      svgType: 'figma',
      title: 'Prototype',
      fields: ['name', 'url'],
      addMore: true,
    },
  ];

  const handleAddMore = (key) => {
    const newEntry =
      key === 'figmaDesign' || key === 'figmaPrototype'
        ? { name: '', url: '' }
        : { frontend: '', backend: '' };

    formikProps.setFieldValue(`links.${key}`, [
      ...(formikProps.values.links[key] || []),
      newEntry,
    ]);
  };

  return (
    <div className={styles.links}>
      {linksConfig.map((item) => (
        <div className={styles.cont} key={item.key}>
          <div className={styles['img-cont']}>
            <img src={svgMap[item.svgType]} alt={item.title} />
            <p>{item.title}</p>
          </div>
          {formikProps.values.links[item.key]?.map((link, idx) => (
            <div className={styles.fields} key={idx}>
              {item.fields.map((field) => (
                <Input
                  key={field}
                  formik={formikProps}
                  label={
                    field.charAt(0).toUpperCase() +
                    field.slice(1) +
                    (item.key === 'figmaDesign' || item.key === 'figmaPrototype'
                      ? ''
                      : ' Url')
                  }
                  name={`links.${item.key}[${idx}].${field}`}
                  svgType="link"
                />
              ))}
              {idx !== 0 && (
                <div className={styles['variant-action']}>
                  <img
                    src={svgMap?.['deleteIcon']}
                    onClick={() => {
                      const updatedVariants = formikProps.values.links[
                        item.key
                      ].filter((_, i) => i !== idx);
                      formikProps.setFieldValue(
                        `links.${item.key}`,
                        updatedVariants
                      );
                    }}
                    className={styles.icon}
                    alt="Delete"
                  />
                </div>
              )}
            </div>
          ))}
          {item.addMore && (
            <div className={styles.button}>
              <Button
                label="Add More"
                onClick={() => handleAddMore(item.key)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormLinks;
