export type CommentType = {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  taskId: string;
  children: CommentType[] | [];
  parentId: string;
};
