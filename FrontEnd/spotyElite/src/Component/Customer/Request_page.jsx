import React, { useState } from 'react';

function RentRequest({ onRequestClose }) { // Accept onRequestClose prop
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

    if (name === 'no_of_children') {
      const childrenCount = parseInt(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        childrenDetails: Array(childrenCount).fill({ name: '', age: '' })
      }));
    }

    if (name === 'no_of_adults') {
      const adultsCount = parseInt(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        adultsDetails: Array(adultsCount).fill({ name: '', age: '' })
      }));
    }
  };

  const handleMemberChange = (e, index, type) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const details = [...prevFormData[type]];
      details[index] = { ...details[index], [name]: value };
      return {
        ...prevFormData,
        [type]: details
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    onRequestClose(); // Close the modal on successful submission
  };

  return (
    <div className="rent-request-form">
      <form onSubmit={handleSubmit}>
        {renderInput('Name', 'name', formData.name, handleChange)}
        {renderInput('Mobile', 'mobile', formData.mobile, handleChange)}
        {renderInput('Email', 'email', formData.email, handleChange, 'email')}
        {renderInput('No. of Children', 'no_of_children', formData.no_of_children, handleChange, 'number')}
        {renderInput('No. of Adults', 'no_of_adults', formData.no_of_adults, handleChange, 'number')}
        {renderInput('Current Address', 'current_address', formData.current_address, handleChange)}

        {formData.childrenDetails.map((child, index) => (
          <div key={`child-${index}`} className="member-group">
            <h3>Child {index + 1}</h3>
            {renderMemberInput('Name', 'name', child.name, (e) => handleMemberChange(e, index, 'childrenDetails'))}
            {renderMemberInput('Age', 'age', child.age, (e) => handleMemberChange(e, index, 'childrenDetails'))}
          </div>
        ))}

        {formData.adultsDetails.map((adult, index) => (
          <div key={`adult-${index}`} className="member-group">
            <h3>Adult {index + 1}</h3>
            {renderMemberInput('Name', 'name', adult.name, (e) => handleMemberChange(e, index, 'adultsDetails'))}
            {renderMemberInput('Age', 'age', adult.age, (e) => handleMemberChange(e, index, 'adultsDetails'))}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const renderInput = (label, name, value, onChange, type = 'text') => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const renderMemberInput = (label, name, value, onChange) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default RentRequest;
