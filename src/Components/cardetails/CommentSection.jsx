import { useState } from 'react';
import axios from 'axios';

function CommentSection({ carId }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null); // Состояние для хранения ошибки

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
                    text: comment,
                    user: 2
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
            setError(null); // Очистить ошибку после успешной отправки
        } catch (error) {
            console.error("Ошибка при отправке комментария:", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Ошибка при отправке комментария"); // Установить сообщение об ошибке
        }
    };

    return (
        <div>
            <div className="relative max-w-xl">
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
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Вывод сообщения об ошибке */}
        </div>
    );
}

export default CommentSection;
