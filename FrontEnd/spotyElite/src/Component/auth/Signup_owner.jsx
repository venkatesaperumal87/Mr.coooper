import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
 
const Signup_owner = () => {
  const initial_details = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    bank_details: ""
  };
 
  const [signInData, setSignInData] = useState(initial_details);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signInData);
    setSignInData(initial_details);
    try {
      const response=await axios.post("http://localhost:6013/api/owner", {
        name: signInData.name,
        address: signInData.address,
        email: signInData.email,
        password: signInData.password,
        mobilenumber: signInData.phone,
        bankDetails: signInData.bank_details
      });
      setSignInData(response.data)
      navigate('/owner');
    } catch (err) {
      console.log(err);
    }
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
        <form className="signup" onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Enter Your Name" name="name" value={signInData.name} onChange={handleChange} /><br />
          <input type="text" id="email" placeholder="Enter Your Mail" name="email" value={signInData.email} onChange={handleChange} /><br />
          <input type="text" id="address" placeholder="Enter Your Address" name="address" value={signInData.address} onChange={handleChange} /><br />
          <input type="text" id="phone" placeholder="Enter Your phone" name="phone" value={signInData.phone} onChange={handleChange} /><br />
          <input type="text" id="bank_details" placeholder="Enter Your Bank Details" name="bank_details" value={signInData.bank_details} onChange={handleChange} /><br />
          <input type="password" id="password3" placeholder="Enter Password" name="password" value={signInData.password} onChange={handleChange} />
          Show password: <input type="checkbox" onClick={() => passwordHideShow("password3")} /><hr />
          <button type="submit">Signup</button>
          <p>Already an existing owner? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};
 
export default Signup_owner;

 