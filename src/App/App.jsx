import Main from "../pages/Main/Main.jsx";
import Header from "../components/header/Header.jsx";
import {Route, Routes} from 'react-router-dom';
import AutoPark from "../pages/autopark/AutoPark.jsx";
import OffRoad from "../pages/categoryList/categoryOfCars/OffRoad.jsx";
import Cabriolets from "../pages/categoryList/categoryOfCars/Cabriolets.jsx";
import Premiums from "../pages/categoryList/categoryOfCars/Premiums.jsx";
import Sportcars from "../pages/categoryList/categoryOfCars/Sportcars.jsx";
import Coupe from "../pages/categoryList/categoryOfCars/Coupe.jsx";
import Electro from "../pages/categoryList/categoryOfCars/Electro.jsx";
import CarDetail from "../components/cardetails/CarDetail.jsx";
import DownFooter from "../components/footer/downFooter/DownFooter.jsx";
import Auth from "../components/auth/ui/Auth.jsx";

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="" element={<Main/>}/>
                <Route path="/OffRoad" element={<OffRoad/>}/>
                <Route path="/Cabriolets" element={<Cabriolets/>}/>
                <Route path="/Sportcars" element={<Sportcars/>}/>
                <Route path="/Premiums" element={<Premiums/>}/>
                <Route path="/Coupe" element={<Coupe/>}/>
                <Route path="/Electro" element={<Electro/>}/>
                <Route path="/autoPark" element={<AutoPark/>}/>
                <Route path="/car/:id" element={<CarDetail />} />
                <Route path="/*" element={<p className="text-3xl">NOT FOUND</p>}/>
            </Routes>
            <DownFooter/>
            {/*<Auth/>*/}
        </div>
    );
};

export default App;