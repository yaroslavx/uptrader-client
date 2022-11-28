import { ProjectStatus } from '../components/tasksColumn/TasksColumn';

export type Data = {
  id: number;
  title: string;
  doneDate: string;
  priority: string;
  status: ProjectStatus;
};

export const data: Data[] = [
  {
    id: 1,
    title: 'Aqua-man',
    doneDate: 'soon',
    priority: 'main',
    status: 'queue',
  },
  {
    id: 2,
    title: 'Batman',
    doneDate: 'soon',
    priority: 'main',
    status: 'queue',
  },
  {
    id: 3,
    title: 'Superman',
    doneDate: 'soon',
    priority: 'main',
    status: 'queue',
  },
  {
    id: 4,
    title: 'Joker',
    doneDate: 'soon',
    priority: 'secondary',
    status: 'development',
  },
  {
    id: 5,
    title: 'Somebody',
    doneDate: 'soon',
    priority: 'secondary',
    status: 'done',
  },
];
