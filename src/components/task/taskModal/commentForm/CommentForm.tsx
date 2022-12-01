import { AxiosError } from 'axios';
import React, { FormEvent, ReactNode, useState } from 'react';

type CommentFormProps = {
    loading?: boolean,
    error?: AxiosError,
    onSubmit: (message: string) => Promise<any>,
    autoFocus?: boolean,
    initialValue?: string,
}

const CommentForm = ({
    loading,
    error,
    onSubmit,
    autoFocus = false,
    initialValue = '',
}: CommentFormProps) => {

    console.log('Rerender from CommentForm')

    const [message, setMessage] = useState(initialValue);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(message).then(() => setMessage(''));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='comment-form-row'>
                <textarea
                    autoFocus={autoFocus}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='message-input'
                />
                <button className='btn' disabled={loading} type='submit'>
                    {loading ? 'Loading' : 'Post'}
                </button>
            </div>
            {/* <div className='error-msg'>{error}</div> */}
        </form>
    );
};

export default CommentForm;
