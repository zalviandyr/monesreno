import axios from 'axios';
import { UserData } from './UserData';

export const AxiosService = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: 'Bearer ' + UserData.getToken(),
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

AxiosService.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // if not login or bad something happen
    if (err.response.status === 403) {
      UserData.clear();
      // reload to force call the guardian of route
      window.location.reload();
    }

    return Promise.reject(err);
  }
);
