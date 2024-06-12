import React from 'react';

interface CommentSectionProps {
    comment: string;
    setComment: (comment: string) => void;
    handleSubmit: () => void;
    successMessage: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comment, setComment, handleSubmit, successMessage }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Leave a Comment</h2>
                <textarea
                    className="w-full p-4 border rounded mb-4 text-black"
                    rows={5}
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="bg-violet-800 text-white px-6 py-2 rounded hover:bg-blue-600 font-bold"
                    onClick={handleSubmit}
                >
                    Submit Comment
                </button>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            </div>
        </div>
    );
}

export default CommentSection;
