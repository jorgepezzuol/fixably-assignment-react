import axios from 'axios';
import { fetchToken } from '../auth';
import { FIXABLY_API_URL } from '../constants';

const token = await fetchToken();

export const api = axios.create({
  headers: {
    'X-Fixably-Token': token,
  },
  baseURL: FIXABLY_API_URL,
});
