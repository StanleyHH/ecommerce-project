import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import './App.css'

function App() {

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
        </Routes>
    );
}

export default App
