import { request } from 'undici';

export const post = <T>(url: string, data: T) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
