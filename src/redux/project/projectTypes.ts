import { TaskType } from '../task/taskTypes';

export type Project = {
  id: string;
  title: string;
  columns: Column[];
};

export type Column = {
  id: string;
  title: string;
  projectId: string;
  tasks: TaskType[];
};
