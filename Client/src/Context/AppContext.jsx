import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from "../assets/assets";
import  toast from 'react-hot-toast';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACK_END;
    const navigate = useNavigate();
    const  currency = import.meta.env.VITE_CURRENCY;
    const [user,setUser] = useState(null);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState("");

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }
        } catch (err) {
            setUser(null)
        }
    }

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/seller/is-auth');
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (err) {
            setIsSeller(false);
        }
    }

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/product/list');
            if(data.success){
                setProducts(data.products);
            }else{
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.msg);
        }
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added To Cart')
    }

    const updateCartItem = (itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Updated');
    }

    const removeCartItem = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success('Remove From Cart');
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchSeller();
        fetchUser();
        fetchProduct();
    },[]);

    // Update Cart Items
    useEffect(() => {
        const updateCart = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/cart/update',{
            cartItems
        });
        if(!data.success){
            toast.error(data.msg);
        }
        } catch (err) {
            toast.error(err.message);
        }
    }
        if(user){
            updateCart();
        }
    },[cartItems]);

    const value = {
        backendUrl,
        navigate,
        currency,
        user,setUser,
        isSeller,setIsSeller,
        showUserLogin,setShowUserLogin,
        products,setProducts,
        cartItems,setCartItems,
        addToCart,updateCartItem,removeCartItem,
        searchQuery,setSearchQuery,
        getCartCount,getCartAmount,fetchProduct
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}