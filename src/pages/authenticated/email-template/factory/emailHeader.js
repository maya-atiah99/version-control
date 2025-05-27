export const headerData = {
  tableName: 'Users',
  hasSearch: true,
  hasDelete: true,
  hasEdit: true,
  hasPaging: true,
  fields: [
    {
      fieldName: 'name',
      headerName: 'Name',
    },
    {
      fieldName: 'emailType',
      headerName: 'Email Type',
    },
    {
      fieldName: 'attachment',
      headerName: 'Attachment',
    },
    {
      fieldName: 'application',
      headerName: 'Application',
    },

    {
      fieldName: 'status',
      headerName: 'Status',
      hasSort: true,
      isSwitch: true,
    },
  ],
};
