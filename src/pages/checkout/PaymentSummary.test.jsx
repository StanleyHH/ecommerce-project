// {
//     "totalItems": 0,
//     "productCostCents": 0,
//     "shippingCostCents": 0,
//     "totalCostBeforeTaxCents": 0,
//     "taxCents": 0,
//     "totalCostCents": 0
// }

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PaymentSummary } from './PaymentSummary.jsx';

describe('PaymentSummery component', () => {
    let paymentSummery;
    let loadCart;

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


});