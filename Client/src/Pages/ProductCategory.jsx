import React from 'react';
import { useAppContext } from '../Context/AppContext.jsx';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../Components/ProductCard';

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  // Normalize category from URL
  const normalizedCategory = category?.toLowerCase();

  // Match category from list
  const searchCategory = categories.find(
    (item) => item.path?.toLowerCase() === normalizedCategory
  );

  // Filter products based on category
  const filterProducts = products.filter(
    (product) => product.category?.toLowerCase() === normalizedCategory
  );

  return (
    <div className='mt-16 px-4 sm:px-8 md:px-12 lg:px-16'>
     
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}


      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">

          {filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
            No products found in the category.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
