import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';

import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx';
import { HomePage } from './pages/home/HomePage.jsx';
import { OrdersPage } from './pages/orders/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

import './App.css'

function App() {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
    }

    useEffect(() => {
        loadCart();
    }, []);

    window.axios = axios;

    return (
        <Routes>
            <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
            <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
            <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
            <Route path="*" element={<NotFoundPage cart={cart} />} />
        </Routes>
    );
}

export default App
