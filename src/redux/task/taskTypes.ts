import { CommentType } from '../comment/commentsTypes';

export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  inProcess: string;
  finishAt: Date;
  priority: string;
  status: string;
  file: string;
  columnId: string;
  subtasks: Subtask[];
  comments: CommentType[];
};

export type Subtask = {
  id: string;
  description: string;
  done: boolean;
  taskId: string;
};
