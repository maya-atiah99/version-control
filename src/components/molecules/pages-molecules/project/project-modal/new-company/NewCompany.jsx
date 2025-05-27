import React from 'react';
import Modal from '../../../../../hoc/modal/Modal';
import Input from '../../../../../atoms/forms/input/input/Input';
import Select from '../../../../../atoms/forms/select/select/Select';
import { useFormik } from 'formik';
import styles from '../ProjectModal.module.scss';
import * as Yup from 'yup';
import DatePickerForm from '../../../../../atoms/forms/datepicker-form/DatePickerForm';
const Form = ({ formik }) => {
  return (
    <form
      className="form-cont"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Input
        label="Company Name"
        name="name"
        formik={formik}
        required
        svgType="folder"
      />
      <Input label="Url" name="url" formik={formik} required svgType="folder" />
      <Input
        label="Email"
        name="email"
        formik={formik}
        required
        svgType="emailInput"
      />{' '}
      <div className={styles.section}>
        <Input
          label="Plan"
          name="plan"
          formik={formik}
          required
          svgType="folder"
        />{' '}
        <Input
          label="Consumption"
          name="consumption"
          formik={formik}
          required
          svgType="hashtag"
        />{' '}
      </div>
      <div className={styles.section}>
        {' '}
        <Select
          label="Environment"
          name="environment"
          formik={formik}
          required
          svgType="link"
        />
        <DatePickerForm
          label="Date joined"
          name="dataJoined"
          formik={formik}
          required
          svgType="calender"
        />
      </div>
    </form>
  );
};
const NewCompany = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    url: Yup.string().required('Url is Required'),
    email: Yup.string().required('Email is Required'),
    plan: Yup.string().required('plan is Required'),
    consumption: Yup.string().required('consumption is Required'),
    environment: Yup.string().required('environment is Required'),
    dateJoined: Yup.string().required('Date Joined is Required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onClose();
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <Modal
        title="Add Company "
        isOpen={isOpen}
        onClose={onClose}
        modalContent={{
          component: <Form formik={formik} />,
        }}
        onSubmit={formik.handleSubmit}
        buttonType="submit"
        onSubmitStyles={{
          onSubmit: {
            label: 'Save',
            type: 'save',
          },
        }}
      />
    </div>
  );
};

export default NewCompany;
