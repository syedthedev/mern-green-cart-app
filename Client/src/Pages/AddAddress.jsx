import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../Context/AppContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, onChange, value }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500
     focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required
  />
);


function AddAddress() {

  const { backendUrl,navigate,user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(backendUrl + '/api/address/add',{ address });
      if(data.success){
        toast.success(data.msg)
        navigate('/cart');
      }else{
        toast.error(data.msg);
      }

    } catch (err) {
      toast.error(err.message);
    }
   
  };

  useEffect(() => {
    if(!user){
      navigate('/cart');
    }
  },[]);

  return (
    <div className='mt-14 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={handleSubmit} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField type="text" placeholder="First Name" name="firstName" value={address.firstName} onChange={handleChange} />
              <InputField type="text" placeholder="Last Name" name="lastName" value={address.lastName} onChange={handleChange} />
            </div>
            <InputField type="email" placeholder="Email address" name="email" value={address.email} onChange={handleChange} />
            <InputField type="text" placeholder="Street" name="street" value={address.street} onChange={handleChange} />
            <div className='grid grid-cols-2 gap-4'>
              <InputField type="text" placeholder="City" name="city" value={address.city} onChange={handleChange} />
              <InputField type="text" placeholder="State" name="state" value={address.state} onChange={handleChange} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField type="number" placeholder="Zip Code" name="zipCode" value={address.zipCode} onChange={handleChange} />
              <InputField type="text" placeholder="Country" name="country" value={address.country} onChange={handleChange} />
            </div>
            <InputField type="text" placeholder="Phone" name="phone" value={address.phone} onChange={handleChange} />
            <button
              type="submit"
              className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'
            >
              Save Address
            </button>
          </form>
        </div>
        <img src={assets.add_address_iamge} alt="address" />
      </div>
    </div>
  );
}

export default AddAddress;
