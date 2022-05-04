import React, { useRef, useState} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    const [error, setError] = useState("")

    const name = useRef()
    const email = useRef()
    const pass1 = useRef()
    const pass2 = useRef()


    function register() {
        const registerInfo = {
            name: name.current.value,
            email: email.current.value,
            pass1: pass1.current.value,
            pass2: pass2.current.value
        }


        http.post(registerInfo, "register")
            .then(data => {
                if (data.success){
                    navigate("/login")
                } else {
                    setError(data.message)
                }
            })
    }


    return (
        <div className="center">
            <div className="register mg50">
                <h1>Register</h1>

                <input type="text" ref={name} placeholder="Name"/>
                <input type="text" ref={email} placeholder="Valid Email"/>
                <input type="password" ref={pass1} placeholder="Password"/>
                <input type="password" ref={pass2} placeholder="Repeat Password"/>
                {error && <div style={{color: 'red'}}>{error}</div>}
                <button onClick={register}>Register</button>
            </div>
        </div>

    );
};

export default Register;