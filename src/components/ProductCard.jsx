import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ProductCard = ({ id, name, price, discount, image, category }) => {
  const discountedPrice = price - (price * discount / 100);

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            -{discount}%
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${id}`}>
              <span className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <div className="text-sm font-medium text-gray-900">
            {discount > 0 && (
              <span className="text-red-500 line-through mr-2">${price.toFixed(2)}</span>
            )}
            <span>${discountedPrice.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard; 