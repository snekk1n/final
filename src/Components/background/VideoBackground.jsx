import './background.css'
import {Link} from "react-router-dom";

const VideoBackground = () => {
    return (
        <div className="main-background">
            <div className="video-container">
                <video autoPlay loop muted playsInline className="video-background">
                    <source src="./../../../public/videoplayback.mp4" type="video/mp4"/>
                    Ваш браузер не поддерживает данный формат :(
                </video>
                <div className="video-overlay"></div>
                <div className="content">
                    <h1 className="h-content">Аренда авто премиум класса в Бишкеке</h1>
                    <p className="p-content">Выберите автопарк:</p>
                    <div className="buttons">
                        <Link to={"/autoPark"}>
                            <button>
                                Бишкек
                            </button>
                        </Link>
                        {/*<button>*/}
                        {/*    Ош*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
            <div className="under">
                <div className="col-3">
                    <h1>
                        10 лет
                    </h1>
                    <p>На рынке аренды премиальных автомобилей </p>
                </div>
                <div  className="col-3">
                    <h1>72</h1>
                    <p>автомобиля в нашем автопарке</p>
                </div>
                <div  className="col-3">
                    <h1>
                        1 млрд
                    </h1>
                    <p>
                        Сом стоимость автопарка Bishkek Dream Cars
                    </p>
                </div>
            </div>
        </div>

    );
};

export default VideoBackground;