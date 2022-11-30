import { makeRequest } from './makeRequest';

export const getProjects = () => {
  return makeRequest('/projects');
};

export const getProject = (id: string | undefined) => {
  return makeRequest(`/projects/${id}`);
};
