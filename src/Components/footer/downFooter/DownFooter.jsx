import React from 'react';
import cls from './downFooter.module.scss'
import Location from './../../../assets/location.svg'
import Time from './../../../assets/time.svg'
import Phone from './../../../assets/phone.svg'
import Email from './../../../assets/mail.svg'
import Tiktok from './../../../assets/tiktok.svg'
import Youtube from './../../../assets/youtube.svg'
import Vkontakte from './../../../assets/vk.svg'
import Instagram from './../../../assets/insta.svg'
import logo from './../../../assets/Logotype.png'


const DownFooter = () => {
    return (
        <>
            <div className={cls.downFooter}>
                <div className={cls.text}>
                    <div className={cls.sections}>
                        <div className={cls.logo}>
                            <span>
                            <img src={logo} alt=""/>
                        </span>
                            <h4>
                                Аренда премиальных авто
                            </h4>
                        </div>
                    </div>

                    <div className={cls.sections}>
                        <span>
                            Разделы
                        </span>
                        <button>
                                Автопарк
                            </button>
                        <button>
                                Условия
                            </button>
                        <button>
                                Контакты
                            </button>
                    </div>

                    <div className={cls.sections}>
                        <span>
                            Контакты
                        </span>
                        <p>
                            <img src={Location} alt=""/>
                            Бишкек
                        </p>
                            <p>
                                <img src={Time} alt=""/>
                                Без выходных, круглосуточно
                            </p>
                        <button>
                            <img src={Phone} alt=""/>
                                +(996)-555-07-06-05
                            </button>
                        <button>
                            <img src={Email} alt=""/>
                                infomotors@kyrgyz.kg
                            </button>
                    </div>

                    <div className={cls.sections}>
                        <span>
                            Подписывайтесь
                        </span>
                            <button>
                                <img src={Tiktok} alt=""/>
                            TikTok
                            </button>
                        <button>
                            <img src={Youtube} alt=""/>
                            Youtube
                            </button>
                        <button>
                            <img src={Vkontakte} alt=""/>
                                Vkontakte
                            </button>
                        <button>
                            <img src={Instagram} alt=""/>
                                Instagram
                            </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default DownFooter;