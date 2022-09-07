import axios from 'axios';
import {
  ONE_MINUTE_IN_MILLISECONDS,
  MAX_TOKEN_LIFESPAN_IN_MINUTES,
} from '../constants';

const FIXABLY_TOKEN_KEY = 'token';
const FIXABLY_TOKEN_EXPIRE_KEY = 'fixablyTokenExpireTime';
const FIXABLY_API_CODE = import.meta.env.VITE_FIXABLY_CODE;

export const fetchToken = async () => {
  if (!isTokenExpired()) {
    return localStorage.getItem(FIXABLY_TOKEN_KEY);
  }

  const bodyRequest = new FormData();
  bodyRequest.append('Code', FIXABLY_API_CODE);

  const response = await axios({
    method: 'post',
    url: 'https://careers-api.fixably.com/token',
    data: bodyRequest,
  });

  saveToken(response.data.token);

  return localStorage.getItem(FIXABLY_TOKEN_KEY);
};

const isTokenExpired = (): boolean => {
  const tokenExpireTime = localStorage.getItem(FIXABLY_TOKEN_EXPIRE_KEY);
  return !tokenExpireTime || new Date() >= new Date(tokenExpireTime);
};

const saveToken = (token: string) => {
  let tokenExpireTime = new Date();
  tokenExpireTime.setMinutes(tokenExpireTime.getMinutes() + 1);

  localStorage.setItem(FIXABLY_TOKEN_KEY, token);
  localStorage.setItem(FIXABLY_TOKEN_EXPIRE_KEY, tokenExpireTime.toString());
};
