import { useState } from 'react';
import './addTopic.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addtopic = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        topic: '',
        description: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    };

    const handleSubmit = async () => {
        try {
            let token = localStorage.getItem("token");
            console.log(data)
            let result = await axios.post(`http://localhost:3001/user/${token.split(",")[1]}/addtopic`,
                {
                    topic: data.topic,
                    description: data.description
                }, {
                headers: {
                    authorization: (token.split(","))[0],
                    Accept: 'application/json',
                },
            })
            alert(result.data.message);
            navigate("/dashboard", { replace: true });
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }


    return (
        <div className='main_container'>
            <div className='addtopic_container'>
                <div className='left'>
                    <h2>Level of Understanding</h2>
                    <button type="submit" className='greenish_btn'>Understood</button>
                    <button type="submit" className='yellow_btn'>Somewhat Understood</button>
                    <button type="submit" className='blue_btn'>Not Clear</button>
                    <button type="submit" className='red_btn'>What Rubbish</button>
                </div>

                <div className='right'>

                    <div className='form_container' onSubmit={handleSubmit}>
                        <h2> Create A Topic</h2>
                        < input type="text"
                            placeholder="Enter Title of the Topic"
                            name='topic'
                            onChange={handleChange}
                            value={data.topic}
                            required
                            className='input'
                        />
                        <textarea type="text" name='description' value={data.description} onChange={handleChange} className='input1'></textarea>

                        <button type="submit" onClick={handleSubmit} className='green_btn'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Addtopic;