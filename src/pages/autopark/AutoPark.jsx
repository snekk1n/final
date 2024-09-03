import cls from './autopark.module.css';
import { useNavigate } from 'react-router-dom';
import Gwagon from "../categoryList/assets/GElik.webp";
import Cabrio from "../categoryList/assets/Cabrio.webp";
import Sportcar from "../categoryList/assets/Sportcar.webp";
import Premium from "../categoryList/assets/Premium.webp";
import Coupe from "../categoryList/assets/Coupe.webp";
import Electro from "../categoryList/assets/Electro.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../../components/CarSlider/CarSlider.scss';
import Dropdown from "./Dropdown.jsx";

const AutoPark = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`https://ash2521.pythonanywhere.com/cars?page=1`),
                    axios.get(`https://ash2521.pythonanywhere.com/cars?page=2`),
                    axios.get(`https://ash2521.pythonanywhere.com/cars?page=3`)
                ]);

                const allCars = responses.flatMap(response => response.data.results);
                setCars(allCars);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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

    const handleCardClick = (id) => {
        navigate(`/car/${id}`);
    };

    return (
        <>
            <div className={cls.container}>
                <BackButton />
                <div className={cls.category}>
                    <h1>Аренда авто бизнес класса в Бишкеке</h1>
                    <h2>Весь автопарк</h2>
                    <div className={cls.cards}>
                        <Link to={"/autoPark"}>
                            <button className={cls.allcars}>
                                <p>Все автомобили</p>
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
                                <img src={Sportcar} alt=""/>
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
                <Dropdown />
            </div>

            <div className='flex flex-wrap px-1'>
                {cars.length > 0 ? (
                    cars.map((car, index) => (
                        <div key={index} className="w-1/3 px-1 mt-1 h-96" onClick={() => handleCardClick(car.id)}>
                            <div className="card-container">
                                <img
                                    src={car.img_front}
                                    alt={car.title}
                                    className="card-image h-max"
                                />
                                <div className="card-gradient-top"></div>
                                <div className="card-info-top">
                                    <p className="text-lg">{car.title}</p>
                                    <p className="mt-2 text-sm">{car.price_day} Сом/сут.</p>
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
                    ))
                ) : (
                    <p>Нет доступных автомобилей.</p>
                )}
            </div>
        </>
    );
};

export default AutoPark;
