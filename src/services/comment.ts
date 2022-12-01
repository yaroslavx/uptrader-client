import { makeRequest } from './makeRequest';

type CommentRequest = {
  taskId: string;
  message?: string;
  parentId?: string;
  id?: string;
};

export function createComment({ taskId, message, parentId }: CommentRequest) {
  return makeRequest(`tasks/${taskId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  });
}

export function updateComment({ taskId, message, id }: CommentRequest) {
  return makeRequest(`tasks/${taskId}/comments/${id}`, {
    method: 'PUT',
    data: { message },
  });
}

export function deleteComment({ taskId, id }: CommentRequest) {
  return makeRequest(`tasks/${taskId}/comments/${id}`, {
    method: 'DELETE',
  });
}
