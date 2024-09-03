import cls from './categoryList.module.css'
import Gwagon from '../assets/GElik.webp'
import Cabrio from '../assets/Cabrio.webp'
import Sportcar from '../assets/Sportcar.webp'
import Premium from '../assets/Premium.webp'
import Coupe from '../assets/Coupe.webp'
import Electro from '../assets/Electro.webp'

import {Link} from "react-router-dom";


const CategoryList = () => {
    return (
        <div className={cls.container}>
            <div className={cls.topText}>
                <h1>
                    Категории автомобилей
                </h1>
                <div className={cls.cards}>
                    <Link to={"/OffRoad"}>
                        <button className={cls.card}>
                            <p>Внедорожники</p>
                            <img src={Gwagon} alt=""/>
                        </button>
                    </Link>
                    <Link to={"/Cabriolets"}>
                        <button className={cls.card}>
                            <p>Кабриолеты</p>
                            <img src={Cabrio} alt=""/>
                        </button>
                    </Link>
                    <Link to={"/Sportcars"}>
                        <button className={cls.card}>
                            <p>Спорткары</p>
                            <img src={Sportcar} alt=""/>
                        </button>
                    </Link>
                    <Link to={"/Premiums"}>
                        <button className={cls.card}>
                            <p>Премиум</p>
                            <img src={Premium} alt=""/>
                        </button>
                    </Link>
                    <Link to={"/Coupe"}>
                        <button className={cls.card}>
                            <p>Купе</p>
                            <img src={Coupe} alt=""/>
                        </button>
                    </Link>
                    <Link to={"/Electro"}>
                        <button className={cls.card}>
                            <p>Электрокары</p>
                            <img src={Electro} alt=""/>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;