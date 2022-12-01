import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from './commentsTypes';

export const commentInitialState: CommentType = {
  id: '',
  message: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '',
  taskId: '',
  children: [],
  parentId: '',
};

export const initialState: { comments: CommentType[] } = {
  comments: [commentInitialState],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ comments: CommentType[] }>
    ) => {
      state.comments = action.payload.comments;
    },
    addLocalComment: (
      state,
      action: PayloadAction<{ comment: CommentType }>
    ) => {
      state.comments.push(action.payload.comment);
    },
    updateLocalComment: (
      state,
      action: PayloadAction<{ commentId: string; message: string }>
    ) => {
      state.comments.map((comment) => {
        if (comment.id === action.payload.commentId)
          return (comment.message = action.payload.message);
      });
    },
    removeLocalComment: (
      state,
      action: PayloadAction<{ commentId: string }>
    ) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload.commentId
      );
    },
  },
});

export const {
  setComments,
  addLocalComment,
  updateLocalComment,
  removeLocalComment,
} = commentSlice.actions;

export default commentSlice.reducer;
