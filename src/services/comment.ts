import { makeRequest } from './makeRequest';

type CommentRequest = {
  postId: string;
  message?: string;
  parentId?: string;
  id?: string;
};

export function createComment({ postId, message, parentId }: CommentRequest) {
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  });
}

export function updateComment({ postId, message, id }: CommentRequest) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'PUT',
    data: { message },
  });
}

export function deleteComment({ postId, id }: CommentRequest) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: 'DELETE',
  });
}
