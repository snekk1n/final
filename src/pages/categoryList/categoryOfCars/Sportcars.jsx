import {useEffect, useState} from 'react';
import cls from "../../autopark/autopark.module.css";
import Gwagon from "../assets/GElik.webp";
import Cabrio from "../assets/Cabrio.webp";
// import Sportcar from "../assets/Sportcar.webp";
import Premium from "../assets/Premium.webp";
import Coupe from "../assets/Coupe.webp";
import Electro from "../assets/Electro.webp";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Sportcars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/?category=4`)
            .then(response => {
                setCars(response.data.results);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleCardClick = (id) => {
        navigate(`/car/${id}`);
    };
    function BackButton() {
        const navigate = useNavigate();

        const goBack = () => {
            navigate(-1);
        };
        return (
            <button onClick={goBack} className={cls.backButton}>
                Назад
            </button>
        );
    }
    return (
        <>
            <div className={cls.container}>
                <BackButton/>
                <div className={cls.category}>
                    <h1>
                        Аренда авто бизнес класса в Бишкеке
                    </h1>
                    <h2>
                        Спорткары
                    </h2>
                    <div className={cls.cards}>
                        <Link to={"/autoPark"}>
                            <button className={cls.allcars}>
                                <p> Все автомобили </p>
                            </button>
                        </Link>
                        <Link to={"/OffRoad"}>
                            <button className={cls.card}>
                                <img src={Gwagon} alt=""/>
                                <p>Внедорожники</p>
                            </button>
                        </Link>
                        <Link to={"/Cabriolets"}>
                            <button className={cls.card}>
                                <img src={Cabrio} alt=""/>
                                <p>Кабриолеты</p>
                            </button>
                        </Link>
                        <Link to={"/Sportcars"}>
                            <button className={cls.card}>
                                <img src={Sportcars} alt=""/>
                                <p>Спорткары</p>
                            </button>
                        </Link>
                        <Link to={"/Premiums"}>
                            <button className={cls.card}>
                                <img src={Premium} alt=""/>
                                <p>Премиум</p>
                            </button>
                        </Link>
                        <Link to={"/Coupe"}>
                            <button className={cls.card}>
                                <img src={Coupe} alt=""/>
                                <p>Купе</p>
                            </button>
                        </Link>
                        <Link to={"/Electro"}>
                            <button className={cls.card}>
                                <img src={Electro} alt=""/>
                                <p>Электрокары</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap px-1'>
                {cars.map((car, index) => (
                    <div key={index} className="w-1/3 px-1 mt-1 h-96" onClick={() => handleCardClick(car.id)}>
                        <div className="card-container ">
                            <img
                                src={car.img_front}
                                alt={car.name} className="card-image h-max"/>
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
        </>
    );
};

export default Sportcars;