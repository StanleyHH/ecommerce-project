import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary.jsx';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('PaymentSummery component', () => {
    let paymentSummery;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummery = {
            "totalItems": 10,
            "productCostCents": 550,
            "shippingCostCents": 130,
            "totalCostBeforeTaxCents": 680,
            "taxCents": 90,
            "totalCostCents": 770
        };
        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('display payment summary correctly', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummery} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(screen.getByText('Items (10):')).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-product-cost')).getByText('$5.50')
        ).toBeInTheDocument();

        expect(screen.getByTestId('payment-summary-shipping-cost')).toHaveTextContent('$1.30');
        expect(screen.getByTestId('payment-summary-total-before-tax')).toHaveTextContent('$6.80');
        expect(screen.getByTestId('payment-summary-tax')).toHaveTextContent('$0.90');
        expect(screen.getByTestId('payment-summary-total')).toHaveTextContent('$7.70');
    });

    it('place an order', async ()=> {
        function Location() {
            const location = useLocation();
            return (
                <div data-testid="url-path">{location.pathname}</div>
            );
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummery} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    });
});