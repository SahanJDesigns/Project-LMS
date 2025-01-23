import React, { useState } from "react";
import CommentForm from "/commentForm";
import { IComment, IUser } from "@/types/interface";

interface CommentProps {
    comment: IComment;
    onAddReply: (commentId: string, text: string) => void;
    onLike: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onAddReply, onLike }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const author = comment.author as IUser;
    const replies = comment.replies as IComment[];

    return (
        <div className="my-4">
            <div className="flex">
                <img
                    src={author.profilePicture}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div className=" p-3 bg-white rounded-lg">
                    <p className="font-bold">{author.name.firstName} {author.name.lastName}</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="flex space-x-2">
                        <button
                            className="text-blue-500 m-1 text-sm"
                            onClick={() => setShowReplyForm(!showReplyForm)}
                        >
                            Reply
                        </button>
                        <button
                            className="text-blue-500 m-1 text-sm"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? "Hide Replies" : "See More"}
                        </button>
                        <button
                            className="text-blue-500 m-1 text-sm"
                            onClick={() => onLike(comment._id)}
                        >
                            Like
                        </button>
                    </div>
                </div>
            </div>
            {showReplyForm && (
                        <CommentForm
                            placeholder={`Reply to ${author.name.firstName}...`}
                            onSubmit={(text) => {
                                onAddReply(comment._id, text);
                                setShowReplyForm(false);
                            }}
                        />
                    )}

                    {showReplies && (
                        <div className="ml-8">
                            {replies.map((reply) => (
                                <Comment
                                    key={reply._id}
                                    comment={reply}
                                    onAddReply={onAddReply}
                                    onLike={onLike}
                                />
                            ))}
                        </div>
                    )}
        </div>
    );
};

export default Comment;
