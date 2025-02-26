import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { withRouter } from 'react-router-dom';

const ProductCard2 = ({ 
  id, 
  name, 
  description, 
  price,
  images = [],
  history,
  location
}) => {
  // Sabit renk seçenekleri - 2. ve 4. renk yeşil (#23856D)
  const colors = ["#23A6F0", "#23856D", "#E77C40", "#23856D"];

  const handleClick = (e) => {
    e.preventDefault();
    
    // Ürün adından URL-friendly slug oluştur
    const slug = name.toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Mevcut URL'den parametreleri al
    const pathParts = location.pathname.split('/');
    const isShopPage = location.pathname.includes('/shop');
    
    if (isShopPage && pathParts.length >= 5) {
      // Shop sayfasındayken mevcut parametreleri kullan
      const gender = pathParts[2];
      const categoryName = pathParts[3];
      const categoryId = pathParts[4];
      history.push(`/shop/${gender}/${categoryName}/${categoryId}/${slug}/${id}`);
    } else {
      // Ana sayfadayken varsayılan parametrelerle yönlendir
      history.push(`/shop/all/all/0/${slug}/${id}`);
    }
    
    console.log('Navigating to product:', { id, name, slug, path: location.pathname });
  };

  // Resim URL'sini güvenli bir şekilde al ve kontrol et
  const imageUrl = images?.[0]?.url || 'https://via.placeholder.com/300x400?text=No+Image';

  return (
    <div 
      className="bg-white p-4 flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative group aspect-[3/4] mb-4">
        <img 
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Resim yüklenemedi:', imageUrl);
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 bg-white rounded-full hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-5 h-5 text-[#252B42]" />
          </button>
          <button 
            className="p-2 bg-white rounded-full hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart className="w-5 h-5 text-[#252B42]" />
          </button>
          <button 
            className="p-2 bg-white rounded-full hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-5 h-5 text-[#252B42]" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col items-center text-center">
        <h3 className="text-base font-bold text-[#252B42] mb-2 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-[#737373] mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#23856D] font-bold">{price?.toFixed(2)} TL</span>
        </div>

        {/* Color Options */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {colors.map((color, index) => (
            <button 
              key={`${id}-${color}-${index}`}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductCard2); 