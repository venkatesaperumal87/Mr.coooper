import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message, Modal } from 'antd';
import { LikeOutlined, LikeFilled, EyeOutlined } from '@ant-design/icons';
import RentRequest from './RentRequest'; // Import the RentRequest component
import './PropertyDetails.css';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [owner, setOwner] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (event) => {
    event.preventDefault();
    setIsModalOpen(true); // Show the modal
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    // Implement further actions if needed
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        setError('Invalid property ID');
        return;
      }
      try {
        await axios.patch(`http://localhost:6013/api/property/increment-view/${id}`);
        const propertyResponse = await axios.get(`http://localhost:6013/api/property/${id}`);
        setProperty(propertyResponse.data);

        const storedLikedStatus = localStorage.getItem(`property-${id}-liked`);
        setLiked(storedLikedStatus === 'true');

        if (propertyResponse.data.owner && propertyResponse.data.owner.ownerId) {
          const ownerResponse = await axios.get(`http://localhost:6013/api/owner/${propertyResponse.data.owner.ownerId}`);
          setOwner(ownerResponse.data);
        } else {
          setError('Owner ID is missing in property data');
          return;
        }

        const reviewsResponse = await axios.get('http://localhost:6013/api/Review_T5', { params: { propertyId: id } });
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Error fetching property details');
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const toggleLike = async () => {
    try {
      const newLikedStatus = !liked;
      const response = await axios.patch(`http://localhost:6013/api/property/${id}/toggle-like`, null, {
        params: { liked: newLikedStatus }
      });
      const updatedProperty = response.data;
      setProperty(updatedProperty);
      setLiked(newLikedStatus);
      localStorage.setItem(`property-${id}-liked`, newLikedStatus);
      message.success(`Property ${newLikedStatus ? 'liked' : 'unliked'} successfully`);
    } catch (error) {
      console.error('Error toggling like:', error);
      message.error('Error toggling like');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  const images = JSON.parse(property.images || '{}');

  return (
    <div className="property-detail">
      <h1>{property.propertyName}</h1>
      <p>Type: {property.propertyType}</p>
      <p>Location: {property.location}</p>
      <p>Price: ₹{property.amount}</p>
      <p>Status: {property.status}</p>
      <div className="property-stats">
        <p>
          <span onClick={toggleLike} style={{ cursor: 'pointer' }}>
            {liked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
          </span> {property.likes}
        </p>
        <p>
          <EyeOutlined /> {property.views}
        </p>
        <Button
          type="primary"
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          onClick={handleBook}
        >
          Book
        </Button>
      </div>
      <div className="property-images">
        {Object.entries(images).map(([key, src]) => {
          const imagePath = src.startsWith('/') ? src : `/${src}`;
          return (
            <img  style={{height:"150px"},{width:"150px"}}
              key={key} 
              src={imagePath} 
              alt={`Property ${property.propertyName} Image ${key}`} 
              className="property-image"
              onError={(e) => { e.target.onerror = null; e.target.src = '/Images/placeholder.jpg'; }} 
            />
          );
        })}
      </div>

      <h2>Owner Details</h2>
      {owner ? (
        <>
          <p>Name: {owner.name}</p>
          <p>Contact: {owner.mobileNumber}</p>
          <p>Email: {owner.email}</p>
        </>
      ) : (
        <p>Loading owner details...</p>
      )}
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.reviewId} className="review-item">
              <p className="review-text">
                <span className="review-customer-name">{review.customer.customerName} :</span>
                <span className="spacer"></span>
                <span className="review-comment">{review.comment}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}

      {/* Modal for RentRequest */}
      <Modal
        title="Rent Request"
        open={isModalOpen} // Use open instead of visible
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null} // Remove default footer
      >
        <RentRequest onRequestClose={handleModalOk} />
      </Modal>
    </div>
  );
};

export default PropertyDetails;
