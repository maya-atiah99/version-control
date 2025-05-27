import React from 'react';
import styles from '../../ProjectModal.module.scss';
import Input from '../../../../../../atoms/forms/input/input/Input';
import Select from '../../../../../../atoms/forms/select/select/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../../../../../atoms/forms/text-area/TextArea';
import Button from '../../../../../../atoms/forms/button/Button';
import DatePickerForm from '../../../../../../atoms/forms/datepicker-form/DatePickerForm';

const DeploymentForm = ({ isOpen, onClose, item, setRefetch }) => {
  const validationSchema = Yup.object({
    environment: Yup.string().required('Name is Required'),
    version: Yup.string().required('Email is Required'),
    publishedDate: Yup.string().required('role is Required'),
    releaseNotes: Yup.string().required('role is Required'),
    githubBranch: Yup.string().required('role is Required'),
  });
  const formik = useFormik({
    initialValues: {
      environment: '',
      version: '',
      publishedDate: '',
      releaseNotes: '',
      githubBranch: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onClose();
    },
    enableReinitialize: true,
  });

  return (
    <form
      className="form-cont"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Select
        label="Environment"
        name="environment"
        formik={formik}
        required
        svgType="link"
      />
      <div className={styles.section}>
        {' '}
        <Input
          label="Version"
          name="version"
          formik={formik}
          required
          svgType="folder"
        />
        <DatePickerForm
          label="Published Date"
          name="publishedDate"
          formik={formik}
          required
          svgType="calender"
        />
      </div>

      <TextArea
        label="Release Notes"
        name="releaseNotes"
        formik={formik}
        required
        svgType="note"
      />
      <Input
        label="Github"
        name="name"
        formik={formik}
        required
        svgType="link"
      />

      <div className={styles.footer}>
        <Button label="Cancel" variant="#B3B5BD" onClick={onClose} />
        <Button label="Save" svgType="save" buttonType="submit" />
      </div>
    </form>
  );
};

export default DeploymentForm;
