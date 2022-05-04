import React, {useContext, useRef, useState} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const TopicModal = () => {

    const navigate = useNavigate()


    const {setTopicModal} = useContext(MyContext)
    const [getMessage, setMessage] = useState("")

    const topic = useRef()

    function publishTopic() {
        const text = {
            topic: topic.current.value
        }
        http.post(text, "writeTopic").then(data => {
            if (data.success) {
                setTopicModal(false)
                navigate("/main")
            } else {
                setMessage(data.message)
            }
        })
    }

    return (
        <div className="center f-column">
            {getMessage && <div style={{color: 'red'}}>{getMessage}</div>}

            <div className="topicMdodal center f-md-column">

                <div className="d-flex f-column">
                    <input type="text" ref={topic} placeholder="Topic"/>
                    <button className='pressBtn' onClick={publishTopic}>Create</button>
                </div>

            </div>
        </div>
    );
};

export default TopicModal;