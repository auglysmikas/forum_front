import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";
import MyContext from "../context/MyContext";
import Replies from "./Replies";
import PaginationMain from "./PaginationMain";
import Topic from "./Topic";


const OneTopic = () => {


    const [getPost, setPost] = useState([])
    const [getComments, setComments] = useState([])
    const [getPageCount, setPageCount] = useState(0);
    const {getUser, getActivePage, setActivePage} = useContext(MyContext)
    const [getMessage, setMessage] = useState("")
    const nav = useNavigate()
    const {id} = useParams()
    const reply = useRef()

    useEffect(() => {
        http.get(`openTopic/${id}/${getActivePage}`).then(res => {
            if (res.success) {
                setPost(res.oneTopic)
                setComments(res.findComments)
                setPageCount(res.findCommentCount)
            }
        })
    }, [getActivePage])


    function changePage(newActivePage) {
        setActivePage(newActivePage);
        nav(`/main/${id}/?page=${newActivePage}`);
    }

    async function publish() {
        const replyInfo = {
            postId: id,
            user: getUser,
            comment: reply.current.value,
            time: new Date().toLocaleTimeString('lt-LT')
        }
        http.post(replyInfo, "replies").then(res => {
            if (res.success) {
            } else {
                setMessage(res.message)
            }
        })
    }


    return (
        <div className="cont">

            <div className='title'>
                <h2>{getPost.post}</h2>
            </div>

            <div className="center mt-30">
                <PaginationMain
                    activePage={getActivePage}
                    changePage={changePage}
                    getPageCount={getPageCount}
                />
            </div>
            <div className="replyField center f-column">
                {getComments && getComments.map((replies, ind) => <Replies replies={replies} key={ind}/>
                )}
            </div>
            <div className="center">
                <PaginationMain activePage={getActivePage}
                                changePage={changePage}
                                getPageCount={getPageCount}
                />
            </div>

            {getUser &&
            <div className="center">
                <div className="replyInputs center">
                    {getMessage && <div style={{color: 'red'}}>{getMessage}</div>}
                    <input type="text" ref={reply} placeholder="Write your thoughts"/>
                    <button className='pressBtn' onClick={publish}>Comment</button>
                </div>
            </div>}
        </div>
    );
};

export default OneTopic;