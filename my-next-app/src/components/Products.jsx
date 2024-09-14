'use client';

import { useState, useEffect } from 'react';

export default function Products() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
      async function fetchProducts() {
        let res = await fetch('https://next-ecommerce-api.vercel.app/products');
        let data = await res.json();
        setProducts(data);
      }
      fetchProducts();
    }, []);
  
    if (!products) return <div>Loading...</div>;

    const handlePrev = (index) => {
        setProducts((prevProducts) =>
          prevProducts.map((product, i) => {
            if (i === index) {
              const images = [...product.images];
              const lastImage = images.pop();
              images.unshift(lastImage);
              return { ...product, images };
            }
            return product;
          })
        );
      };
    
      const handleNext = (index) => {
        setProducts((prevProducts) =>
          prevProducts.map((product, i) => {
            if (i === index) {
              const images = [...product.images];
              const firstImage = images.shift();
              images.push(firstImage);
              return { ...product, images };
            }
            return product;
          })
        );
      };
  
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <li key={product.id} className="bg-white border p-2 m-2 shadow-lg rounded-lg">
          {product.images.length > 1 ? (
            <div className="relative">
              <button
                className="absolute left-0 bg-gray-800 text-white p-1 rounded-full top-1/2 transform -translate-y-1/2 font-bold"
                onClick={() => handlePrev(index)}
              >
                &lt;
              </button>
              <div className="w-full h-64 overflow-hidden rounded-t-lg">
              <img
                src={product.images[0]}
                alt={`${product.title} image`}
                className="w-full h-full object-contain"
              />
              </div>
              <button
                className="absolute right-0 bg-gray-800 text-white p-1 rounded-full top-1/2 transform -translate-y-1/2"
                onClick={() => handleNext(index)}
              >
                &gt;
              </button>
            </div>
          ) : (
            <div className="w-full h-64 overflow-hidden rounded-t-lg">
            <img
              src={product.images[0]}
              alt={`${product.title} image`}
              className="w-full h-full object-contain"
            />
            </div>
          )}
          <h2 className="mt-2 font-bold text-lg">{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    );
  }