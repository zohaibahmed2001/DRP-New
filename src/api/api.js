import axios from 'axios';
//----
import { API_DOMAIN } from './endpoints';
import { QueryClient } from '@tanstack/react-query';
import { showMessage } from '../utils';
import { KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const queryClient = new QueryClient();

const api = axios.create({
  baseURL: API_DOMAIN,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => res,
  err => {
    const error = err.response;
    console.log('Error in Axios Response Instance: ', error);

    if (error?.status === 500) {
      showMessage({
        type: 'danger',
        message: error?.data?.error || 'Something went wrong please try again',
      });
    }

    if (error?.status === 400 || error?.status === 401) {
      showMessage({
        type: 'danger',
        message: error?.data?.message || 'Something went wrong! Bad Request',
      });
    }

    if (error?.status === 404) {
      showMessage({
        type: 'danger',
        message: 'Request not found!',
      });
    }

    if (error?.status === 403) {
      showMessage({
        type: 'danger',
        message: error?.data?.message || 'Forbidden!',
      });
    }

    return Promise.reject(err);
  },
);

export default api;
