import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SimilarCars = ({ categoryId, currentCarName }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/?category=${categoryId}`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzU4NjM1LCJpYXQiOjE3MjUxODU4MzUsImp0aSI6ImM4YmM0Y2EyMjdjZjQyNWU4MWJiYTY5NDgzNzQyZWYwIiwidXNlcl9pZCI6Mn0.r49sPBGa7D7GfPt-Sfj9PpsPHzmMxZ8BBq6yNQu34v4`
            }
        })
            .then(response => {
                // Фильтруем машины, чтобы исключить текущую машину по названию
                const filteredCars = response.data.results.filter(car => car.title !== currentCarName);

                // Ограничиваем количество отображаемых машин до 3
                setCars(filteredCars.slice(0, 3));
                console.log(filteredCars);
            })
            .catch(error => {
                console.log(error);
            });
    }, [categoryId, currentCarName]);

    const handleCardClick = (id) => {
        navigate(`/car/${id}`);
    };

    return (
        <div className="text-white p-6">
            <h2 className="text-xl font-bold mb-4">Похожие автомобили</h2>
            <div className="flex justify-between">
                {cars.map((car, index) => (
                    <div key={index} className="p-3 mt-10" onClick={() => handleCardClick(car.id)}>
                        <div className="card-container">
                            <img src={car.img_front} alt={car.name} className="card-image" />
                            <div className="card-gradient-top"></div>
                            <div className="card-info-top">
                                <p className="text-lg">{car.title}</p>
                                <p className="mt-2 text-sm">{car.price} Р/сут.</p>
                            </div>
                            <div className="card-gradient-bottom"></div>
                            <div className="card-info-bottom">
                                <div className="flex justify-between text-xs mt-4">
                                    <span>{car.volume} л.</span>
                                    <span>{car.power} л.с.</span>
                                    <span>{car.year} г.</span>
                                    <span>{car.fuelType}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarCars;
