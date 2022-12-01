import { makeRequest } from './makeRequest';

// t

export function getUser(userId: string) {
  return makeRequest(`users/${userId}`);
}
