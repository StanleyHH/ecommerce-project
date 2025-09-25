import { NavLink, useNavigate, useSearchParams } from 'react-router';

import CartIcon from '../assets/images/icons/cart-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobilLogoWhite from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';

import './Header.css';
import { useState } from 'react';

export function Header({ cart }) {
    const navigate = useNavigate();
    let totalQuantity = 0;

    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || '');

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const updateSearchInput = (event) => {
        setSearch(event.target.value)
    }

    const searchProducts = () => {
        navigate(`/?search=${search}`);
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                         src={LogoWhite} />
                    <img className="mobile-logo"
                         src={MobilLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"
                       value={search}
                       onChange={updateSearchInput}
                />
                <button className="search-button"
                        onClick={searchProducts}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}