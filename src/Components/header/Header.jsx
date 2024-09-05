import React, { useState } from 'react';
import cls from './header.module.css';
import logo from './../../assets/Logotype.png';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {useSelector} from "react-redux";
import UserPage from "../../pages/user/UserPage.jsx";

const Header = (props) => {
    const authData = useSelector((state) => state.auth);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            <div className={cls.header}>
                <div className={cls.container}>
                    <div className="flex items-center justify-between">
                        <nav className="flex items-center gap-5">
                            <Link to="/">
                                <img className={cls.logo} src={logo} alt="Logo"/>
                            </Link>
                            <Link to="/autoPark">
                                <p>Автопарк</p>
                            </Link>
                            <button onClick={openModal}>Контакты</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={{
                                    content: {
                                        cursor: 'pointer',
                                        width: '300px',
                                        height: '200px',
                                        margin: 'auto',
                                        backgroundColor: '#333',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        padding: '20px',
                                        textAlign: 'center'
                                    },
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                                    }
                                }}
                            >
                                <h2>БРЕНД</h2>
                                <p>НОМЕР</p>
                                <p>ПОЧТА</p>
                                <button onClick={closeModal} style={{marginTop: '20px'}}>Закрыть</button>
                            </Modal>
                            <Link to="/reviews">
                                <p>Отзывы</p>
                            </Link>
                        </nav>
                        <nav className="flex items-center gap-5">
                            {
                                authData.successAuth ? (
                                    <>
                                        <div>авторизация гуд</div>
                                        <Link to="/UserPage">
                                            <p>Профиль</p>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => props.setIsStateModal(true)}>Войти</button>
                                        <button onClick={() => props.setIsStateModal(true)}>Зарегистрироваться</button>
                                    </>
                                )
                            }

                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default Header;