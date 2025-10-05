import React from 'react';
import Navbar from './Components/Navbar.jsx';
import { Routes,Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer.jsx';
import { useAppContext } from './Context/AppContext.jsx';
import Login from './Components/Login.jsx';
import AllProducts from './Pages/AllProducts.jsx';
import ProductCategory from './Pages/ProductCategory.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import Cart from './Pages/Cart.jsx';
import AddAddress from './Pages/AddAddress.jsx';
import MyOrders from './Pages/MyOrders.jsx';
import SellerLogin from './Components/Seller/SellerLogin.jsx';
import SellerLayout from './Pages/Seller/SellerLayout.jsx';
import AddProduct from './Pages/Seller/AddProduct.jsx';
import ProductList from './Pages/Seller/ProductList.jsx';
import Orders from './Pages/Seller/Orders.jsx';
import Loading from './Components/Loading.jsx';
import PrivacyPolicy from './Components/Policies/PrivacyPolicy.jsx';
import TermsAndConditions from './Components/Policies/TermsAndConditions.jsx';
import CancellationRefund from './Components/Policies/CancellationRefund.jsx';
import ShippingDelivery from './Components/Policies/ShippingDelivery.jsx';
import ContactUs from './Components/Policies/ContactUs.jsx';

 
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin,isSeller } = useAppContext();
  return (
    <>
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/cancellation-refund' element={<CancellationRefund />} />
          <Route path='/shipping-delivery' element={<ShippingDelivery />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={isSeller ? <ProductList /> : null} />
            <Route path='orders' element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes> 
      </div>
      {!isSellerPath && <Footer />}

    </div>  
    </>
  )
}

export default App