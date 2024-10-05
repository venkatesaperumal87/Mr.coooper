import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Modal, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PriceRangeList from './PriceRangeList';
import LocationList from './LocationList';
import PropertyNameList from './PropertyNameList';
import './Sidebarimp.css';

const Sidebarimp = ({ content }) => {
  const [selectedMenu, setSelectedMenu] = useState('properties');
  const [filters, setFilters] = useState({});
  const [isPriceRangeModalVisible, setIsPriceRangeModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isPropertyNameModalVisible, setIsPropertyNameModalVisible] = useState(false);

  const handleMenuClick = (key) => {
    setSelectedMenu(key);
    if (key === 'priceRange') {
      setIsPriceRangeModalVisible(true);
    } else if (key === 'location') {
      setIsLocationModalVisible(true);
    } else if (key === 'propertyName') {
      setIsPropertyNameModalVisible(true);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    handleCancel();
  };

  const handleCancel = () => {
    setIsPriceRangeModalVisible(false);
    setIsLocationModalVisible(false);
    setIsPropertyNameModalVisible(false);
  };

  return (
    <div className="app-container">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240, flexShrink: 0 }}
      >
        <List>
          <ListItem button onClick={() => handleMenuClick('priceRange')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Price Range" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('location')}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Location" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('propertyName')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Property Name" />
          </ListItem>
        </List>
      </Drawer>
      <div className="content">
        {React.cloneElement(content, { filters })}
      </div>
      <Modal
        open={isPriceRangeModalVisible}
        onClose={handleCancel}
        aria-labelledby="price-range-modal-title"
        aria-describedby="price-range-modal-description"
      >
        <div className="modal-content">
          <h2 id="price-range-modal-title">Select Price Range</h2>
          <PriceRangeList onFilterChange={(value) => handleFilterChange('priceRange', value)} />
        </div>
      </Modal>
      <Modal
        open={isLocationModalVisible}
        onClose={handleCancel}
        aria-labelledby="location-modal-title"
        aria-describedby="location-modal-description"
      >
        <div className="modal-content">
          <h2 id="location-modal-title">Select Location</h2>
          <LocationList onFilterChange={(value) => handleFilterChange('location', value)} />
        </div>
      </Modal>
      <Modal
        open={isPropertyNameModalVisible}
        onClose={handleCancel}
        aria-labelledby="property-name-modal-title"
        aria-describedby="property-name-modal-description"
      >
        <div className="modal-content">
          <h2 id="property-name-modal-title">Select Property Name</h2>
          <PropertyNameList onFilterChange={(value) => handleFilterChange('propertyName', value)} />
        </div>
      </Modal>
    </div>
  );
};

export default Sidebarimp;
