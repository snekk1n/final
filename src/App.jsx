import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarSlider from './Components/CarSlider/CarSlider.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarDetail from "./Components/CarDetail.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<CarSlider />}  />
                <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
