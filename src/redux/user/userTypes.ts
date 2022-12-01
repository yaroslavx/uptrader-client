import { CommentType } from '../comment/commentsTypes';

export type UserType = {
  id: string;
  name: string;
  comments?: CommentType[];
};
