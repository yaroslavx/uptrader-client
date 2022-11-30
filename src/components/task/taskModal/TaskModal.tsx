import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { FileNode, root } from "../../../assets/comments"
import { useAsync, useAsyncFn } from "../../../hooks/useAsync"
import { TaskType } from "../../../redux/project/projectTypes"
import { createComment } from "../../../services/comment"
import { getTask } from "../../../services/tasks"
import { useTask } from "../contexts/TaskContext"
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


const TaskModal: FC<TaskModal> = ({ close }: TaskModal) => {

    const { task, rootComments, createLocalComment } = useTask();
    const {
        loading,
        error,
        execute: createCommentFn,
    } = useAsyncFn(createComment as any);

    function onCommentCreate(message: string) {
        return createCommentFn({ taskId: task.id, message }).then(
            createLocalComment
        );
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
                            {rootComments != null && rootComments.length > 0 && (
                                <div className='mt-4'>
                                    <CommentList comments={rootComments} />
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