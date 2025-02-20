import { Link } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4 lg:flex-nowrap lg:justify-between">
          {shopData.categories.map((category) => (
            <div key={category.id} className="relative h-48 w-full md:w-[48%] lg:w-[19%] mb-4 md:mb-0">
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
      <div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-8 gap-4">
        {/* Sol Grup - Mobilde En Üstte */}
        <div className="w-full md:w-auto order-1 md:order-1">
          <span className="text-[#737373] block text-center md:text-left">Showing all 12 results</span>
        </div>
        
        {/* Orta Grup - Mobilde Ortada */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center order-2 md:order-2">
          <span className="text-[#737373]">Views:</span>
          <button className="p-2 hover:bg-gray-100 rounded">
            <LayoutGrid className="w-5 h-5 text-[#737373]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <List className="w-5 h-5 text-[#737373]" />
          </button>
        </div>
        
        {/* Sağ Grup - Mobilde En Altta */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center order-3 md:order-3">
          <button className="flex items-center gap-2 text-[#737373] border border-[#E9E9E9]/100 px-4 py-2 rounded bg-gray-100">
            <span>Popularity</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="px-5 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a7ab3] transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4">
          {Array.from({ length: 12 }, (_, i) => {
            const imageIds = [
              '1434389677669-e08b4cac3105',
              '1485462537746-965f33f7f6a7',
              '1467043198406-dc953a3defa0',
              '1490481651871-ab68de25d43d',
              '1486406146926-c627a92ad1ab',
              '1460925895917-afdab827c52f',
              '1441986300917-64674bd600d8',
              '1479064555552-3ef4979f8908',
              '1495121605193-b116b5b9c5fe',
              '1434389677669-e08b4cac3105',
              '1502945015378-0e284ca1a5be',
              '1497366754035-f200968a6e72'
            ];
            
            return {
              id: i + 1,
              name: `Floating Phone ${i + 1}`,
              category: "English Department",
              price: 15.35,
              discountedPrice: 6.48,
              image: `https://images.unsplash.com/photo-${imageIds[i]}`,
              colors: ["blue", "green", "orange", "purple"],
              description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.",
              reviews: 10,
              availability: "In Stock"
            };
          }).map((product) => (
            <div key={product.id} className="w-full md:w-[48%] lg:w-[23%]">
              <ProductCard2 {...product} />
            </div>
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
        <div className="flex flex-col md:flex-row md:justify-between items-center py-24 px-4">
          {shopData.brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-48 h-16 flex items-center justify-center mb-8 md:mb-0"
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