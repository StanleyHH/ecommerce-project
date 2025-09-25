import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from '../../components/Header.jsx';
import { ProductsGrid } from './ProductsGrid.jsx';

import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get(search ? `/api/products?search=${search}` : '/api/products');
            setProducts(response.data);
        };

        getHomeData();
    }, [search]);


    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}