import React from 'react';
import Input from '../../../atoms/forms/input/input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../hoc/modal/Modal';
import Select from '../../../atoms/forms/select/select/Select';

const Form = ({ formik }) => {
  
  return (
    <form
      className="form-cont"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Input
        label="Full Name"
        name="name"
        formik={formik}
        required
        svgType="userInput"
      />
      <Input
        label="Email"
        name="email"
        formik={formik}
        required
        svgType="emailInput"
      />
      <Select
        label="Role"
        name="role"
        formik={formik}
        required
        svgType="roleInput"
      />
    </form>
  );
};
const NewUser = ({ isOpen, onClose, item, setRefetch }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().required('Email is Required'),
    role: Yup.string().required('role is Required'),
  });
  const formik = useFormik({
    initialValues: {
      name: item?.fullName || '',
      email: item?.email || '',
      role: item?.roleId || '',
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
        title="New User"
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

export default NewUser;
