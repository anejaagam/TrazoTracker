import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryScreen from '../inventoryScreen/InventoryScreen';
import OrderScreen from '../orderScreen/OrderScreen';
import ProductScreen from '../productScreen/ProductScreen';
import Home from '../home';
import TrackingScreen from '../trackingScreen/TrackingScreen';
import Login from '../Auth/login';
import Register from '../Auth/register';
import ConfirmEmail from '../Auth/confirmEmail';

const Navigation: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/inventory" element={<InventoryScreen />} />
                <Route path="/orders" element={<OrderScreen />} />
                <Route path="/products" element={<ProductScreen />} />
                <Route path="/" element={<Home />} />
                <Route path="/track" element={<TrackingScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/confirm' element={<ConfirmEmail />} />
            </Routes>
        </Router>
    );
};

export default Navigation;