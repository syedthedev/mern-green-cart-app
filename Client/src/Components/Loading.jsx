import React, { use, useEffect } from 'react';
import { useAppContext } from '../Context/AppContext.jsx';
import { useLocation } from 'react-router-dom';

function Loading() {

  const { navigate } = useAppContext(); 
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');

  useEffect(() => {
    if(nextUrl){
        setTimeout(() => {
            navigate(`/${nextUrl}`)
        },5000);
    }
  },[nextUrl]);
  
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'></div>
    </div>
  )
}

export default Loading