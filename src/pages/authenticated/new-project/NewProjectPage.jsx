import React from 'react';
import Input from '../../../components/atoms/forms/input/input/Input';
import NewProjectConfig from '../../../components/molecules/pages-molecules/new-project/project-config/NewProjectConfig';
import Container from '../../../components/hoc/container/Container';
import { Formik, Form } from 'formik';
import validationSchema from './factory/validationSchema';
import styles from './NewProjectPage.module.scss';
import UploadFile_Form from '../../../components/atoms/forms/upload-file/upload-form-file/UploadFile_Form';
const NewProjectPage = () => {
  const initialValues = {
    projectName: '',
    stakeholderEmail: '',
    production: {
      frontend: { url: '', server: '', ipAddress: '' },
      backend: { url: '', server: '', ipAddress: '', database: '' },
    },
    staging: {
      frontend: { url: '', server: '', ipAddress: '' },
      backend: { url: '', server: '', ipAddress: '', database: '' },
    },
    testing: {
      frontend: { url: '', server: '', ipAddress: '' },
      backend: { url: '', server: '', ipAddress: '', database: '' },
    },
    links: {
      devops: [{ backend: '', frontend: '' }],
      github: [{ backend: '', frontend: '' }],
      figmaDesign: [{ name: '', url: '' }],
      figmaPrototype: [{ name: '', url: '' }],
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form Submitted:', values);
      }}
    >
      {(formikProps) => (
        <Form>
          <Container className={styles.cont}>
            <div className={styles.section}>
              <Input
                label="Project Name"
                svgType="folder"
                name="projectName"
                formik={formikProps}
              />
              <UploadFile_Form
                title="Icon"
                type="Image"
                label="Upload SVG"
                allowedExtensions={['svg']}
              />
            </div>
            <div className={styles.section}>
              <Input
                label="Stakeholder Email"
                svgType="folder"
                name="stakeholderEmail"
                formik={formikProps}
              />
            </div>

            <NewProjectConfig formikProps={formikProps} />
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default NewProjectPage;
