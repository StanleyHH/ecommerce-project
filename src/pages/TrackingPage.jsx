import { Link, useParams } from 'react-router';

import { Header } from '../components/Header.jsx';

import './TrackingPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };

        fetchOrderData();
    }, [orderId]);

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((product) => {
        return product.productId === productId;
    })

    const totalDeliveryTime = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let deliveryPercent =  (timePassedMs / totalDeliveryTime) * 100;

    const isPrepared = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent >= 100;

    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent < 100 ? 'Arriving on' : 'Delivered on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPrepared && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}