import React, {useContext, useState} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http"
import ChangePhotoModal from "./ChangePhotoModal";
import Replies from "./Replies";
import Topic from "./Topic";
import TopicModal from './TopicModal'


const Profile = () => {

    const {getUser} = useContext(MyContext)

    const {getChangePhoto, setChangePhoto} = useContext(MyContext)
    const [getMyInfo, setMyInfo] = useState([])


    function openPhotoModal() {
        document.body.style.overflow = 'hidden'
        setChangePhoto(true)
    }

    function getMyPost(id) {
        http.get(`myPost/${id}`).then(res => {
            if (res.success) {
                setMyInfo(res.myPosts)
            }

        })
    }

    function getMyTopics(id) {
        http.get(`myTopics/${id}`).then(res => {
            if (res.success) {
                setMyInfo(res.myTopics)
            }
        })
    }
    return (
        <div>
            {getChangePhoto && <ChangePhotoModal setChangePhoto={setChangePhoto}/>}
            <div className="d-flex al-center j-center">
                {getUser &&
                    <div className="bigCard d-flex j-center f-md-column">
                        <div className="flex1 d-flex f-column al-center j-center">
                            <img src={getUser.image} alt=""/>
                            <button className="pressBtn" onClick={openPhotoModal}>Change profile photo</button>
                        </div>
                        <div className="d-flex f-column al-center flex1">
                            <h3>Username: {getUser.username}</h3>

                            <p>User email: {getUser.email}</p>
                            <TopicModal/>
                        </div>
                    </div>}
            </div>
            <div className="d-flex al-center j-center">
                <div className="pressBtn flex1 center"
                     onClick={() => getMyPost(getUser._id)}>My posts
                </div>
                <div className="pressBtn flex1 center"
                     onClick={() => getMyTopics(getUser._id)}>My topics
                </div>
            </div>
            <div className="center f-column">
                {getMyInfo.length > 0 &&
                    getMyInfo.map(text =>
                        text.postId ?
                            <Replies replies={text}/>
                            :
                            <Topic topic={text}/>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;