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
  
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((products) => (
          <li key={products.id}
              className="bg-white border p-2 m-2 shadow-lg rounded-lg">
            {products.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${products.title} image ${index + 1}`}
              />
            ))}
            <h2>{products.title}</h2>
            <p>Category: {products.category}</p>
            <p>Price: ${products.price}</p>
          </li>
        ))}
      </ul>
    );
  }