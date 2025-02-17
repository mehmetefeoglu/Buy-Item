import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Eye, Star, ChevronLeft } from 'lucide-react';
import { shopData } from '../data';
import ProductCard2 from '../components/ProductCard2';

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  
  // Tüm ürünler için veri
  const product = {
    id: productId,
    name: "Floating Phone",
    category: "English Department",
    price: 15.35,
    discountedPrice: 6.48,
    image: `https://images.unsplash.com/photo-${getImageId(productId)}`,
    colors: ["blue", "green", "orange", "purple"],
    description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.",
    reviews: 10,
    availability: "In Stock"
  };

  // Ürüne göre resim ID'si getir
  function getImageId(id) {
    const imageIds = {
      1: '1434389677669-e08b4cac3105',
      2: '1485462537746-965f33f7f6a7',
      3: '1467043198406-dc953a3defa0',
      4: '1490481651871-ab68de25d43d',
      5: '1486406146926-c627a92ad1ab',
      6: '1460925895917-afdab827c52f',
      7: '1441986300917-64674bd600d8',
      8: '1479064555552-3ef4979f8908',
      9: '1495121605193-b116b5b9c5fe',
      10: '1502945015378-0e284ca1a5be',
      11: '1497366754035-f200968a6e72',
      12: '1434389677669-e08b4cac3105'
    };
    return imageIds[id] || imageIds[1];
  }

  // Slider için state
  const [mainImage, setMainImage] = useState(product.image);
  const relatedImages = [
    product.image,
    `https://images.unsplash.com/photo-${getImageId((productId % 12) + 1)}`,
    `https://images.unsplash.com/photo-${getImageId(((productId + 1) % 12) + 1)}`
  ];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 py-6">
        <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
        <Link to="/shop" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
        <span className="text-[#BDBDBD]">{product.name}</span>
      </div>

      {/* Section 1: Product Images & Info */}
      <section className="px-4 mb-8">
        <div className="flex flex-col md:flex-row md:gap-8 max-w-7xl mx-auto">
          {/* Sol Taraf - Resimler */}
          <div className="w-full md:w-1/2">
            {/* Ana Resim */}
            <div className="relative mb-4">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                <button 
                  onClick={() => {
                    const currentIndex = relatedImages.indexOf(mainImage);
                    const prevIndex = currentIndex === 0 ? relatedImages.length - 1 : currentIndex - 1;
                    setMainImage(relatedImages[prevIndex]);
                  }}
                  className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  onClick={() => {
                    const currentIndex = relatedImages.indexOf(mainImage);
                    const nextIndex = currentIndex === relatedImages.length - 1 ? 0 : currentIndex + 1;
                    setMainImage(relatedImages[nextIndex]);
                  }}
                  className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Küçük Resimler */}
            <div className="flex gap-2">
              {relatedImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${product.name} view ${idx + 1}`}
                  className="w-[30%] aspect-square object-cover cursor-pointer"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="space-y-6">
              <h2 className="text-[#252B42] text-2xl font-bold">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-[#737373]">10 Reviews</span>
              </div>

              {/* Price & Availability */}
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[#252B42]">$15.35</p>
                <p className="text-base">
                  Availability : 
                  <span className="text-[#23A6F0] ml-2">In Stock</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-[#737373] text-base leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button 
                    key={idx}
                    className={`w-8 h-8 rounded-full`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button className="flex-1 bg-[#23A6F0] text-white px-6 py-4 rounded hover:bg-[#1a7ab3] transition-colors">
                  <span className="text-base">Select Options</span>
                </button>
                <div className="flex gap-3">
                  <button className="p-4 rounded-full hover:bg-gray-100">
                    <Heart className="w-6 h-6 text-[#252B42]" />
                  </button>
                  <button className="p-4 rounded-full hover:bg-gray-100">
                    <ShoppingCart className="w-6 h-6 text-[#252B42]" />
                  </button>
                  <button className="p-4 rounded-full hover:bg-gray-100">
                    <Eye className="w-6 h-6 text-[#252B42]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Details */}
      <section className="px-4 py-12 bg-[#FAFAFA]">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8">
          {/* Sol Taraf - Resim */}
          <div className="w-full md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-video object-cover"
            />
          </div>
          
          {/* Sağ Taraf - Detaylar */}
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-[#737373] text-lg leading-relaxed">
              <span className="font-bold text-[#252B42]">Met minim Mollie</span> 
              non desert Alamo est sit cliquey dolor do met sent. RELIT official 
              consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-[#737373] text-lg leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
              <span className="text-[#23A6F0]">RELIT official</span> consequent door ENIM RELIT Mollie.
            </p>
            <p className="text-[#737373] text-lg leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
              RELIT official consequent door ENIM RELIT Mollie. 
              <span className="font-bold text-[#252B42]">Excitation venial</span> 
              consequent sent nostrum met.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Bestseller Products */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#252B42] mb-12">
            BESTSELLER PRODUCTS
          </h2>
          {/* Web View - 8 ürün */}
          <div className="hidden md:flex flex-wrap justify-between gap-y-12">
            {Array.from({ length: 8 }, (_, i) => {
              const baseProduct = shopData.products[i % 4]; // 4 ürünü tekrar kullan
              return {
                ...baseProduct,
                id: i + 1,
                name: `Floating Phone ${i + 1}`,
                image: `https://images.unsplash.com/photo-${getImageId(i + 1)}`
              };
            }).map((product) => (
              <div key={product.id} className="w-[23%]">
                <ProductCard2 {...product} />
              </div>
            ))}
          </div>
          {/* Mobile View - 4 ürün */}
          <div className="md:hidden flex flex-col gap-4">
            {shopData.products.slice(0, 4).map(product => (
              <ProductCard2 key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Brand Logos */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="hidden md:flex justify-between items-center">
            {shopData.brands.map((brand) => (
              <a
                key={brand.id}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 flex items-center justify-center"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-full h-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ))}
          </div>
          {/* Mobile view aynı kalacak */}
          <div className="md:hidden flex flex-col items-center">
            {shopData.brands.map((brand) => (
              <a
                key={brand.id}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-48 h-16 flex items-center justify-center mb-8"
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
    </div>
  );
};

export default ProductDetailPage; 