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

export type CommentType = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  taskId: string;
  children: Comment[];
  parentId: string;
};

export type User = {
  id: string;
  name: string;
  comments: Comment[];
};
