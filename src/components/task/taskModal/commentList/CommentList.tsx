import { CommentType } from "../../../../redux/comment/commentsTypes";
import Comment from "../comment/Comment";

type CommentListProps = {
  comments: CommentType[]
}

const CommentList = ({ comments }: CommentListProps) => {
  console.log('Rerender from CommentList')


  return <>
    {comments.map((comment) => (
      <div key={comment.id} className='comment-stack'>
        <Comment {...comment} />
      </div>
    ))}
  </>
};

export default CommentList;
