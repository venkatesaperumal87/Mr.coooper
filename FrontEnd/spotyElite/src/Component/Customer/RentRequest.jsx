import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router';

const RentRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    no_of_children: '',
    no_of_adults: '',
    current_address: '',
    childrenDetails: [],
    adultsDetails: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Serialize formData to a JSON string
    sessionStorage.setItem("request-data", JSON.stringify([formData]));

    // Notify user
    notification.success({
      message: 'Request submitted successfully!',
      description: 'The details have been saved. The owner will be notified with the request details.'
    });

    // Optionally clear form data
    setFormData({
      name: '',
      mobile: '',
      email: '',
      no_of_children: '',
      no_of_adults: '',
      current_address: '',
      childrenDetails: [],
      adultsDetails: []
    });

    // Navigate to the OwnerReview page
   // navigate('/owner_review');
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name" name="name" required>
        <Input value={formData.name} onChange={handleChange} name="name" />
      </Form.Item>
      <Form.Item label="Mobile" name="mobile" required>
        <Input value={formData.mobile} onChange={handleChange} name="mobile" />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input value={formData.email} onChange={handleChange} name="email" />
      </Form.Item>
      <Form.Item label="Number of Children" name="no_of_children">
        <Input value={formData.no_of_children} onChange={handleChange} name="no_of_children" />
      </Form.Item>
      <Form.Item label="Number of Adults" name="no_of_adults">
        <Input value={formData.no_of_adults} onChange={handleChange} name="no_of_adults" />
      </Form.Item>
      <Form.Item label="Current Address" name="current_address">
        <Input value={formData.current_address} onChange={handleChange} name="current_address" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};

export default RentRequest;
