import { useState } from 'react';
import axios from 'axios';

function CommentSection({ carId }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await submitComment();
        }
    };

    const submitComment = async () => {
        try {
            const response = await axios.post(
                `https://ash2521.pythonanywhere.com/cars/${carId}/details/`,
                {
                    comments: [
                        {
                            comment_text: comment,  // Измените это имя поля в соответствии с API
                            rating: rating
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzU4NjM1LCJpYXQiOjE3MjUxODU4MzUsImp0aSI6ImM4YmM0Y2EyMjdjZjQyNWU4MWJiYTY5NDgzNzQyZWYwIiwidXNlcl9pZCI6Mn0.r49sPBGa7D7GfPt-Sfj9PpsPHzmMxZ8BBq6yNQu34v4`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Комментарий отправлен:", response.data);
            setComment(""); // Очистить поле после отправки
        } catch (error) {
            console.error("Ошибка при отправке комментария:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h3 className="text-white text-xl mb-4">Комментарии</h3>
            <div className="relative max-w-xl">
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => {
                        const starIndex = index + 1;
                        return (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                                    starIndex <= (hoverRating || rating) ? 'text-white' : 'text-gray-500'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHoverRating(starIndex)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.334 24 12 19.897 4.666 24 6 15.27l-6-5.847 8.332-1.268z" />
                            </svg>
                        );
                    })}
                </div>
                <input
                    type="text"
                    placeholder="Оставить комментарий"
                    className="bg-gray-800 text-white w-full p-3 rounded-lg focus:outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
                    onClick={submitComment}
                >
                    <svg width="24" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#1b77d2"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
