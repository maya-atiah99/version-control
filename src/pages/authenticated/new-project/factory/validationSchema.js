import * as Yup from 'yup';

const frontendSchema = Yup.object().shape({
  url: Yup.string().url('Invalid URL').required('Frontend URL is required'),
  server: Yup.string().required('Frontend server is required'),
  ipAddress: Yup.string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(?!$)|$){4}$/,
      'Invalid IP address'
    )
    .required('Frontend IP address is required'),
});

const backendSchema = Yup.object().shape({
  url: Yup.string().url('Invalid URL').required('Backend URL is required'),
  server: Yup.string().required('Backend server is required'),
  ipAddress: Yup.string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(?!$)|$){4}$/,
      'Invalid IP address'
    )
    .required('Backend IP address is required'),
  database: Yup.string().required('Database is required'),
});

const urlItemSchema = Yup.object().shape({
  backendUrl: Yup.string().required('Name is required'),
  frontendUrl: Yup.string().url('Invalid URL').required('URL is required'),
});

const linkItemSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
});

export const validationSchema = Yup.object().shape({
  projectName: Yup.string(),
  stakeholderEmail: Yup.string(),
  production: Yup.object().shape({
    frontend: frontendSchema,
    backend: backendSchema,
  }),
  staging: Yup.object().shape({
    frontend: frontendSchema,
    backend: backendSchema,
  }),
  testing: Yup.object().shape({
    frontend: frontendSchema,
    backend: backendSchema,
  }),
  links: Yup.object().shape({
    devops:urlItemSchema,
    github: urlItemSchema,
    figmaDesign: Yup.array().of(linkItemSchema),
    figmaPrototype: Yup.array().of(linkItemSchema),
  }),
});

export default validationSchema;
