export const headerData = {
  tableName: 'Users',
  hasSearch: true,
  hasEdit: false,
  hasDelete: false,
  fields: [
    {
      fieldName: 'version',
      headerName: 'Version',
      isVersion: true,
    },
    {
      fieldName: 'branch',
      headerName: 'Branch',
      isBranch: true,
    },
    {
      fieldName: 'notes',
      headerName: 'Notes',
    },
    {
      fieldName: 'publishedOn',
      headerName: 'Published On',
      isDatetime: true,
    },
  ],
};
export const customerListHeader = {
  tableName: 'Users',
  hasSearch: true,
  hasEdit: true,
  hasDelete: true,
  fields: [
    {
      fieldName: 'companyName',
      headerName: 'Company Name',
    },
    {
      fieldName: 'url',
      headerName: 'Url',
    },
    {
      fieldName: 'email',
      headerName: 'Email',
    },
    {
      fieldName: 'plan',
      headerName: 'Plan',
    },
    {
      fieldName: 'consumptions',
      headerName: 'Consumptions',
    },
    {
      fieldName: 'dateJoined',
      headerName: 'date Joined',
      isDatetime: true,
    },
    {
      fieldName: 'status',
      headerName: 'Status',
      isSwitch: true,
    },
  ],
};
