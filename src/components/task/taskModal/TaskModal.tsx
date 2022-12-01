import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useAsyncFn } from "../../../hooks/useAsync"
import { selectComments } from "../../../redux/comment/commentsSelector"
import { addLocalComment, setComments } from "../../../redux/comment/commentsSlice"
import { CommentType } from "../../../redux/comment/commentsTypes"
import { useAppDispatch } from "../../../redux/store"
import { selectTask } from "../../../redux/task/taskSelector"
import { setUser } from "../../../redux/user/userSlice"
import { UserType } from "../../../redux/user/userTypes"
import { createComment } from "../../../services/comment"
import CommentForm from "./commentForm/CommentForm"
import CommentList from "./commentList/CommentList"
import './taskModal.scss'

export type TaskModalProps = {
    close: () => void
}

type commentsByParentIdType = {
    [key: string | number]: CommentType[]
}

const TaskModal = ({ close }: TaskModalProps) => {
    console.log('Rerender from TaskModal')

    const dispatch = useAppDispatch()
    const { task } = useSelector(selectTask)
    useEffect(() => {
        if (task?.comments == null) return;
        dispatch(setComments({ comments: task.comments }))
    }, [task?.comments]);

    const { comments } = useSelector(selectComments)

    const commentsByParentId: commentsByParentIdType = useMemo(() => {
        if (comments == null) return {};
        const group: commentsByParentIdType = {};
        comments.forEach((comment) => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment);
        });
        return group;
    }, [comments]);

    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment as any);

    function onCommentCreate(message: string) {
        return createCommentFn({ taskId: task.id, message }).then(
            (comment: CommentType & { user: UserType }) => {
                dispatch(addLocalComment({
                    comment: {
                        id: comment.id,
                        message: comment.message,
                        createdAt: comment.createdAt,
                        updatedAt: comment.updatedAt,
                        userId: comment.userId,
                        taskId: comment.taskId,
                        children: comment.children,
                        parentId: comment.parentId,
                    }
                })); dispatch(setUser({ user: comment.user }))
            }

        )
    }
    return (
        <div onClick={close} className='task_modal_container'>
            <div onClick={e => e.stopPropagation()} className="task_modal">
                <div>
                    <>
                        <h1>{task.title}</h1>
                        <article>{task.description}</article>
                        <div className="subtasks">{task.subtasks.map(subtask => <div key={subtask.id} className="subtask">{subtask.description}</div>)}</div>
                        <h3 className='comments-title'>Comments</h3>
                        <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} />
                        <section>
                            {commentsByParentId['null'] != null && commentsByParentId['null'].length > 0 && (
                                <div className='mt-4'>
                                    <CommentList comments={commentsByParentId['null']} />
                                </div>
                            )}
                        </section>
                    </>
                </div>
            </div>
        </div>
    )
}

export default TaskModal