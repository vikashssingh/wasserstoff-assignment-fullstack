import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/login", user);
            localStorage.setItem("token", ([resp.data.data.token, resp.data.data.userId]));
            window.location = "/dashboard";
            alert(resp.data.message);
            navigate("/dashboard", { replace: true });
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="login">
            <h1>FEYNMAN BOARD</h1>
            <br></br>
            <br></br>
            <h2>Login</h2>
            <input type="text" name="userName" value={user.userName} onChange={handleChange} placeholder="Enter your userName"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register", { replace: true })}>Register</div>
        </div>
    )
}

export default Login