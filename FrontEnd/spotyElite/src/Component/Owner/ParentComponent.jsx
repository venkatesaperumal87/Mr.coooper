import React, { useState } from 'react';
import RentRequest from '../Customer/RentRequest';
import OwnerReview from './OwnerReview';

const ParentComponent = () => {
  const [submittedRequests, setSubmittedRequests] = useState([]);

  const handleRequestSubmit = (formData) => {
    setSubmittedRequests(prevRequests => [...prevRequests, formData]);
  };

  return (
    <div>
      <RentRequest onRequestSubmit={handleRequestSubmit} />
      <OwnerReview submittedRequests={submittedRequests} />
    </div>
  );
};

export default ParentComponent;
