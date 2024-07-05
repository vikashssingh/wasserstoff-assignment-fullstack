import "./dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Dashboard = () => {

    var [topic, setTopic] = useState();

    useEffect(() => {
        handleOrderData()
            .then(res => setTopic(res))

    }, []);



    const handleOrderData = async () => {
        try {
            let data = localStorage.getItem("token");
            let result = await axios.get(`http://localhost:3001/user/${data.split(",")[1]}/dashboard`, {
                headers: {
                    authorization: (data.split(","))[0],
                    Accept: 'application/json',
                },
            })

            let newRes = result.data
            return newRes.data
        }
        catch (err) {
            alert(err.response.data.message)
        }
    };
    if (!topic) return (<div>No Record Found</div>)



    return (
        <div className='main_container'>
            <nav className='navbar'>
                <h1>FEYNMAN BOARD</h1>
                <Link to="/addtopic">
                    <button className='white_btn'>Add a new Topic</button>
                </Link>
            </nav>
            <div className="content">
                {topic.map((val, index) => {
                    return <div className="eachCont" key={index} >
                        <h2>Topic : {val.topic}</h2>
                        <p>{val.description}</p>
                        <h4>Your Understanding of the topics: </h4>{" "}
                    </div>
                })}
            </div>
            <nav className='footer'></nav>
        </div>

    );
};

export default Dashboard;
