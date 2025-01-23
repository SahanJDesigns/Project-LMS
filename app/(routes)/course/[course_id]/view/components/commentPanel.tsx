import React from 'react'
import CommentForm from './commentForm';
import { IComment } from '@/types/interface';
import Comment from './comment';

interface CommentPanelProps {
    comments: IComment[];
    setComments: React.Dispatch<React.SetStateAction<any[]>>;
}

function CommentPanel({ comments, setComments }: CommentPanelProps) {
    const handleAddComment = (text: string) => {
        setComments([
            ...comments,
            {
                content: text,
                author: "Anonymous",
                parentComment: undefined,
                replies: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    };

    const handleAddReply = (parentId: number, text: string) => {
        const addReply = (comments: any[]): any[] =>
            comments.map((comment): any => {
                if (comment._id === parentId) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                content: text,
                                author: "Anonymous",
                                parentComment: comment.id,
                                replies: [],
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                        ],
                    };
                }
                return {
                    ...comment,
                    replies: addReply(comment.replies),
                };
            });

        setComments(addReply(comments));
    };
        
    return (
        <div>
            <div className="p-4">
                <h1 className="text-lg font-semibold mb-2">Comments</h1>
                <CommentForm onSubmit={handleAddComment} />
                <div className="flex mt-3 justify-center items-center">
                <div className="bg-gray-100 grid lg:grid-cols-2 rounded-lg w-full">
                    {comments.map((comment:IComment) => (
                        <Comment
                            key={comment.author}
                            comment={comment}
                            onAddReply={handleAddReply}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentPanel