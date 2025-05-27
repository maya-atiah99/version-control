import React, { useRef } from 'react';
import styles from './NewEmail.module.scss';
import Container from '../../../components/hoc/container/Container';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/atoms/forms/input/input/Input';
import Select from '../../../components/atoms/forms/select/select/Select';
import MultiAttachment from '../../../components/atoms/forms/multi-attachment/MultiAttachment';
import TextEditor from '../../../components/atoms/forms/text-editor/TextEditor';
import { Form, Formik } from 'formik';
import { validationSchema } from './factory/validationSchema';

const NewEmail = () => {
  const { id } = useParams();
  const ref = useRef();
  const navigate = useNavigate();

  const initialValues = {
    notificationName: '',
    notificationId: '00000000-0000-0000-0000-000000000000',
    notificationType: '',
    applicationType: '',
    notificationContent: '',
    subject: '',
    emailSignatureId: '',
    attachments: [],
  };

  const handleSubmit = () => {
    ref?.current?.handleSubmit();
  };
  const rightButtons = [
    {
      type: 'button',
      label: id ? 'Update' : 'Save',
      svgType: 'save',
      func: handleSubmit,
      variant: '#C3CC00',
    },
  ];

  return (
    <Container
      header={{
        title: id ? 'Update Email Template' : 'Create Email template',
      }}
      rightButtons={rightButtons}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
        innerRef={ref}
        validateOnMount={true}
      >
        {(formikProps) => (
          <Form>
            <div className={styles['email-cont']}>
              {console.log('Vfvdf', formikProps)}

              <Input
                label="Name"
                name="notificationName"
                placeholder="Enter Email Name"
                svgType="emailInput"
                formik={formikProps}
              />
              <div className={styles['section']}>
                <Select
                  label="Application"
                  name="applicationType"
                  placeholder="Select Application"
                  formik={formikProps}
                  svgType="folder"
                />
                <Select
                  label="Email Type"
                  name="notificationType"
                  placeholder="Select Type"
                  formik={formikProps}
                  svgType="emailInput"
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                placeholder="Enter Subject"
                formik={formikProps}
                svgType="subject"
              />

              <MultiAttachment
                label="Attachment"
                name="attachments"
                placeholder="Add Attachment"
                formik={formikProps}
                svgType="attachmentSvg"
              />
              {/* <TextEditor /> */}
              <Select
                label="Email Signature"
                name="emailSignatureId"
                placeholder="Select Type"
                formik={formikProps}
                svgType="signature"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewEmail;
