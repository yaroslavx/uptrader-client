import { makeRequest } from './makeRequest';

type TaskRequest = {
  projectId: string;
  columnId: string;
  taskId: string;
  status?: string;
};

// export const getTasks = () => {
//   return makeRequest('/tasks');
// };

// export function getTask(id: string) {
//   return makeRequest(`/tasks/${id}`);
// }

export function updateTaskStatus({ taskId, status }: TaskRequest) {
  return makeRequest(`tasks/changeStatus/${taskId}`, {
    method: 'PUT',
    data: { status },
  });
}
