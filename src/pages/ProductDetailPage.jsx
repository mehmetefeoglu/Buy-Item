import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Eye, Star, ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchProducts } from '../store/actions/productActions';
import ProductCard2 from '../components/ProductCard2';
import { motion } from 'framer-motion';
import { shopData } from '../data';
import { addToCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-hot-toast';

// Sabit renkler tanımlayalım
const defaultColors = ["#23A6F0", "#23856D", "#E77C40", "#252B42"];

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productId, id } = useParams();
  const history = useHistory();
  console.log('URL Params:', useParams()); // Tüm parametreleri görelim
  
  // Son parametreyi ID olarak kullanalım
  const actualProductId = productId || id;
  console.log('Actual Product ID:', actualProductId);
  
  const { currentProduct, productList, loading } = useSelector(state => state.product);
  
  // Slider için state
  const [mainImage, setMainImage] = useState('');
  
  useEffect(() => {
    if (actualProductId) {
      dispatch(fetchProductById(actualProductId));
    }
    
    // Bestseller ürünleri için özel parametreler
    dispatch(fetchProducts({ 
      sortBy: 'sell_count',
      order: 'desc',
      limit: 8 
    }));
  }, [dispatch, actualProductId]);

  useEffect(() => {
    // currentProduct değiştiğinde mainImage'i güncelle
    if (currentProduct?.images?.[0]?.url) {
      setMainImage(currentProduct.images[0].url);
    }
  }, [currentProduct]);

  // Sepete ekle fonksiyonu
  const handleAddToCart = () => {
    if (currentProduct) {
      console.log('Adding to cart:', currentProduct); // Debug için
      dispatch(addToCart(currentProduct, 1));
      toast.success('Product added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 py-6">
        <button 
          onClick={() => history.goBack()}
          className="flex items-center gap-1 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
        <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
        <Link to="/shop" className="text-[#252B42] hover:text-[#23A6F0] transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
        <span className="text-[#BDBDBD]">{currentProduct.name}</span>
      </div>

      {/* Section 1: Product Images & Info */}
      <section className="px-4 mb-8">
        <div className="flex flex-col md:flex-row md:gap-8 max-w-7xl mx-auto">
          {/* Sol Taraf - Resimler */}
          <div className="w-full md:w-1/2">
            {/* Ana Resim */}
            <div className="relative mb-4">
              <img 
                src={currentProduct?.images?.[0]?.url || "https://via.placeholder.com/500x500?text=Main+Product+Image"}
                alt={currentProduct?.name || "Product Main Image"} 
                className="w-full aspect-square object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x500?text=Main+Product+Image";
                }}
              />
            </div>

            {/* Küçük Resimler */}
            <div className="flex gap-2">
              {(currentProduct?.images || [1, 2, 3]).map((img, idx) => (
                <img 
                  key={idx}
                  src={img.url || `https://via.placeholder.com/150x150?text=Thumbnail+${idx + 1}`}
                  alt={`${currentProduct?.name || 'Product'} view ${idx + 1}`}
                  className="w-[30%] aspect-square object-cover cursor-pointer"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150x150?text=Thumbnail+${idx + 1}`;
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="space-y-6">
              <h2 className="text-[#252B42] text-2xl font-bold">
                {currentProduct?.name}
              </h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(currentProduct?.rating || 0) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-[#737373]">Rating: {currentProduct?.rating || 0}</span>
              </div>

              {/* Price & Availability */}
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[#252B42]">
                  ${currentProduct?.price?.toFixed(2) || '0.00'}
                </p>
                <p className="text-base">
                  Availability : 
                  <span className="text-[#23A6F0] ml-2">
                    {currentProduct?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="text-[#737373] text-base leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Color Options */}
              <div className="flex gap-3">
                {/* API'den colors gelirse onu, gelmezse default renkleri kullan */}
                {(currentProduct?.colors || defaultColors).map((color, idx) => (
                  <button 
                    key={idx}
                    className={`w-8 h-8 rounded-full`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#23A6F0] text-white px-6 py-4 rounded hover:bg-[#1a7ab3] transition-colors"
                >
                  <span className="text-base">Add to Cart</span>
                </button>
                <div className="flex gap-3">
                  <button className="p-4 rounded-full hover:bg-gray-100">
                    <Heart className="w-6 h-6 text-[#252B42]" />
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
              src={currentProduct?.images?.[0]?.url || "https://via.placeholder.com/600x400?text=Technical+Details+Image"}
              alt={currentProduct?.name || "Technical Details"} 
              className="w-full aspect-video object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Technical+Details+Image";
              }}
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
          
          {loading ? (
            <div className="flex justify-center">
              <motion.div
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <>
              {/* Web View */}
              <div className="hidden md:flex flex-wrap justify-between gap-y-12">
                {productList.map(product => (
                  <div key={product.id} className="w-[23%]">
                    <ProductCard2 
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      images={product.images}
                    />
                  </div>
                ))}
              </div>
              
              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-4">
                {productList.slice(0, 4).map(product => (
                  <ProductCard2 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    images={product.images}
                  />
                ))}
              </div>
            </>
          )}
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