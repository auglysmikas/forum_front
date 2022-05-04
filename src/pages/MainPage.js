import {useContext} from 'react';
import MainForum from "../components/MainForum";
import TopicModal from "../components/TopicModal";
import MyContext from "../context/MyContext";

const MainPage = () => {


    return (
        <div>
            <MainForum/>
        </div>
    );
};

export default MainPage;