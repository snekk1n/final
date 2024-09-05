import VideoBackground from "../../components/background/VideoBackground.jsx";
import CategoryList from "../categoryList/index.js";
import UpFooter from "../../components/footer/upFooter/UpFooter.jsx";
import AutoparkButton from "../../components/autoparkButton/AutoparkButton.jsx";
import CarSlider from "../../components/CarSlider/CarSlider.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarDetail from "../../components/cardetails/CarDetail.jsx";
import MainCommentSection from "../../components/MainComment/MainCommentSection.jsx";
import MainComment from "../../components/MainComment/MainComment.jsx";


const Main = () => {
    return (
        <div>
            <VideoBackground/>
            <CategoryList/>
            <AutoparkButton/>
            <CarSlider/>
            <CarDetail/>
            <div className="p-6 mx-14 border-2 my-6 mt-40">
                <h3 className="text-white text-xl mb-4">Комментарии</h3>
                <MainCommentSection/>
                <div className={'flex gap-4'}>
                    <MainComment/>
                </div>
            </div>

            <UpFooter/>
        </div>
    );
};

export default Main;