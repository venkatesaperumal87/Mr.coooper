import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CenteredButtons = () => {
    const [usertype, setUsertype] = useState("");
    const navigate=useNavigate();

    const containerSty = {
        //backgroundColor: 'rgb(21, 239, 255)',
        width: '200vh',
        height: '60vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        padding: '20px',
    };

    const containerStyle = {
        backgroundColor: 'White',
        width: '300px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        padding: '10px',
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '30px 20px',
        margin: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '200px'
    };

    const handleClick = (type) => {
        setUsertype(type);
        if (usertype=="customer"){
            navigate('/signup/customer')
        }
        else{
            navigate('/signup/customer')
        }
        // Add logic here to redirect or handle the usertype
    };

    return(
        <div className="fullscreen">
            <div className="signup">
            <div style={containerSty}>
            <div style={containerStyle}>
                <button style={buttonStyle} onClick={() => handleClick("customer")}>Customer</button>
                <br />
                <button style={buttonStyle} onClick={() => handleClick("owner")}>Owner</button>
            </div>
            </div>
             
        </div>
        </div>
       
    );
};

export default CenteredButtons;
