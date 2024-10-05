import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Signup_admin = () => {
  const [data, setData] = useState([]);
  const initial_details = {
    email: "",
    password: "",
    name: ""
  };
  
  const [signInData, setSignInData] = useState(initial_details);

  useEffect(() => {
    axios.get("http://localhost:6013/api/admins")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signInData);
    setSignInData(initial_details);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const passwordHideShow = (inp) => {
    const value = document.getElementById(inp);
    value.type = (value.type === "password") ? "text" : "password";
  };

  return (
    <div>
      <div className="fullscreen">
        <form className="login" onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Enter Your Name" name="name" value={signInData.name} onChange={handleChange} /><br />
          <input type="text" id="email" placeholder="Enter Your Mail" name="email" value={signInData.email} onChange={handleChange} /><br />
          <input type="password" id="password4" placeholder="Enter Password" name="password" value={signInData.password} onChange={handleChange} />
          Show password: <input type="checkbox" onClick={() => passwordHideShow("password4")} /><hr />
          <button type="submit">Signup</button>
        </form>
      </div>
      {data && data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
};

export default Signup_admin;
