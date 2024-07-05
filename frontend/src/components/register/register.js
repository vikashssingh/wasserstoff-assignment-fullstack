import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

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

    const register = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/register", user)
            alert(resp.data.message);
            navigate("/login", { replace: true });
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="register">
            <h1>FEYNMAN BOARD</h1>
            <br></br>
            <br></br>
            <h2>Register</h2>
            <input type="text" name="userName" value={user.userName} onChange={handleChange} placeholder="Enter your userName"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>

            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login", { replace: true })}>Login</div>
        </div>
    )
}

export default Register