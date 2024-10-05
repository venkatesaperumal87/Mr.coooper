// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';

// const { TextArea } = Input;
// const { Option } = Select;

// const PostPropertyForm = ({ isVisible, onClose }) => {
//   const [form] = Form.useForm();

//   const handleSubmit = async (values) => {
//     try {
//       await axios.post('http://localhost:6013/api/property', values); // Update URL if necessary
//       message.success('Property posted successfully');
//       form.resetFields();
//       onClose();
//     } catch (error) {
//       console.error('Error posting property', error);
//       message.error('Failed to post property');
//     }
//   };

//   return (
//     <Modal
//       title="Post New Property"
//       visible={isVisible}
//       onCancel={onClose}
//       footer={null}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//       >
//         <Form.Item
//           name="propertyName"
//           label="Property Name"
//           rules={[{ required: true, message: 'Please enter property name' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="propertyType"
//           label="Property Type"
//           rules={[{ required: true, message: 'Please select property type' }]}
//         >
//           <Select>
//             <Option value="house">House</Option>
//             <Option value="apartment">Apartment</Option>
//             <Option value="PG">PG</Option>
//             <Option value="Plot">Plot</Option>
//             {/* Add more options as needed */}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="location"
//           label="Location"
//           rules={[{ required: true, message: 'Please enter property location' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="amount"
//           label="Amount"
//           rules={[{ required: true, message: 'Please enter property amount' }]}
//         >
//           <Input type="number" />
//         </Form.Item>

//         <Form.Item
//           name="date"
//           label="Date"
//           rules={[{ required: true, message: 'Please select property date' }]}
//         >
//           <DatePicker />
//         </Form.Item>

//         <Form.Item
//           name="images"
//           label="Images"
//         >
//           <TextArea rows={4} placeholder="Enter image paths (JSON format)" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Post Property
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default PostPropertyForm;
import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const PostPropertyForm = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    // Dummy data for testing
    const payload = {
      "propertyName": form.getFieldValue('propertyName'),
      "propertyType": form.getFieldValue('propertyType'),
      "location": form.getFieldValue('location'),
      "amount": form.getFieldValue('amount'),
      "date": form.getFieldValue('date').format('YYYY-MM-DD'),
      "images": form.getFieldValue('images'),
      "owner": { "ownerId": 1 },
      "likes": 0,
      "views": 0
    };

    // Normally you would send the payload to your backend here
    // await postProperty(payload);

    message.success("Property posted successfully!");

    // Reset form fields and close modal
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Post New Property"
      visible={isVisible}
      onCancel={onClose}
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
          rules={[{ required: true, message: 'Please enter property name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="propertyType"
          label="Property Type"
          rules={[{ required: true, message: 'Please select property type' }]}
        >
          <Select>
            <Option value="house">House</Option>
            <Option value="apartment">Apartment</Option>
            <Option value="PG">PG</Option>
            <Option value="Plot">Plot</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter property location' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter property amount' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select property date' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
        >
          <TextArea
            rows={4}
            placeholder="Enter image paths (JSON format)"
            readOnly
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post Property
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostPropertyForm;
