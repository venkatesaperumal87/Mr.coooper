import React, { useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, notification, Tabs } from 'antd';
import axios from 'axios';
import OwnerReview from './OwnerReview'; // Import the OwnerReview component
import './Owner.css';
 
const { TabPane } = Tabs;
 
const OwnerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const storedData=sessionStorage.getItem('request-data');
  const submittedRequests = storedData ? JSON.parse(storedData) : [];
  
 
  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };
 
  // Handle modal cancellation and form reset
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
 
  // Submit property details
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:6013/api/property', values); // Update URL if necessary
      if (response.status === 201) {
        notification.success({ message: 'Property posted successfully!' });
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      notification.error({ message: 'Failed to post property.' });
    }
  };
 
  return (
    <div className="header">
    <div className="layout">    <div className="owner-page">
      
    <Tabs defaultActiveKey="1" className="tabs">
      <TabPane tab="Post Property" key="1">
        <Button type="primary" onClick={showModal}>
          Post New Property
        </Button>
 
        <Modal
          title="Post New Property"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="propertyName"
              label="Property Name"
              rules={[{ required: true, message: 'Please enter the property name!' }]}
            >
              <Input />
            </Form.Item>
 
            <Form.Item
              name="propertyType"
              label="Property Type"
              rules={[{ required: true, message: 'Please select the property type!' }]}
            >
              <Input />
            </Form.Item>
 
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter the location!' }]}
            >
              <Input />
            </Form.Item>
 
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter the amount!' }]}
            >
              <Input type="number" />
            </Form.Item>
 
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select the date!' }]}
            >
              <DatePicker />
            </Form.Item>
 
            <Form.Item
              name="images"
              label="Images"
            >
              <Input />
            </Form.Item>
 
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </TabPane>
 
      <TabPane tab="Review Submissions" key="2">
        <OwnerReview />
      </TabPane>
    </Tabs>
  </div></div>
  </div>
 
  );
};


export default OwnerPage;