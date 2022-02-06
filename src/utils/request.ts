import axios from 'axios';
import { message } from 'antd';
import { apiPath, defaultPort } from '@/apis/config';
import type { RequestConfig } from './commonTypes';

export interface RequestError {
  code: string;
  message: string;
}

const basicConfig = {
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};

const request = (config: RequestConfig<any>): Promise<any> => {
  const { api } = config;
  const flag: boolean = /^\//.test(api);
  const finalUrl: string = flag
    ? `${apiPath}:${defaultPort}${api}`
    : `${apiPath}:${defaultPort}/${api}`;

  return new Promise((resolve, reject) => {
    axios({ ...basicConfig, ...config, url: finalUrl })
      .then((response) => {
        const {
          data: { data, code, message },
        } = response;
        if (code === '200') {
          resolve(data);
        } else {
          const err: RequestError = { code, message };
          reject && reject(err);
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  });
};

export default request;
