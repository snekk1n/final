import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CarSlider.scss';

const NextArrow = ({ onClick }) => (
    <div
        className="cursor-pointer border-1 border-zinc-500 absolute top-0 right-5 mt-2 mr-2 z-10 text-white px-3 py-2 duration-500 delay-100 hover:border-zinc-50"
        onClick={onClick}
    >
        <button>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.50898 0.192683C1.38545 0.0682927 1.22075 0 1.04636 0C0.871965 0 0.70726 0.0682927 0.586154 0.192683L0.196192 0.585366C-0.058131 0.841463 -0.058131 1.25854 0.196192 1.5122L4.65048 5.99756L0.191348 10.4878C0.0678195 10.6098 0 10.7756 0 10.9512C0 11.1268 0.0678195 11.2927 0.191348 11.4146L0.58131 11.8073C0.704838 11.9317 0.86712 12 1.04151 12C1.21591 12 1.38061 11.9317 1.50172 11.8073L6.81101 6.46341C6.93454 6.33902 7.00236 6.17317 6.99994 5.99756C6.99994 5.82195 6.93212 5.6561 6.81101 5.53171L1.50898 0.192683Z"
                    fill="white"></path>
            </svg>
        </button>
    </div>
); 

const PrevArrow = ({ onClick }) => (
    <div
        className="cursor-pointer border-1 border-zinc-500 absolute top-0 right-20 mt-2 ml-2 z-10 text-white px-3 py-2 rotate-180 duration-500 delay-100 hover:border-zinc-50"
        onClick={onClick}
    >
        <button>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.50898 0.192683C1.38545 0.0682927 1.22075 0 1.04636 0C0.871965 0 0.70726 0.0682927 0.586154 0.192683L0.196192 0.585366C-0.058131 0.841463 -0.058131 1.25854 0.196192 1.5122L4.65048 5.99756L0.191348 10.4878C0.0678195 10.6098 0 10.7756 0 10.9512C0 11.1268 0.0678195 11.2927 0.191348 11.4146L0.58131 11.8073C0.704838 11.9317 0.86712 12 1.04151 12C1.21591 12 1.38061 11.9317 1.50172 11.8073L6.81101 6.46341C6.93454 6.33902 7.00236 6.17317 6.99994 5.99756C6.99994 5.82195 6.93212 5.6561 6.81101 5.53171L1.50898 0.192683Z"
                    fill="white"></path>
            </svg>
        </button>
    </div>
);

const CarSlider = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/index/`)
            .then(response => {
                setCars(response.data.cars);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const handleCardClick = (id) => {
        navigate(`/car/${id}`);
    };

    return (
        <Slider {...settings}>
            {cars.map((car, index) => (
                <div key={index} className="p-3 mt-10 h-72" onClick={() => handleCardClick(car.id)}>
                    <div className="card-container">
                        <img src={`https://ash2521.pythonanywhere.com/${car.img_front}`} alt={car.name} className="card-image h-max"/>
                        <div className="card-gradient-top"></div>
                        <div className="card-info-top">
                            <p className="text-lg">{car.title}</p>
                            <p className="mt-2 text-sm">{car.price_day} Р/сут.</p>
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
        </Slider>
    );
};

export default CarSlider;