import cls from './header.module.css'
import logo from './../../assets/Logotype.png'
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import Modal from 'react-modal';

const Header = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    return (
        <>
            <div className={cls.header}>
                <div className={cls.container}>
                    <div className="flex items-center justify-between">
                        <nav className="flex items-center gap-5">
                            <Link to={"/"}>
                                <img className={cls.logo} src={logo} alt="#"/>
                            </Link>
                            <Link to={"/autoPark"}>
                                <a href="">Автопарк</a>
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
                                <button onClick={closeModal} style={{ marginTop: '20px' }}>Закрыть</button>
                            </Modal>
                            <p href="">Отзывы</p>
                        </nav>
                        <nav className="flex items-center gap-5">
                        <a href="#">Войти</a>
                            <a href="#">Зарегистрироваться</a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;