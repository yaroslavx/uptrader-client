import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import project from './project/projectSlice';
import task from './task/taskSlice';

const store = configureStore({
  reducer: {
    project,
    task,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
