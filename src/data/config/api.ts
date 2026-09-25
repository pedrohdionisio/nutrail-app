import axios from 'axios';
import { sleep } from 'shared/utils/sleep';
import { env } from './env';

export const api = axios.create({
  baseURL: env.apiUrl
});

if (__DEV__ && env.requestDelayMs > 0) {
  api.interceptors.request.use(async (config) => {
    await sleep(env.requestDelayMs);

    return config;
  });
}
