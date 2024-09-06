import { useState, useEffect } from 'react';
import axios from 'axios';
import token from './token.js';

function StarRating({ id }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
    const [isFirstRating, setIsFirstRating] = useState(true); // Новое состояние

    useEffect(() => {
        // При загрузке компонента проверяем, был ли отправлен рейтинг
        checkExistingRating();
    }, []);

    useEffect(() => {
        if (isRatingSubmitted && rating > 0) {
            submitRating();
            setIsRatingSubmitted(false);
        }
    }, [rating, isRatingSubmitted]);

    const checkExistingRating = async () => {
        try {
            const response = await axios.get(
                `https://ash2521.pythonanywhere.com/cars/${id}/details/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.stars) {
                setIsFirstRating(false); // Рейтинг уже существует, значит PATCH
                setRating(response.data.stars); // Устанавливаем текущий рейтинг
            }
        } catch (error) {
            console.log("Рейтинг не найден, будет использоваться POST:", error.response?.data || error.message);
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (rating > 0) {
                await submitRating();
            } else {
                console.log("Выберите рейтинг перед отправкой.");
            }
        }
    };

    const handleClick = (index) => {
        setRating(index);
        setIsRatingSubmitted(true);
    };

    const submitRating = async () => {
        if (rating < 1 || rating > 5) {
            console.error("Рейтинг должен быть от 1 до 5 звезд.");
            return;
        }

        try {
            const url = `https://ash2521.pythonanywhere.com/cars/${id}/details/`;
            const method = isFirstRating ? 'post' : 'patch'; // Выбираем метод запроса
            const response = await axios({
                method,
                url,
                data: {
                    stars: rating,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Рейтинг отправлен:", response.data);
            if (isFirstRating) {
                setIsFirstRating(false); // После первого POST меняем на PATCH
            }
        } catch (error) {
            console.error("Ошибка при отправке рейтинга:", error.response?.data || error.message);
        }
    };

    return (
        <div
            className="flex items-center mb-4"
            tabIndex="0"
            onKeyDown={handleKeyDown}
        >
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
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleClick(starIndex)}
                    >
                        <path
                            d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.334 24 12 19.897 4.666 24 6 15.27l-6-5.847 8.332-1.268z"/>
                    </svg>
                );
            })}
        </div>
    );
}

export default StarRating;
