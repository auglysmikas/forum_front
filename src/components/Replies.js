import React, {useEffect, useState} from 'react';
import http from '../plugins/http'

import {useNavigate} from "react-router-dom";

const Replies = ({replies}) => {

    const [getUserPhoto, setUserPhoto] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        http.get(`replyPhoto/${replies.userId}`).then(data => {
            if (data.success) {
                setUserPhoto(data.findUser.image)
            }
        })
    }, [replies])

    return (
        <div  className="replyCont">
            <div onClick={()=> navigate(`/main/${replies.postId}`)} className="replyField center f-md-column">
                <div className="replyImg flex1 f-column center">
                    <img src={getUserPhoto} alt="photo"/>
                    <div className="flex1"><b>User:</b> {replies.username}</div>
                    <div>{replies.time}</div>
                </div>
                <div className="reply flex4">
                    <div dangerouslySetInnerHTML={{__html: replies.post}}/>

                </div>
            </div>
        </div>
    );
};

export default Replies;