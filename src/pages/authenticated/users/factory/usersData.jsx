export const headerData = {
  tableName: 'Users',
  hasSearch: true,
  hasDelete: true,
  hasEdit: true,
  hasPaging: true,
  fields: [
    {
      fieldName: 'fullName',
      headerName: 'First Name',
    },
    {
      fieldName: 'username',
      headerName: 'Username',
    },
    {
      fieldName: 'displayEmail',
      headerName: 'Email',
    },
    {
      fieldName: 'roleName',
      headerName: 'Role',
      hasSort: true,
    },

    {
      fieldName: 'status',
      headerName: 'Status',
      hasSort: true,
      isSwitch: true,
    },
  ],
};
