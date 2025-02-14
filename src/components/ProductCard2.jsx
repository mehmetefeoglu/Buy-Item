const ProductCard2 = ({ image, category, department, price, discountedPrice, colors }) => {
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-16">
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden mb-5">
          <img
            src={image}
            alt={category}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Product Info - Center Aligned */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-sm font-bold text-gray-800 mb-2">{category}</h3>
          <p className="text-sm text-gray-800 mb-2">{department}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-400">${price.toFixed(2)}</span>
            <span className="text-sm font-bold text-[#23856D]">${discountedPrice.toFixed(2)}</span>
          </div>
          {/* Color Options */}
          <div className="flex gap-3">
            {colors.map((color) => (
              <div
                key={color.id}
                className="w-[16px] h-[16px] rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard2; 