import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';


function SellerLogin() {
  const { isSeller, setIsSeller, navigate,backendUrl } = useAppContext();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(backendUrl + '/api/seller/login',{
        email,password
      });
      if(data.success){
        setIsSeller(true);
        navigate('/seller');
      }else{
        toast.error(data.msg);
      }

    } catch (err) {
      toast.error(err.message);
    }
     
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return !isSeller && (
    <form onSubmit={handleSubmit} className='min-h-screen flex items-center text-sm text-gray-600'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'>
        <p className="text-2xl font-medium m-auto"><span className='text-primary'>Seller </span>Login</p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default SellerLogin;
