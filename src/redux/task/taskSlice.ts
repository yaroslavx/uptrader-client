import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentInitialState } from '../comment/commentsSlice';
import { TaskType } from './taskTypes';

export const taskInitialState: TaskType = {
  id: '',
  title: '',
  description: '',
  createdAt: new Date(),
  inProcess: '',
  finishAt: new Date(),
  priority: '',
  status: '',
  file: '',
  columnId: '',
  subtasks: [
    {
      id: '',
      description: '',
      done: false,
      taskId: '',
    },
  ],
  comments: [commentInitialState],
};

export const initialState: { task: TaskType } = {
  task: taskInitialState,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      state.task = action.payload.task;
    },
  },
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
