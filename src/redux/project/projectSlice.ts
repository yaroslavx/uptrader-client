import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Column } from './projectTypes';

const initialState: { project: Project } = {
  project: {
    id: '',
    title: '',
    columns: [
      {
        id: '',
        title: '',
        projectId: '',
        tasks: [
          {
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
        ],
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
