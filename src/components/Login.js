import {useContext, useRef, useState} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";
import MyContext from '../context/MyContext'

const Login = () => {

    const navigate = useNavigate()


    const email = useRef()
    const pass = useRef()

    const {setUser} = useContext(MyContext)
    const [error, setError] = useState("")

    function login() {
        const loginInfo = {
            email: email.current.value,
            pass: pass.current.value
        }

        http.post(loginInfo, "login").then(data => {
            if(data.success){
                setUser(data.checkUser)
                navigate('/main')
            } else {
                setError(data.message)
            }
        } )
    }

    return (
        <div className="center">

            <div className="mg50 login">
                <h1>Login</h1>
                <input type="text" ref={email} placeholder="Valid Email"/>
                <input type="password" ref={pass} placeholder="Password"/>
                {error && <h4 style={{color: 'red' }}>{error}</h4> }
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;