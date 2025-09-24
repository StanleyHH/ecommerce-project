import { OrderHeader } from './OrderHeader.jsx';
import { OrderDetailsGrid } from './OrderDetailsGrid.jsx';

export function OrdersGrid({ orders, loadCart }) {
    return (
        <div className="orders-grid">
            {orders.length > 0 && orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order} />
                        <OrderDetailsGrid order={order} loadCart={loadCart} />
                    </div>
                );
            })}
        </div>
    );
}