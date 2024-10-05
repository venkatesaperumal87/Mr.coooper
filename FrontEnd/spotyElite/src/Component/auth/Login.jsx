import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from 'axios';
import './Login.css';
 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const router = useNavigate();
 
    const roles = ["Customer", "Owner", "Admin"];
    const apis = ["customers", "owner", "admin"];
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:6013/api/${apis[value]}/login`, { email, password })
            
            console.log(response.data);
 
            if (response.status === 200 ) {
                if (apis[value] === "customers") {
                    router('/customer');
                } else if (apis[value] === "owner") {
                    router('/owner');
                } else if (apis[value] === "admin") {
                    router('/admin'); // Assuming you have an admin page
                }
            } else {
                setPopupMessage('Unexpected response');
                setShowPopup(true);
                router('/login');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setPopupMessage('Unauthorized: Invalid credentials');
                } else {
                    setPopupMessage(`An error occurred: ${error.response.status}`);
                }
            } else {
                setPopupMessage(`Error: ${error.message}`);
            }
            setShowPopup(true);
        }
    };
 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 
    const passwordHideShow = (inp) => {
        const value = document.getElementById(inp);
        if (value.type === "password") {
            value.type = "text";
        } else {
            value.type = "password";
        }
    };
 
    const handleClosePopup = () => {
        setShowPopup(false);
    };
 
    return (
        <div className="fullscreen">
            <div className="login">
                <Box>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {roles.map((role, idx) => (
                                    <Tab key={idx} label={role} value={idx} />
                                ))}
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter Mail id"
                        name="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        id="password1"
                        placeholder="Enter Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    Show password:
                    <input type="checkbox" onClick={() => passwordHideShow("password1")} />
                    <br />
                    <pre>
                        <button className='' type="submit">Log in</button>
                    </pre>
                    <p>New User? <Link to="/register">register here</Link></p>
                </form>
 
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="popup-close" onClick={handleClosePopup}>&times;</span>
                            <p>{popupMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
 
export default Login;
 
 