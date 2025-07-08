import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACK_END;
    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/is-auth`);
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
                setCartItems({});
            }
        } catch {
            setUser(null);
            setCartItems({});
        }
    };

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/seller/is-auth`);
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        }
    };

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`);
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const addToCart = (itemId) => {
        const cartData = { ...cartItems };
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        const cartData = { ...cartItems, [itemId]: quantity };
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    const removeCartItem = (itemId) => {
        const cartData = { ...cartItems };
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    const getCartCount = () =>
        Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

    const getCartAmount = () => {
        let total = 0;
        for (const id in cartItems) {
            const product = products.find(p => p._id === id);
            if (product) {
                total += product.offerPrice * cartItems[id];
            }
        }
        return Math.floor(total * 100) / 100;
    };

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post(`${backendUrl}/api/cart/update`, { cartItems });
                if (!data.success) toast.error(data.msg);
            } catch (err) {
                toast.error(err.message);
            }
        };

        if (user) updateCart();
    }, [cartItems]);

    useEffect(() => {
        fetchSeller();
        fetchUser();
        fetchProduct();
    }, []);

    const value = {
        backendUrl,
        navigate,
        currency,
        user, setUser,
        isSeller, setIsSeller,
        showUserLogin, setShowUserLogin,
        products, setProducts,
        cartItems, setCartItems,
        addToCart, updateCartItem, removeCartItem,
        searchQuery, setSearchQuery,
        getCartCount, getCartAmount,
        fetchProduct
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
