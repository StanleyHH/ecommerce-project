import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';

import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

import './App.css'

function App() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('/api/cart-items?expand=product')
            .then((response) => {
                setCart(response.data);
            })
    }, [])


    return (
        <Routes>
            <Route index element={<HomePage cart={cart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App
