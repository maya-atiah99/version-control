import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { securityHeaders } from '../helpers/headers';
const API_URL = '';
const fetchData = async (url, params) => {
  const headers = securityHeaders();
  try {
    const validParams =
      params && typeof params === 'object'
        ? Object.fromEntries(
            Object.entries(params).filter(
              ([, value]) =>
                value !== '' && value !== null && value !== undefined
            )
          )
        : null;
    const queryString =
      validParams && Object.keys(validParams).length > 0
        ? Object.entries(validParams)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')
        : '';
    const finalUrl = queryString
      ? `${API_URL}${url}?${queryString}`
      : `${API_URL}${url}`;
    const response = await axios.get(finalUrl, { headers });
    return response;
  } catch (error) {
    if (error.status === 401) {
      if ('/' !== window.location.pathname) {
        localStorage.removeItem('token');
        localStorage.removeItem('AIDucator_userId');
        window.location.href = '/';
      }
    }
    throw error;
  }
};

export const useFetch = (queryKey, url, options = {}, params, interval) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(url, params),
    refetchOnWindowFocus: options.refetchOnWindowFocus || false,
    refetchInterval: interval ? interval : false,
    enabled: options.enabled || true,
    throwOnError:
      options.onError ??
      ((error) => {
        if (401 === error.status) {
          if ('/' !== window.location.pathname) {
            localStorage.removeItem('token');
            localStorage.removeItem('AIDucator_userId');
            window.location.href = '/';
          }
        } else {
          toast.dismiss();
        }
      }),
    ...options,
  });
};
