import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List, ChevronDown } from 'lucide-react';
import ProductCard2 from '../components/ProductCard2';
import { shopData } from '../data';
import { fetchCategories, fetchProducts } from '../store/actions/productActions';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { gender, categoryName, categoryId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // States
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  
  const { productList, total, loading } = useSelector(state => state.product);
  const itemsPerPage = isMobile ? 4 : 12;

  // URL'den query parametrelerini al
  const searchParams = new URLSearchParams(location.search);
  
  const categories = useSelector(state => state.product.categories);

  // Sıralama seçenekleri
  const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price Ascending', value: 'price:asc' },
    { label: 'Price Descending', value: 'price:desc' },
    { label: 'Rating Ascending', value: 'rating:asc' },
    { label: 'Rating Descending', value: 'rating:desc' }
  ];

  // Ekran boyutu değişikliğini dinle
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const queryParams = {
      ...(categoryId && { category: categoryId }),
      ...(gender && { gender: gender === 'kadin' ? 'k' : 'e' }),
      ...(filterTerm && { filter: filterTerm }),
      ...(sort && { sort }),
      page,
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage
    };
    
    dispatch(fetchProducts(queryParams));
  }, [categoryId, gender, filterTerm, sort, page, itemsPerPage]);

  // Top 5 kategoriyi al
  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Filtreleme değiştiğinde
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
    updateURL({ filter: e.target.value });
  };

  // URL'i güncelle
  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    history.push(`${location.pathname}?${newParams}`);
  };

  // Filtreleme modal'ı
  const handleSearch = () => {
    setFilterTerm(filter);
    setPage(1);
    updateURL({ filter: filter });
    setIsFilterOpen(false);
  };

  // Pagination butonlarını güncelle
  const totalPages = Math.ceil(total / itemsPerPage);
  const showPagination = total > itemsPerPage;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center py-2 text-[#252B42]">
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
      
      {/* Top Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Categories</h2>
        <div className="flex flex-wrap gap-4">
          {topCategories.map(category => (
            <Link
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title}/${category.id}`}
              className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-12px)] lg:w-[calc(20%-16px)] group relative overflow-hidden rounded-lg"
              onClick={() => {
                setPage(1);
                setFilterTerm(category.title);
                setFilter(category.title);
                updateURL({ 
                  filter: category.title,
                  category: category.id,
                  gender: category.gender === 'k' ? 'kadin' : 'erkek'
                });
              }}
            >
              <div className="relative pt-[100%]">
                <img 
                  src={category.img} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white font-medium text-lg">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    Rating: {category.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:justify-between items-center py-8 gap-4">
        {/* Sol Grup - Mobilde En Üstte */}
        <div className="w-full md:w-auto order-1 md:order-1">
          <span className="text-[#737373] block text-center md:text-left">Showing all {total} results</span>
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
        
        {/* Sağ Grup */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center order-3 md:order-3">
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-between gap-2 text-[#737373] border border-[#E9E9E9] px-4 py-2 rounded bg-white min-w-[160px]"
            >
              <span>{selectedSort}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div 
              className={`absolute top-full left-0 mt-1 w-full bg-white border border-[#E9E9E9] rounded shadow-lg z-10 transition-all duration-300 ${
                isSortOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              {sortOptions.map((option) => (
                <button 
                  key={option.value}
                  onClick={() => {
                    setSort(option.value);
                    setSelectedSort(option.label);
                    setIsSortOpen(false);
                    updateURL({ sort: option.value });
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-[#737373]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-5 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a7ab3] transition-colors"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Filtreleme Modal/Popup */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Filter Products</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={filter}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  setFilter('');
                  setFilterTerm('');
                  setIsFilterOpen(false);
                  updateURL({ filter: null });
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Clear
              </button>
              <button 
                onClick={handleSearch}
                className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a7ab3]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ürün Listesi */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="ml-4 text-gray-600">Loading products...</div>
          </div>
        ) : (
          <motion.div 
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {productList.map(product => (
              <motion.div
                key={product.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard2 
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  images={product.images}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex justify-center gap-2 py-8">
          <button 
            onClick={() => {
              setPage(1);
              updateURL({ page: 1 });
            }}
            disabled={page === 1}
            className={`px-4 py-2 rounded transition-colors ${
              page === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'text-[#23A6F0] border border-[#E9E9E9] hover:bg-[#23A6F0] hover:text-white'
            }`}
          >
            First
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
            .map((pageNum) => (
              <button 
                key={pageNum}
                onClick={() => {
                  setPage(pageNum);
                  updateURL({ page: pageNum });
                }}
                className={`px-4 py-2 rounded transition-colors ${
                  pageNum === page 
                    ? 'bg-[#23A6F0] text-white' 
                    : 'text-[#23A6F0] border border-[#E9E9E9] hover:bg-[#23A6F0] hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            ))}
          
          <button 
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              updateURL({ page: nextPage });
            }}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded transition-colors ${
              page >= totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'text-[#23A6F0] border border-[#E9E9E9] hover:bg-[#23A6F0] hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Brand Logos */}
      <div className="bg-[#FAFAFA] -mx-4 md:-mx-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center py-24 px-4 md:px-8">
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