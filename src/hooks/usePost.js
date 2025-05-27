import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { cleanToken } from '../helpers/utils';
const postData = async (
  url,
  data = null,
  method = 'post',
  isFormData = false,
  requiresAuth = true
) => {
  const headers = {
    ...(requiresAuth &&
      localStorage.getItem('token') && {
        Authorization: `Bearer ${cleanToken(localStorage.getItem('token'))}`,
      }),
    ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
  };

  const config = {
    method,
    // url: `${base_url}${url}`,
    url: `${url}`,

    data,
    headers,
  };

  return axios(config)
    .then((res) => res)
    .catch((err) => err.response);
};

export const usePost = (options = {}) => {
  // const toast = useToast();
  return useMutation({
    mutationFn: async ({
      data = null,
      method = 'post',
      isFormData = false,
      requiresAuth = true,
      url,
    }) => postData(url, data, method, isFormData, requiresAuth),
    onSuccess: () => {
      if (options.onSuccessToast) {
        toast.open(options.onSuccessToast, options.toastType);
      }
    },
    onError: () => {
      if (options.onErrorToast) {
        toast.open(options.onErrorToast, 'error');
      } else {
        toast.open('Something went wrong', 'error');
      }
    },
    ...options,
  });
};
