import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { withRouter } from 'react-router-dom';

const ProductCard2 = ({ id, name, category, price, discountedPrice, image, colors, history }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/product/${id}`);
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleClick}>
      <div className="bg-white p-4 hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full aspect-square object-cover"
          />
          
          {/* Action Buttons */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Wishlist Button */}
            <button className="p-2 bg-white rounded-full hover:bg-[#23A6F0] text-[#252B42] hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            
            {/* Cart Button */}
            <button className="p-2 bg-white rounded-full hover:bg-[#23A6F0] text-[#252B42] hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            
            {/* Quick View Button */}
            <button className="p-2 bg-white rounded-full hover:bg-[#23A6F0] text-[#252B42] hover:text-white transition-colors">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 text-center">
          <h3 className="text-base font-bold text-[#252B42] mb-2">{name}</h3>
          <p className="text-sm text-[#737373] mb-2">{category}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#BDBDBD]">${price}</span>
            <span className="text-[#23856D]">${discountedPrice}</span>
          </div>
          
          {/* Color Options */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {colors.map((color, index) => (
              <button 
                key={`${id}-${color}-${index}`}
                className={`w-4 h-4 rounded-full`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductCard2); 