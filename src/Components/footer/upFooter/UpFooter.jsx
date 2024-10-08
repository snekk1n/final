import React from 'react';
import cls from './upFooter.module.css'


const UpFooter = () => {
    return (
        <>
            <div className={cls.upfooter}>
                <div>
                    <h1>
                        Прокат элитных авто в Бишкеке
                    </h1>
                        <p className={cls.middleP}>
                            Для тех, кто знает цену подлинному комфорту, компания «Kyrgyz Motors» предлагает услугу проката
                            эксклюзивных автомобилей в Бишкеке на самых привлекательных условиях!
                        </p>
                    <p>
                        Уже сегодня мы предоставим вам все возможности для быстрого оформления аренды автомобиля
                        премиум-класса. Вы сможете:
                    </p>
                        <p>
                            • Выбрать марку престижного автомобиля по вашему желанию.
                        </p>
                    <p>
                        • Быстро оформить заявку и договор аренды автомобиля в Москве.
                    </p>
                        <p>
                            • Получить все необходимые консультации по техническим и организационным вопросам, связанным с
                            прокатом эксклюзивных авто.
                        </p>
                </div>
                <div>
                    <h1 className={cls.secondH1}>
                        Наш автопарк
                    </h1>
                        <p className={cls.endP}>
                            Собственный автопарк «Kyrgyz Motors» представлен коллекцией элитных автомобилей. Вы можете
                            оформить услугу проката авто люкс класса за считанные минуты и уже в течение часа оказаться за
                            рулем одного из наших красавцев.
                        </p>
                </div>
                <div>
                    <h1 className={cls.lastH1}>
                        Точность - вежливость королей
                    </h1>
                        <p className={cls.lastP}>
                            Четкая координация и организация рабочего процесса позволяет нам гарантировать безупречное
                            выполнение своих обязательств. Заказывая услугу проката авто люкс с водителем в компании «Kyrgyz
                            Motors», Вы можете быть абсолютно уверены:
                        </p>
                    <p>
                        • Автомобиль будет подан минута в минуту;
                    </p>
                        <p>
                            • Вынужденные задержки в пути будут сведены к минимуму;
                        </p>
                    <p>
                        • Ваше путешествие или деловая поездка будет предельно комфортной, безопасной и увлекательной.
                    </p>
                    <p className={cls.downP}>
                        Заказать прокат элитных автомобилей в Бишкеке и проконсультироваться по любым интересующим вас вопросам можно по телефону +996-555-555-555
                    </p>
                </div>
            </div>
        </>
    );
};

export default UpFooter;