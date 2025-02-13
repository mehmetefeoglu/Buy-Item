import { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Test Image Section */}
      <section className="py-8 px-4 bg-red-100">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src="https://picsum.photos/1200/600"
              alt="Test Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h1 className="text-4xl text-white font-bold">Welcome to Our Store</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Content Section */}
      <section className="py-8 px-4 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Featured Content
          </h2>
          <p className="text-gray-600">
            This is a simple test page to ensure our routing and layout are working correctly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 