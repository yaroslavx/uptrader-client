import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { FileNode, root } from "../../../assets/comments"
import { useAsync, useAsyncFn } from "../../../hooks/useAsync"
import { selectComments } from "../../../redux/comment/commentsSelector"
import { addLocalComment, setComments } from "../../../redux/comment/commentsSlice"
import { CommentType } from "../../../redux/comment/commentsTypes"
import { useAppDispatch } from "../../../redux/store"
import { selectTask } from "../../../redux/task/taskSelector"
import { createComment } from "../../../services/comment"
import { getTask } from "../../../services/tasks"
import CommentForm from "./commentForm/CommentForm"
import CommentList from "./commentList/CommentList"
import './taskModal.scss'

export type TaskModal = {
    close: () => void
}

// const File: React.FC<FileNode> = ({ id, children }: FileNode) => {
//     const [showChildren, setShowChildren] = useState<boolean>(false);
//     const handleClick = useCallback(() => {
//         setShowChildren(!showChildren);
//     }, [showChildren, setShowChildren])

//     return (
//         <div>
//             <span onClick={handleClick}>
//                 <h4 style={{ fontWeight: showChildren ? 'bold' : 'normal' }}>{id}</h4>
//             </span>
//             <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', left: 25, borderLeft: '1px solid', paddingLeft: 15 }}>
//                 {showChildren && (children ?? []).map((node: FileNode) => <File {...node} />)}
//             </div>
//         </div>
//     )
// }

type commentsByParentIdType = {
    [key: string | number]: CommentType[]
}

const TaskModal: FC<TaskModal> = ({ close }: TaskModal) => {
    const { task } = useSelector(selectTask)
    useEffect(() => {
        if (task?.comments == null) return;
        // setComments(task.comments);
        dispatch(setComments({ comments: task.comments }))

    }, [task?.comments]);

    const { comments } = useSelector(selectComments)

    // const [comments, setComments] = useState<CommentType[]>([]);
    const commentsByParentId: commentsByParentIdType = useMemo(() => {
        if (comments == null) return {};
        const group: commentsByParentIdType = {};
        comments.forEach((comment) => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment);
        });
        return group;
    }, [comments]);

    const dispatch = useAppDispatch()

    // const { rootComments, createLocalComment } = useTask();

    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment as any);

    function onCommentCreate(message: string) {
        return createCommentFn({ taskId: task.id, message }).then(
            (comment: CommentType) => dispatch(addLocalComment({ comment }))
            // (comment: CommentType) => setComments((prevComments) => {
            //     return [comment, ...prevComments];
        )
    }

    return (
        <div onClick={close} className='task_modal_container'>
            <div onClick={e => e.stopPropagation()} className="task_modal">
                <div style={{ marginLeft: 15 }}>
                    <>
                        <h1>{task.title}</h1>
                        <article>{task.description}</article>
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