import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from './taskTypes';

const initialState: { task: TaskType } = {
  task: {
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
    comments: [
      {
        id: '',
        message: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '',
        taskId: '',
        children: [],
        parentId: '',
      },
    ],
  },
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
