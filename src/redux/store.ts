import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import project from './project/projectSlice';
import task from './task/taskSlice';
import comments from './comment/commentsSlice';
import user from './user/userSlice';

const store = configureStore({
  reducer: {
    project,
    task,
    comments,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
