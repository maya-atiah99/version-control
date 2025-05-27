export const headerData = {
  tableName: 'Users',
  hasSearch: true,
  hasDelete: true,
  hasEdit: true,
  hasPaging: true,
  fields: [
    {
      fieldName: 'project',
      headerName: 'First Name',
    },
    {
      fieldName: 'frontendVersion',
      headerName: 'Username',
      isVersion: true,
    },
    {
      fieldName: 'backendVersion',
      headerName: 'Email',
      isVersion: true,
    },
    {
      fieldName: 'links',
      headerName: 'Links',
      isLink: true,
    },
  ],
};
