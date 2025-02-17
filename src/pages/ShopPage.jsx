import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard2 from '../components/ProductCard2';
import { shopData } from '../data';

const ShopPage = () => {
  return (
    <div className="w-full">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center py-8 text-[#252B42]">
        Shop
      </h1>

      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 pb-6">
        <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
        <span className="text-[#BDBDBD]">Shop</span>
      </div>

      {/* Category Cards */}
      <div className="px-4">
        <div className="flex flex-col gap-4">
          {shopData.categories.map((category) => (
            <div key={category.id} className="relative h-48 w-full">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm">{category.itemCount} Items</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-center gap-8 py-8">
        <button className="flex items-center gap-2 text-[#737373] border border-[#E9E9E9]/100 px-4 py-2 rounded bg-gray-100">
          <span>Popularity</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="px-5 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a7ab3] transition-colors">
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        <div className="flex flex-col gap-4">
          {shopData.products.map((product) => (
            <ProductCard2 key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 py-8">
        <button className="px-4 py-2 text-[#23A6F0] border border-[#E9E9E9] rounded hover:bg-[#23A6F0] hover:text-white transition-colors">
          First
        </button>
        {[1, 2, 3].map((page) => (
          <button 
            key={page}
            className={`px-4 py-2 rounded transition-colors
              ${page === 1 
                ? 'bg-[#23A6F0] text-white' 
                : 'text-[#23A6F0] border border-[#E9E9E9] hover:bg-[#23A6F0] hover:text-white'
              }`}
          >
            {page}
          </button>
        ))}
        <button className="px-4 py-2 text-[#23A6F0] border border-[#E9E9E9] rounded hover:bg-[#23A6F0] hover:text-white transition-colors">
          Next
        </button>
      </div>

      {/* Brand Logos */}
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col items-center py-24 gap-8">
          {shopData.brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-48 h-16 flex items-center justify-center"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-32 h-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 