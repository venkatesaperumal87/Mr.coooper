// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalStateProvider } from './GlobalStateContext'; // Import GlobalStateProvider
import Login from './Component/auth/Login';
import CenteredButtons from './Component/auth/CenteredButtons';
import Customer from './Component/Customer/Customer';
import PropertyList from './Component/Customer/PropertyList';
import PropertyDetails from './Component/Customer/PropertyDetails';
import Signup_customer from './Component/auth/Signup_customer';
import Signup_owner from './Component/auth/Signup_owner';
import Signup_admin from './Component/auth/Signup_admin';
import Sidebarimp from './Component/Customer/Sidebarimp';
import RentRequest from './Component/Customer/RentRequest';
import OwnerPage from './Component/Owner/OwnerPage';
import Home from './Component/Home/Home';
import OwnerReview from './Component/Owner/OwnerReview';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CenteredButtons />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/requestpage" element={<RentRequest />} />
          <Route path="/owner" element={<OwnerPage />} />
          <Route path="/owner_review" element={<OwnerReview />} />
          <Route path="/propertylist" element={<Sidebarimp content={<PropertyList />} />} />
          <Route path="/signup/customer" element={<Signup_customer />} />
          <Route path="/signup/owner" element={<Signup_owner />} />
          <Route path="/signup/admin" element={<Signup_admin />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
