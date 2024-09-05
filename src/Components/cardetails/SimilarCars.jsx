import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import token from './token.js';

const SimilarCars = ({ categoryId, currentCarName }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/?category=${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const filteredCars = response.data.results.filter(car => car.title !== currentCarName);
                setCars(filteredCars.slice(0, 3));
            })
            .catch(error => {
                console.log(error);
            });
    }, [categoryId, currentCarName]);

    const handleCardClick = (id) => {
        window.scrollTo(0, 0); // Скроллит вверх
        navigate(`/car/${id}`);
    };

    return (
        <div className="text-white p-6">
            <h2 className="text-xl font-bold mb-4">Похожие автомобили</h2>
            <div className="flex justify-between">
                {cars.map((car, index) => (
                    <div
                        key={index}
                        className="p-3 mt-10 h-72 cursor-pointer"
                        onClick={() => handleCardClick(car.id)}
                    >
                        <div className="card-container">
                            <img src={car.img_front} alt={car.name} className="card-image h-96" />
                            <div className="card-gradient-top"></div>
                            <div className="card-info-top flex justify-between w-100">
                                <div>
                                    <p className="text-lg">{car.title}</p>
                                    <p className="mt-2 text-sm">{car.price_day} Р/сут.</p>
                                </div>
                                <div>
                                    <p className={`rounded px-2 py-1 text-sm ${car.status === 2 ? 'bg-green-600' : 'bg-red-600'}`}>{car.status === 2 ? 'Свободен' : 'Забронирован'}</p>
                                </div>
                            </div>
                            <div className="card-gradient-bottom"></div>
                            <div className="card-info-bottom">
                                <div className="flex justify-between text-xs mt-4">
                                    <span>{car.volume} л.</span>
                                    <span>{car.power} л.с.</span>
                                    <span>{car.year} г.</span>
                                    <span>{car.fuel_type}</span>
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
