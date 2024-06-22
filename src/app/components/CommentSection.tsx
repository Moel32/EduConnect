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
            <div className="text-center bg-gray-900 p-6 rounded-lg shadow-lg animate-fadeIn">
                <h2 className="text-3xl font-bold mb-8 text-white">
                    Leave a Comment
                </h2>
                <textarea
                    className="w-full max-w-lg p-4 border-2 border-gray-700 rounded-lg mb-4 text-black focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition duration-300 ease-in-out transform focus:scale-105"
                    rows={5}
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="mt-4">
                    <button
                        className="bg-violet-800 text-white px-6 py-2 rounded-full hover:bg-purple-600 font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        onClick={handleSubmit}
                    >
                        Submit Comment
                    </button>
                </div>
                {successMessage && <p className="text-green-500 mt-4 animate-fadeIn">{successMessage}</p>}
            </div>
        </div>
    );
}

export default CommentSection;
