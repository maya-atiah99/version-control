// Authentication
export const authenticationEndpoints = {
  getLoginDataBySubDomain: (url) => `/Company/GetLoginDataBySubDomain/${url}`,
  validateToken: () => '/auth/validate',
  login: () => '/auth/login',
};

