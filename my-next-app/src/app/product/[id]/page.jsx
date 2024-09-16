'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/400?text=Image+Not+Found';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [images, setImages] = useState([]);
  const { id } = params;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.images.length > 0) {
          setImages(data.images);
          setCurrentImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleError = (e) => {
    e.target.src = FALLBACK_IMAGE_URL;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/products">
        <button className="bg-gray-800 text-white p-2 rounded mb-4">
          Back
        </button>
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          <div className="bg-gray-200 px-4 py-12 rounded-xl">
            <img
              src={currentImage}
              alt="Product"
              onError={handleError}
              className="w-full h-[400px] object-contain mx-auto rounded"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-[90px] h-[60px] flex items-center justify-center bg-gray-200 rounded-xl p-2 cursor-pointer"
                  onClick={() => setCurrentImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                    onError={handleError}
                  />
                </div>
              ))}
            </div>
          )}
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
