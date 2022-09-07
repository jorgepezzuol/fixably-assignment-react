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

  localStorage.setItem(FIXABLY_TOKEN_KEY, response.data.token);

  return response.data.token;
};

export const isTokenExpired = (): boolean => {
  const tokenExpireMilliseconds = Number(
    localStorage.getItem(FIXABLY_TOKEN_EXPIRE_KEY)
  );

  const nowMilliseconds = new Date().getTime();

  return (
    (tokenExpireMilliseconds - nowMilliseconds) / ONE_MINUTE_IN_MILLISECONDS >=
    MAX_TOKEN_LIFESPAN_IN_MINUTES
  );
};

export const saveTokenExpireTime = () => {
  const fiveMinutesFromNow =
    new Date().getMinutes() +
    MAX_TOKEN_LIFESPAN_IN_MINUTES * ONE_MINUTE_IN_MILLISECONDS;

  localStorage.saveItem(FIXABLY_TOKEN_EXPIRE_KEY, fiveMinutesFromNow);
};
