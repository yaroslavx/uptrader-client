import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from './commentsTypes';

export const commentInitialState: CommentType = {
  id: '',
  message: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: '',
    name: '',
    comments: [],
  },
  taskId: '',
  children: [],
  parentId: '',
};

export const initialState: { comments: CommentType[] } = {
  comments: [commentInitialState],
};

const commentSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ comments: CommentType[] }>
    ) => {
      state.comments = action.payload.comments;
    },
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
