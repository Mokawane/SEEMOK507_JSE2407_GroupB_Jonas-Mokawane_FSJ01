'use client';

import { useState, useEffect } from 'react';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const { id } = params;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">Category: {product.category}</p>
          <p className="text-xl text-gray-700 mb-4">Price: ${product.price}</p>
          <p className="text-md text-gray-500 mb-6">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
