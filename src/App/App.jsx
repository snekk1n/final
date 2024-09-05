import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import cls from './App.module.scss';
import Header from '../components/header/Header.jsx';
import Main from '../pages/Main/Main.jsx';
import AutoPark from '../pages/autopark/AutoPark.jsx';
import OffRoad from '../pages/categoryList/categoryOfCars/OffRoad.jsx';
import Cabriolets from '../pages/categoryList/categoryOfCars/Cabriolets.jsx';
import Premiums from '../pages/categoryList/categoryOfCars/Premiums.jsx';
import Sportcars from '../pages/categoryList/categoryOfCars/Sportcars.jsx';
import Coupe from '../pages/categoryList/categoryOfCars/Coupe.jsx';
import Electro from '../pages/categoryList/categoryOfCars/Electro.jsx';
import CarDetail from '../components/cardetails/CarDetail.jsx';
import DownFooter from '../components/footer/downFooter/DownFooter.jsx';
import Auth from '../components/auth/ui/Auth.jsx';
import Modal from "react-modal";
import {useDispatch} from "react-redux";
import {fastAuthWithRefreshToken} from "../feature/service/fastAuthWithRefreshToken.js";
import UserPage from "../pages/user/UserPage.jsx";


const App = () => {
    const [isStateModal, setIsStateModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        const refreshTokenForFastAuth = localStorage.getItem("refresh");
        const objRefreshTokenForFastAuth = {
            refresh: refreshTokenForFastAuth
        }

        if (refreshTokenForFastAuth) {
            dispatch(fastAuthWithRefreshToken(objRefreshTokenForFastAuth))
        }

        return () => {
            console.log("app покинул dom")
        }

    }, [dispatch]);

    useEffect(() => {
        document.body.style.overflow = isStateModal ? 'hidden' : '';
    }, [isStateModal]);

    return (
        <div className={cls.App}>
            <Header setIsStateModal={setIsStateModal}/>
            <Routes>
                <Route path="" element={<Main/>}/>
                <Route path="/UserPage" element={<UserPage/>}/>
                <Route path="/OffRoad" element={<OffRoad/>}/>
                <Route path="/Cabriolets" element={<Cabriolets/>}/>
                <Route path="/Sportcars" element={<Sportcars/>}/>
                <Route path="/Premiums" element={<Premiums/>}/>
                <Route path="/Coupe" element={<Coupe/>}/>
                <Route path="/Electro" element={<Electro/>}/>
                <Route path="/autoPark" element={<AutoPark/>}/>
                <Route path="/car/:id" element={<CarDetail/>}/>
                <Route path="/*" element={<p className="text-3xl">NOT FOUND</p>}/>
            </Routes>
            <DownFooter/>
            <Modal
                isOpen={isStateModal}
                onRequestClose={() => setIsStateModal(false)}
                style={{
                    content: {
                        width: "600px",
                        height: "500px",
                        margin: 'auto',
                        backgroundColor: "#171717",
                        borderRadius: '20px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }
                }}
            >
                <Auth setIsStateModal={setIsStateModal}/>
                <button onClick={() => setIsStateModal(false)} style={{marginTop: '20px'}}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default App;