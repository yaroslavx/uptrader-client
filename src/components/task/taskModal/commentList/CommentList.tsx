import { useEffect } from "react";
import { setComments } from "../../../../redux/comment/commentsSlice";
import { CommentType } from "../../../../redux/comment/commentsTypes";
import { useAppDispatch } from "../../../../redux/store";
import Comment from "../comment/Comment";

type CommentListProps = {
  comments: CommentType[]
}

const CommentList = ({ comments }: CommentListProps) => {
  return <>
    {comments.map((comment) => (
      <div key={comment.id} className='comment-stack'>
        <Comment {...comment} />
      </div>
    ))}
  </>
};

export default CommentList;
