import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Signup_customer = () => {
  const initial_details = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: ""
  };

  const [signInData, setSignInData] = useState(initial_details);
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit", signInData);
    setSignInData(initial_details);
    try {
      const response = await axios.post("http://localhost:6013/api/customers", {
        customerName: signInData.name,
        address: signInData.address,
        email: signInData.email,
        password: signInData.password,
        phone: signInData.phone
      });
      setCustomer(response.data);
      navigate('/customer');
      console.log(customer);
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
    console.log(signInData);
  };

  const passwordHideShow = (inp) => {
    const value = document.getElementById(inp);
    value.type = (value.type === "password") ? "text" : "password";
  };

  return (
    <div>
      <div className='fullscreen'>
        <form className="login" onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="Enter Your Name" name="name" value={signInData.name} onChange={handleChange} /><br />
          <input type="text" id="email" placeholder="Enter Your Mail" name="email" value={signInData.email} onChange={handleChange} /><br />
          <input type="text" id="phone" placeholder="Enter Your Phone number" name="phone" value={signInData.phone} onChange={handleChange} /><br />
          <input type="text" id="address" placeholder="Enter Your Address" name="address" value={signInData.address} onChange={handleChange} /><hr />
          <input type="password" id="password2" placeholder="Enter Password" name="password" value={signInData.password} onChange={handleChange} />
          Show password: <input type="checkbox" onClick={() => passwordHideShow("password2")} /><hr />
          <button type="submit">Signup</button>
          <p>Already an existing user? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup_customer;
