import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import MyContext from '../context/MyContext'
import http from '../plugins/http'

import { MdForum } from 'react-icons/md';


const Toolbar = () => {

    const {getUser, setUser, setTopicModal} = useContext(MyContext)


    const navigate = useNavigate()

    function logout() {
        http.get("logout").then(res => {
            if (res.success) {
                setUser(null)
                setTopicModal(false)
                navigate('/login')
            }
        })
    }

    return (
        <div className="toolbar">
            <div className="logo" onClick={() => navigate("/main")}>
                <span><MdForum/></span> Your <span> Forum</span>

            </div>
            <div className="hover flex1 center" onClick={() => navigate("/favorites")}>Favorites</div>


            {!getUser &&
                <div className="center flex4 f-md-column">
                    <div className="hover flex1 center" onClick={() => navigate('/login')}>Login</div>
                    <div className="hover flex1 center"
                         onClick={() => navigate('/register')}>Register</div></div>
            }

            {getUser &&
                <div className="name flex2 center f-md-column f-md-column">

                    <div className="center flex1 hover  purple" onClick={() => navigate('/profile')}>Welcome,  <span> {getUser.username}</span> !</div>

                    <div onClick={logout} className=" hover flex1 center">Log Out</div>
                </div>
            }


        </div>
    );
};
export default Toolbar;