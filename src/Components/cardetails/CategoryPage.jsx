import { useState, useEffect } from 'react';
import axios from 'axios';
import SimilarCars from './SimilarCars';

const CategoryPage = ({ categoryOfcar, currentCarName }) => {
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://ash2521.pythonanywhere.com/index/');
                // Находим категорию по названию
                const category = response.data.categories.find(cat => cat.title === categoryOfcar);
                if (category) {
                    setCategoryId(category.id);
                }
            } catch (error) {
                console.error('Ошибка при получении данных категорий:', error);
            }
        };

        fetchCategories();
    }, [categoryOfcar]);

    if (categoryId === null) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            {/* Передаем currentCarName в SimilarCars */}
            <SimilarCars categoryId={categoryId} currentCarName={currentCarName} />
        </div>
    );
};

export default CategoryPage;