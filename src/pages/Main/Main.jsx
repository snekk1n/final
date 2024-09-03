import VideoBackground from "../../components/background/VideoBackground.jsx";
import CategoryList from "../categoryList/index.js";
import UpFooter from "../../components/footer/upFooter/UpFooter.jsx";
import AutoparkButton from "../../components/autoparkButton/AutoparkButton.jsx";
import CarSlider from "../../components/CarSlider/CarSlider.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarDetail from "../../components/cardetails/CarDetail.jsx";
import CommentSection from "../../components/cardetails/CommentSection.jsx";
import React from "react";


const Main = () => {
    return (
        <div>
            <VideoBackground/>
            <CategoryList/>
            <AutoparkButton/>
            <CarSlider/>
            <CarDetail/>
            {/*<CommentSection/>*/}
            <UpFooter/>
        </div>
    );
};

export default Main;