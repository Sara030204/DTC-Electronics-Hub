// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Categories from './components/categories';
import CategoryProduct from './components/CategoryProduct';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/checkout';
import ConfirmOrder from './components/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';

// customer
import Register from './components/customer/register';
import Login from './components/customer/login';
import Logout from './components/customer/logout';
import Dashboard from './components/customer/dashboard';
import Orders from './components/customer/orders';
import Profile from './components/customer/profile';
import ChangePassoword from './components/customer/ChangePassword';
import Wishlist from './components/customer/Wishlist';

// vendor
import VendorLogin from './components/vendor/login';
import VendorLogout from './components/vendor/logout';
import VendorRegister from './components/vendor/register';
import VendorDashboard from './components/vendor/VendorDashboard';
import VendorProducts from './components/vendor/VendorProducts';
import AddProduct from './components/vendor/AddProduct';
import UpdateProduct from './components/vendor/UpdateProduct';
import VendorOrders from './components/vendor/orders';
import Customers from './components/vendor/Customers';
import CustomerOrders from './components/vendor/CustomerOrder';
import VChangePassword from './components/vendor/ChangePassword';
import VProfile from './components/vendor/profile';
import Report from './components/vendor/Reports';
import TagProducts from './components/TagProducts';
import AllVendors from './components/AllVendors';
import VendorDetail from './components/vendor/VendorDetail';

import { CartContext } from './Context';
import { useState } from 'react';
import Contact from './components/contact';
const checkCart=localStorage.getItem('cartData');

function App() {
  const [cartData,setCartData]=useState(JSON.parse(checkCart));
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/category/:category_slug/:category_id" element={<CategoryProduct />} />
        <Route path="/products/:tag" element={<TagProducts />} />
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/failure" element={<OrderFailure />} />
        <Route path="/contact" element={<Contact />} />


        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/logout" element={<Logout />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/changepassword" element={<ChangePassoword />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />

        {/* vendor */}
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/:vendor_username/:vendor_id" element={<VendorDetail />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/logout" element={<VendorLogout />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<VendorProducts />} />
        <Route path="/vendor/addproduct" element={<AddProduct />} />
        <Route path="/vendor/update-product/:product_id" element={<UpdateProduct />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/customers" element={<Customers />} />
        <Route path="/vendor/customer/:customer_id/orderitems" element={<CustomerOrders />} />
        <Route path="/vendor/profile" element={<VProfile />} />
        <Route path="/vendor/changepassword" element={<VChangePassword />} />
        <Route path="/vendor/report" element={<Report />} />
        <Route path="/vendors" element={<AllVendors />} />


      </Routes>
      <Footer />
    </CartContext.Provider>
   
  );
}


export default App;
