import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    };
  }

  toggleLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked
    }));
  }

  render() {
    const { image, name, price, discount, category } = this.props;
    const { isLiked } = this.state;

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden group">
        {/* Product Image */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              {discount}% OFF
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={this.toggleLike}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } shadow-md hover:scale-110 transition-transform duration-200`}
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <span className="text-sm text-gray-500 mb-1 block">{category}</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ${(price * (100 - (discount || 0)) / 100).toFixed(2)}
              </span>
              {discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${price}
                </span>
              )}
            </div>
            
            <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition duration-300">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard; 