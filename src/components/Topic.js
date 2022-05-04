import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

import MyContext from "../context/MyContext";

const Topic = ({topic}) => {

    const {getUser} = useContext(MyContext)

    const navigate = useNavigate()
    const {getFavorite, setFavorite} = useContext(MyContext)
    const favoriteList = JSON.parse(localStorage.getItem("MyFavorites") || "0");

    useEffect(() => {
        if (favoriteList !== 0) {
            setFavorite([...favoriteList])
        }

    }, [getFavorite])



    function open(id) {
        navigate(`/main/${id}`)
    }

    function addFavorite(id) {
        let myFavorites = getFavorite;
        let addArray = true;

        myFavorites.map((fav) => {
            if (fav === id) {
                let index = myFavorites.indexOf(fav)
                if (index !== -1) {
                    myFavorites.splice(index, 1)
                    addArray = false
                }
            }
        });
        if (addArray) {
            myFavorites.push(id)
        }
        setFavorite([...myFavorites])
        return localStorage.setItem("MyFavorites", JSON.stringify(getFavorite))
    }

    return (
        <div className="forumBox d-flex al-center">


            <div className="d-flex flex5 al-center" onClick={() => open(topic._id)}>
                <div className="flex4 topicHeadline d-flex al-center">{topic.post}</div>
                <div className="flex1 d-flex al-center j-center">{topic.username}</div>
                <div className="flex1 d-flex al-center j-center">{topic.commentCounter}</div>
                <div className="flex2 d-flex f-column al-center">{topic.time}</div>
            </div>
            {!getFavorite.includes(topic._id) ?
                <div className="flex1 center favoriteIcon" onClick={() => addFavorite(topic._id)}>
                    <AiOutlineHeart/></div>
                : <div className="flex1 center favoriteIcon" onClick={() => addFavorite(topic._id)}>
                    <AiFillHeart/></div>}

        </div>
    )
};

export default Topic;