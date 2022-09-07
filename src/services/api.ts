import axios from 'axios';
import { fetchToken } from '../auth';
import { FIXABLY_API_URL } from '../constants';

// TODO: improve this
const token = await fetchToken();

export const api = axios.create({
  headers: {
    'X-Fixably-Token': token || 'EMPTY_TOKEN',
  },
  baseURL: FIXABLY_API_URL,
});
