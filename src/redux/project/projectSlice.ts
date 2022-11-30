import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskInitialState } from '../task/taskSlice';
import { Project } from './projectTypes';

const initialState: { project: Project } = {
  project: {
    id: '',
    title: '',
    columns: [
      {
        id: '',
        title: '',
        projectId: '',
        tasks: [taskInitialState],
      },
    ],
  },
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<{ project: Project }>) => {
      state.project = action.payload.project;
    },
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
