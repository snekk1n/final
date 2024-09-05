import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../CarSlider/CarSlider.scss';
import './style.scss';
import cls from "../../pages/autopark/autopark.module.css";
import Modal from 'react-modal';
import CommentSection from './CommentSection.jsx';
import CategoryPage from "./CategoryPage.jsx";
import Comment from './Comment.jsx'
import StarRating from "./StarRating.jsx";
import RentalPage from "./RentalPage.jsx";
import token from './token.js';

const CarDetails = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [car, setCar] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        axios.get(`https://ash2521.pythonanywhere.com/cars/${id}/details/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!car) {
        return <div className={'hidden'}>Loading...</div>;
    }

    const BackButton = () => {
        const goBack = () => {
            navigate(-1);
        };
        return (
            <button onClick={goBack} className={cls.backButton}>
                Назад
            </button>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrows next" onClick={onClick}>
                &#8250;
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="arrows prev" onClick={onClick}>
                &#8249;
            </div>
        );
    };
    const handleConfirmBooking = () => {
        if (!car) {
            console.log('Данные автомобиля не загружены.');
            return;
        }

        console.log('Button clicked');
        const updatedCar = {
            ...car,
            status: 3
        };


        axios.patch(`https://ash2521.pythonanywhere.com/cars/${id}/`, updatedCar, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCar(response.data);
                console.log('Статус успешно обновлён на "на прокате"');
            })
            .catch(error => {
                if (error.response) {
                    console.log('Ошибка при обновлении статуса:', error.response.data);
                } else if (error.request) {
                    console.log('Не удалось получить ответ от сервера:', error.request);
                } else {
                    console.log('Ошибка при настройке запроса:', error.message);
                }
            });
    };




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2.3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="slider-container pt-20">
            <Slider {...settings}>
                <div key="1"><img className={'image-slide'} src={`https://ash2521.pythonanywhere.com/${car.car.img_front}`} alt="Car 1" /></div>
                <div key="2"><img className={'image-slide'} src={`https://ash2521.pythonanywhere.com/${car.car.img_back}`} alt="Car 2" /></div>
                <div key="3"><img className={'image-slide'} src={`https://ash2521.pythonanywhere.com/${car.car.salon}`} alt="Car 3" /></div>
            </Slider>
            <div className="mx-14 mt-8 flex items-center justify-between text-white">
                <div>
                    <h2 className="text-4xl font-bold">{car.car.title}</h2>
                    <div className="flex items-center mt-1">
                        {/* Рейтинг из 5 звезд */}
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${
                                    index < car.average_rating ? 'text-white' : 'text-gray-500'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.334 24 12 19.897 4.666 24 6 15.27l-6-5.847 8.332-1.268z"/>
                            </svg>
                        ))}
                    </div>
                    <BackButton/>
                </div>
                <div className="flex gap-3 mt-6 justify-center">
                    <p className={'flex items-center gap-2'}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.72 14.1543L26.5586 11.6786C26.4339 11.4128 26.1544 11.2413 25.8457 11.2413H23.921C23.4906 11.2413 23.1417 11.5697 23.1417 11.9749V13.1312H22.543V12.1798C22.543 11.7746 22.1941 11.4462 21.7637 11.4462H19.6889V9.4446C19.6889 9.03939 19.34 8.71105 18.9096 8.71105H15.076V8.01251H18.9096C19.34 8.01251 19.6889 7.68408 19.6889 7.27896C19.6889 6.87375 19.34 6.54541 18.9096 6.54541H9.68398C9.2536 6.54541 8.90469 6.87375 8.90469 7.27896C8.90469 7.68408 9.2536 8.01251 9.68398 8.01251H13.5176V8.71105H9.68398C9.2536 8.71105 8.90469 9.03939 8.90469 9.4446V10.0543H7.19502C6.76464 10.0543 6.41572 10.3827 6.41572 10.7879V14.7243H5.34507V10.7879C5.34507 10.3827 4.99616 10.0543 4.56578 10.0543C4.1354 10.0543 3.78648 10.3828 3.78648 10.7879V20.1281C3.78648 20.5333 4.1354 20.8616 4.56578 20.8616C4.99616 20.8616 5.34507 20.5333 5.34507 20.1281V16.1914H6.41572V20.1281C6.41572 20.5333 6.76464 20.8616 7.19502 20.8616H10.2227L13.2992 23.2835C13.4395 23.3939 13.6163 23.4544 13.7992 23.4544H21.7638C22.1942 23.4544 22.5431 23.126 22.5431 22.7208V20.7212H23.1418V21.8775C23.1418 22.2827 23.4907 22.6111 23.9211 22.6111H25.8458C26.1545 22.6111 26.434 22.4396 26.5587 22.1738L27.7201 19.6981C27.7638 19.6048 27.7865 19.5038 27.7865 19.4018V14.4506C27.7865 14.3486 27.7638 14.2476 27.72 14.1543ZM26.2279 19.2472L25.3381 21.1441H24.7004V19.9877C24.7004 19.5825 24.3515 19.2541 23.9211 19.2541H21.7638C21.3334 19.2541 20.9845 19.5825 20.9845 19.9877V21.9874H14.082L11.0056 19.5655C10.8653 19.455 10.6884 19.3946 10.5056 19.3946H7.97431V11.5214H9.68398C10.1144 11.5214 10.4633 11.1931 10.4633 10.7879V10.1782H18.1304V12.18C18.1304 12.5852 18.4793 12.9135 18.9097 12.9135H20.9845V13.865C20.9845 14.2702 21.3334 14.5985 21.7638 14.5985H23.9211C24.3515 14.5985 24.7004 14.2702 24.7004 13.865V12.7085H25.3381L26.2279 14.6054V19.2472Z"
                                fill="#858585"></path>
                        </svg>
                        {car.car.volume} л.
                    </p>
                    <p className={'flex items-center gap-2'}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.72 14.1543L26.5586 11.6786C26.4339 11.4128 26.1544 11.2413 25.8457 11.2413H23.921C23.4906 11.2413 23.1417 11.5697 23.1417 11.9749V13.1312H22.543V12.1798C22.543 11.7746 22.1941 11.4462 21.7637 11.4462H19.6889V9.4446C19.6889 9.03939 19.34 8.71105 18.9096 8.71105H15.076V8.01251H18.9096C19.34 8.01251 19.6889 7.68408 19.6889 7.27896C19.6889 6.87375 19.34 6.54541 18.9096 6.54541H9.68398C9.2536 6.54541 8.90469 6.87375 8.90469 7.27896C8.90469 7.68408 9.2536 8.01251 9.68398 8.01251H13.5176V8.71105H9.68398C9.2536 8.71105 8.90469 9.03939 8.90469 9.4446V10.0543H7.19502C6.76464 10.0543 6.41572 10.3827 6.41572 10.7879V14.7243H5.34507V10.7879C5.34507 10.3827 4.99616 10.0543 4.56578 10.0543C4.1354 10.0543 3.78648 10.3828 3.78648 10.7879V20.1281C3.78648 20.5333 4.1354 20.8616 4.56578 20.8616C4.99616 20.8616 5.34507 20.5333 5.34507 20.1281V16.1914H6.41572V20.1281C6.41572 20.5333 6.76464 20.8616 7.19502 20.8616H10.2227L13.2992 23.2835C13.4395 23.3939 13.6163 23.4544 13.7992 23.4544H21.7638C22.1942 23.4544 22.5431 23.126 22.5431 22.7208V20.7212H23.1418V21.8775C23.1418 22.2827 23.4907 22.6111 23.9211 22.6111H25.8458C26.1545 22.6111 26.434 22.4396 26.5587 22.1738L27.7201 19.6981C27.7638 19.6048 27.7865 19.5038 27.7865 19.4018V14.4506C27.7865 14.3486 27.7638 14.2476 27.72 14.1543ZM26.2279 19.2472L25.3381 21.1441H24.7004V19.9877C24.7004 19.5825 24.3515 19.2541 23.9211 19.2541H21.7638C21.3334 19.2541 20.9845 19.5825 20.9845 19.9877V21.9874H14.082L11.0056 19.5655C10.8653 19.455 10.6884 19.3946 10.5056 19.3946H7.97431V11.5214H9.68398C10.1144 11.5214 10.4633 11.1931 10.4633 10.7879V10.1782H18.1304V12.18C18.1304 12.5852 18.4793 12.9135 18.9097 12.9135H20.9845V13.865C20.9845 14.2702 21.3334 14.5985 21.7638 14.5985H23.9211C24.3515 14.5985 24.7004 14.2702 24.7004 13.865V12.7085H25.3381L26.2279 14.6054V19.2472Z"
                                fill="#858585"></path>
                        </svg>
                        {car.car.power} л.с.
                    </p>
                    <p className={'flex items-center gap-2'}>
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.3466 11.3968H17.7266V7.25293H10.3466V11.3968ZM11.5306 8.43688H16.5426V10.2128H11.5306V8.43688Z"
                                fill="#858585"></path>
                            <path
                                d="M21.3756 7.3411H19.9754V5.04297H8.01799V21.7156H7.18243V25.2491H20.811V21.7156H19.9754V20.422C20.2284 20.5369 20.509 20.6014 20.8045 20.6014C21.9144 20.6014 22.8175 19.6984 22.8175 18.5884V10.1308L21.3756 7.3411ZM20.6548 8.52506L21.6335 10.4186V11.156H19.9754V8.52506H20.6548ZM19.6271 24.0652H8.36639V22.8996H19.6271V24.0652ZM9.20194 21.7156V6.22692H18.7914V16.3392V18.5884V21.7156H9.20194V21.7156ZM20.8045 19.4174C20.3473 19.4174 19.9754 19.0455 19.9754 18.5884V16.3392V12.34H21.6335V18.5884C21.6335 19.0456 21.2616 19.4174 20.8045 19.4174Z"
                                fill="#858585"></path>
                        </svg>
                        {car.car.fuel_type}</p>
                    <p className={'flex items-center gap-2'}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.82857 8.57142C8.11849 8.57142 7.54286 9.14706 7.54286 9.85714V22.2C7.54286 22.9101 8.11849 23.4857 8.82857 23.4857H21.1714C21.8815 23.4857 22.4571 22.9101 22.4571 22.2V9.85714C22.4571 9.14706 21.8815 8.57142 21.1714 8.57142H8.82857ZM6 9.85714C6 8.29496 7.26639 7.02856 8.82857 7.02856H21.1714C22.7336 7.02856 24 8.29496 24 9.85714V22.2C24 23.7622 22.7336 25.0286 21.1714 25.0286H8.82857C7.26639 25.0286 6 23.7622 6 22.2V9.85714Z"
                                fill="#858585"></path>
                            <path
                                d="M19.1143 4.97144C19.5403 4.97144 19.8857 5.31682 19.8857 5.74286V6.85715C19.8857 7.2832 19.5403 7.62858 19.1143 7.62858C18.6882 7.62858 18.3429 7.2832 18.3429 6.85715V5.74286C18.3429 5.31682 18.6882 4.97144 19.1143 4.97144Z"
                                fill="#858585"></path>
                            <path
                                d="M10.8857 4.97144C11.3118 4.97144 11.6571 5.31682 11.6571 5.74286V6.85715C11.6571 7.2832 11.3118 7.62858 10.8857 7.62858C10.4597 7.62858 10.1143 7.2832 10.1143 6.85715V5.74286C10.1143 5.31682 10.4597 4.97144 10.8857 4.97144Z"
                                fill="#858585"></path>
                            <path
                                d="M6 13.9714C6 13.5453 6.34538 13.2 6.77143 13.2H23.2286C23.6546 13.2 24 13.5453 24 13.9714C24 14.3974 23.6546 14.7428 23.2286 14.7428H6.77143C6.34538 14.7428 6 14.3974 6 13.9714Z"
                                fill="#858585"></path>
                            <path
                                d="M12.1714 19.1142C12.1714 18.6882 12.5168 18.3428 12.9429 18.3428H17.0571C17.4832 18.3428 17.8286 18.6882 17.8286 19.1142C17.8286 19.5403 17.4832 19.8856 17.0571 19.8856H12.9429C12.5168 19.8856 12.1714 19.5403 12.1714 19.1142Z"
                                fill="#858585"></path>
                        </svg>
                        {car.car.year} г.
                    </p>
                    <p className={'flex items-center gap-2'}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.72 14.1543L26.5586 11.6786C26.4339 11.4128 26.1544 11.2413 25.8457 11.2413H23.921C23.4906 11.2413 23.1417 11.5697 23.1417 11.9749V13.1312H22.543V12.1798C22.543 11.7746 22.1941 11.4462 21.7637 11.4462H19.6889V9.4446C19.6889 9.03939 19.34 8.71105 18.9096 8.71105H15.076V8.01251H18.9096C19.34 8.01251 19.6889 7.68408 19.6889 7.27896C19.6889 6.87375 19.34 6.54541 18.9096 6.54541H9.68398C9.2536 6.54541 8.90469 6.87375 8.90469 7.27896C8.90469 7.68408 9.2536 8.01251 9.68398 8.01251H13.5176V8.71105H9.68398C9.2536 8.71105 8.90469 9.03939 8.90469 9.4446V10.0543H7.19502C6.76464 10.0543 6.41572 10.3827 6.41572 10.7879V14.7243H5.34507V10.7879C5.34507 10.3827 4.99616 10.0543 4.56578 10.0543C4.1354 10.0543 3.78648 10.3828 3.78648 10.7879V20.1281C3.78648 20.5333 4.1354 20.8616 4.56578 20.8616C4.99616 20.8616 5.34507 20.5333 5.34507 20.1281V16.1914H6.41572V20.1281C6.41572 20.5333 6.76464 20.8616 7.19502 20.8616H10.2227L13.2992 23.2835C13.4395 23.3939 13.6163 23.4544 13.7992 23.4544H21.7638C22.1942 23.4544 22.5431 23.126 22.5431 22.7208V20.7212H23.1418V21.8775C23.1418 22.2827 23.4907 22.6111 23.9211 22.6111H25.8458C26.1545 22.6111 26.434 22.4396 26.5587 22.1738L27.7201 19.6981C27.7638 19.6048 27.7865 19.5038 27.7865 19.4018V14.4506C27.7865 14.3486 27.7638 14.2476 27.72 14.1543ZM26.2279 19.2472L25.3381 21.1441H24.7004V19.9877C24.7004 19.5825 24.3515 19.2541 23.9211 19.2541H21.7638C21.3334 19.2541 20.9845 19.5825 20.9845 19.9877V21.9874H14.082L11.0056 19.5655C10.8653 19.455 10.6884 19.3946 10.5056 19.3946H7.97431V11.5214H9.68398C10.1144 11.5214 10.4633 11.1931 10.4633 10.7879V10.1782H18.1304V12.18C18.1304 12.5852 18.4793 12.9135 18.9097 12.9135H20.9845V13.865C20.9845 14.2702 21.3334 14.5985 21.7638 14.5985H23.9211C24.3515 14.5985 24.7004 14.2702 24.7004 13.865V12.7085H25.3381L26.2279 14.6054V19.2472Z"
                                fill="#858585"></path>
                        </svg>
                        {car.car.type_car_body}
                    </p>
                </div>
                <div>
                    <p className="text-4xl font-bold">{car.car.price_day} сом/сутки</p>
                    <a href={car.car.status === 2 ? '#rent' : undefined}>
                        <button
                            className={`w-full py-3 font-bold mt-1 ${car.car.status === 2 ? 'bg-white text-black' : 'bg-red-600 text-white cursor-not-allowed'}`}
                            disabled={car.car.status !== 2}
                        >
                            {car.car.status === 2 ? 'Забронировать' : 'На прокате'}
                        </button>
                    </a>
                </div>
            </div>
            <CategoryPage categoryOfcar={car.car.category} currentCarName={car.car.title}/>
            <div className="p-6 mx-14 border-2 my-6 mt-40">
                <h3 className="text-white text-xl mb-4">Комментарии</h3>
                <StarRating id={car.car.id}/>
                <CommentSection carId={car.car.id}/>
                <div className={'flex gap-4'}>
                    <Comment id={car.car.id}/>
                </div>
            </div>
            <div id={'rent'} className="mx-14 text-white p-6 border flex justify-around my-20">
                <div className={'flex flex-col justify-center gap-4'}>
                    <a className="text-6xl font-bold mb-4">Забронировать автомобиль</a>
                    <h3 className="text-4xl font-bold mb-2">{car.car.title}</h3>
                    <p className="mb-6 text-xl ">Мы свяжемся с вами в течение часа для уточнения деталей.<br/>
                        Либо забронируйте автомобиль по номеру <a href="tel:+996777335577" className="text-blue-400">996
                            (777)
                            33-55-77</a></p>
                    <div className="mt-6 flex items-center">
                        <img src="https://static.tildacdn.com/tild3434-3137-4335-a637-343836363131/2.svg" alt=""/>
                        <p className="ml-2 text-sm text-gray-400">Нажимая кнопку "Подтвердить бронь"
                            вы <br/> соглашаетесь с
                            условиями обработки данных</p>
                    </div>
                </div>
                <RentalPage car={car.car.id} price={car.car.price_day}/>
            </div>
        </div>
    );
};

export default CarDetails;