import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/clientActions';
import { fetchCategories } from '../store/actions/productActions';
import { 
  ShoppingBag, Search, User, Menu, X, Phone,
  Mail, Instagram, Youtube, Facebook, Twitter,
  ChevronDown
} from 'lucide-react';
import { headerData } from '../data/index';
import Gravatar from 'react-gravatar';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isShopPage = location.pathname === '/shop';
  const user = useSelector(state => state.client.user);
  const categories = useSelector(state => state.product.categories);
  const loading = useSelector(state => state.product.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Kategorileri erkek ve kadın olarak grupla
  const groupedCategories = {
    men: categories.filter(cat => cat.gender === 'e'),
    women: categories.filter(cat => cat.gender === 'k')
  };

  // Top 5 kategoriyi al
  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header className="relative">
      {/* Top Bar */}
      <div className="bg-[#252B42] text-white py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            {/* Center Text */}
            <div>
              <p>Follow Us and get a chance to win 80% off</p>
            </div>

            {/* Right Side - Social Links */}
            <div className="flex items-center gap-4">
              <span>Follow Us :</span>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <Youtube className="h-4 w-4" />
                <Facebook className="h-4 w-4" />
                <Twitter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-primary">
                {headerData.navigation.logo}
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {headerData.navigation.mainLinks.map(({ id, text, path }) => (
                  <Link 
                    key={id}
                    to={path} 
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    {text}
                  </Link>
                ))}
                
                {/* Shop Dropdown - Eski tasarıma göre */}
                <div className="relative group">
                  <button
                    className="flex items-center gap-1 text-gray-700 group-hover:text-primary transition-colors"
                    onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
                  >
                    Shop
                    <ChevronDown className={`h-4 w-4 transition-transform ${isShopMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Shop Dropdown Menu */}
                  {isShopMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-[500px] bg-white border border-gray-200 rounded-md shadow-lg py-4">
                      <div className="flex">
                        {/* Women Categories */}
                        <div className="w-1/2 border-r border-gray-200 px-4">
                          <h3 className="font-medium text-gray-900 mb-4">Women</h3>
                          <div className="space-y-2">
                            {groupedCategories.women.map(category => (
                              <Link
                                key={category.id}
                                to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title}/${category.id}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsShopMenuOpen(false)}
                              >
                                {category.title}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Men Categories */}
                        <div className="w-1/2 px-4">
                          <h3 className="font-medium text-gray-900 mb-4">Men</h3>
                          <div className="space-y-2">
                            {groupedCategories.men.map(category => (
                              <Link
                                key={category.id}
                                to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title}/${category.id}`}
                                className="block text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsShopMenuOpen(false)}
                              >
                                {category.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* User Info - Gravatar kısmı */}
              {user?.email && (
                <div className="flex items-center gap-2">
                  <Gravatar email={user.email} size={32} className="rounded-full" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              )}

              {/* User Icon - Desktop Only */}
              {user?.email ? (
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="whitespace-nowrap">Logout</span>
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="whitespace-nowrap">Login/Register</span>
                </Link>
              )}

              {/* Mobile Profile Icon */}
              {user?.email ? (
                <button
                  onClick={handleLogout}
                  className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                  aria-label="Logout"
                >
                  <User className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              {/* Search Icon */}
              <Link
                to="/search"
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-primary transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link 
                  to="/" 
                  className="text-2xl font-bold text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {headerData.navigation.logo}
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {headerData.navigation.mainLinks.map(({ id, text, path }) => (
                    <Link
                      key={id}
                      to={path}
                      className="block text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {text}
                    </Link>
                  ))}
                  
                  {/* Shop Categories in Mobile */}
                  <div className="space-y-4">
                    <div className="font-medium text-gray-900">Shop</div>
                    
                    {/* Women Categories */}
                    <div className="space-y-2">
                      <div className="pl-4 text-sm font-medium text-gray-700">Women</div>
                      {groupedCategories.women.map(category => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title}/${category.id}`}
                          className="block pl-8 text-sm text-gray-600 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>

                    {/* Men Categories */}
                    <div className="space-y-2">
                      <div className="pl-4 text-sm font-medium text-gray-700">Men</div>
                      {groupedCategories.men.map(category => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title}/${category.id}`}
                          className="block pl-8 text-sm text-gray-600 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>

                    {/* View All Link */}
                    <Link
                      to="/shop"
                      className="block pl-4 text-primary hover:text-primary-dark transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Products
                    </Link>
                  </div>

                  {user?.email ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Login/Register</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 