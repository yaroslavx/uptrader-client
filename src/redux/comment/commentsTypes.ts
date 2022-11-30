export type CommentType = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  taskId: string;
  children: CommentType[];
  parentId: string;
};

export type User = {
  id: string;
  name: string;
  comments: CommentType[];
};
