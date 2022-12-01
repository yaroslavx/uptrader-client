import { IconButton } from '../iconButton/IconButton';
import { FaHeart, FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectProject } from '../../../../redux/project/projectSeleсtor';
import { selectTask } from '../../../../redux/task/taskSelector';
import { selectComments } from '../../../../redux/comment/commentsSelector';
import { CommentType, UserType } from '../../../../redux/comment/commentsTypes';
import { useUser } from '../../../../hooks/useUser';
import CommentForm from '../commentForm/CommentForm';
import { createComment, deleteComment, updateComment } from '../../../../services/comment';
import { useAsync, useAsyncFn } from '../../../../hooks/useAsync';
import CommentList from '../commentList/CommentList';
import { useAppDispatch } from '../../../../redux/store';
import { addLocalComment, removeLocalComment, setComments, updateLocalComment } from '../../../../redux/comment/commentsSlice';
import { getUser } from '../../../../services/user';
import { setUseProxies } from 'immer';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
});

type CommentProps = {
    id: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    taskId: string;
    children: CommentType[];
    parentId: string;
}

const Comment = ({ id, message, userId, createdAt }: CommentProps) => {
    const dispatch = useAppDispatch()
    const { task } = useSelector(selectTask)
    const { comments: commentsByParentId } = useSelector(selectComments)
    const { loading, error, value: user } = useAsync(() => getUser(userId))
    // const [userFromServer, setUserFromServer] = useState<UserType>()
    // useEffect(() => {
    //     if (user) setUserFromServer(user)
    // }, [user])
    // console.log(userFromServer)
    // const {
    //     createLocalComment,
    //     updateLocalComment,
    //     deleteLocalComment,
    // } = usePost();

    // function createLocalComment(comment: CommentType) {
    //     setComments((prevComments) => {
    //         return [comment, ...prevComments];
    //     });
    // }

    // function getReplies(parentId: string) {
    //     return commentsByParentId[parentId];
    // };

    const childComments = commentsByParentId.filter((comment) => comment.parentId === id);
    console.log("childComment", childComments)

    const [areChildrenHidden, setAreChildrenHidden] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const createCommentFn = useAsyncFn(createComment as any);
    const updateCommentFn = useAsyncFn(updateComment as any);
    const deleteCommentFn = useAsyncFn(deleteComment as any);
    const currentUser = useUser();

    function onCommentReply(message: string) {
        return createCommentFn
            .execute({ taskId: task.id, message, parentId: id })
            .then((comment: CommentType) => {
                setIsReplying(false);
                dispatch(addLocalComment({ comment }))
            });
    }

    function onCommentUpdate(message: string) {
        return updateCommentFn
            .execute({ taskId: task.id, message, id })
            .then((comment: CommentType) => {
                setIsEditing(false);
                dispatch(updateLocalComment({ commentId: id, message: comment.message }))
            });
    }

    function onCommentDelete() {
        return deleteCommentFn
            .execute({ taskId: task.id, id })
            .then((comment: CommentType) => dispatch(removeLocalComment({ commentId: comment.id })));
    }

    return (
        <>
            <div className='comment'>
                <div className='header'>
                    <span className='name'>{user && user['name']}</span>
                    <span className='date'>
                        {"time"
                            // dateFormatter.format(createdAt)
                        }
                    </span>
                </div>
                {isEditing ? (
                    <CommentForm
                        autoFocus
                        initialValue={message}
                        onSubmit={onCommentUpdate}
                    // loading={updateComment.loading}
                    // error={updateComment.error}
                    />
                ) : (
                    <div className='message'>{message}</div>
                )}
                <div className='footer'>
                    <IconButton Icon={FaHeart} aria-label='Like'>
                        2
                    </IconButton>
                    <IconButton
                        onClick={() => setIsReplying((prev) => !prev)}
                        isActive={isReplying}
                        Icon={FaReply}
                        aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
                    />
                    {(user && user['id']) === currentUser?.id && (
                        <>
                            <IconButton
                                onClick={() => setIsEditing((prev) => !prev)}
                                isActive={isEditing}
                                Icon={FaEdit}
                                aria-label={isEditing ? 'Cancel Editing' : 'Edit'}
                            />
                            <IconButton
                                // disabled={deleteComment.loading}
                                onClick={onCommentDelete}
                                Icon={FaTrash}
                                aria-label='Delete'
                                color='danger'
                            />
                        </>
                    )}
                </div>
            </div>
            {isReplying && (
                <div className='mt-1 ml-3'>
                    <CommentForm
                        autoFocus
                        onSubmit={onCommentReply}
                        loading={createCommentFn.loading}
                        error={createCommentFn.error}
                    />
                </div>
            )}
            {childComments?.length > 0 && (
                <>
                    <div
                        className={`nested-comments-stack ${areChildrenHidden ? 'hide' : ''
                            }`}
                    >
                        <button
                            className='collapse-line'
                            aria-label='Hide Replies'
                            onClick={() => setAreChildrenHidden(true)}
                        />
                        <div className='nested-comments'>
                            <CommentList comments={childComments} />
                        </div>
                    </div>
                    <button
                        className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
                        onClick={() => setAreChildrenHidden(false)}
                    >
                        Show Replies
                    </button>
                </>
            )}
        </>
    );
};

export default Comment;
