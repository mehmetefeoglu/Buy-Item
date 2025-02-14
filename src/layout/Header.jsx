import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, User, Menu, X, Phone,
  Mail, Instagram, Youtube, Facebook, Twitter,
  ChevronDown, Heart
} from 'lucide-react';
import { headerData } from '../data/index';
import Slider from '../components/Slider.jsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  // Icon mapping objesi
  const IconMap = {
    Instagram: Instagram,
    Youtube: Youtube,
    Facebook: Facebook,
    Twitter: Twitter,
    Phone: Phone,
    Mail: Mail
  };

  return (
    <header className="relative">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between py-2">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">{headerData.topBar.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">{headerData.topBar.contact.email}</span>
              </div>
            </div>

            {/* Center Text - Hidden on smaller screens */}
            <div className="hidden lg:block text-sm font-medium">
              {headerData.topBar.promoText}
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm whitespace-nowrap">Follow Us:</span>
              <div className="flex items-center gap-3">
                {headerData.topBar.socialLinks.map(({ id, icon, url }) => {
                  const Icon = IconMap[icon];
                  return (
                    <a key={id} href={url} className="hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
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
              <Link to="/" className="text-2xl font-bold text-primary whitespace-nowrap">
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
                
                {/* Shop Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
                  >
                    <span>Shop</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Shop Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-6 grid grid-cols-2 gap-8">
                      {Object.entries(headerData.navigation.shopCategories).map(([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-gray-900 mb-4 capitalize">{category}</h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item}>
                                <Link 
                                  to={`/shop/${category}/${item.toLowerCase()}`}
                                  className="text-gray-600 hover:text-primary transition-colors"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Login/Register - Hidden on mobile */}
              <Link 
                to="/auth"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="whitespace-nowrap">Login/Register</span>
              </Link>

              {/* Action Icons */}
              <Link
                to="/search"
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

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

              <Link
                to="/wishlist"
                className="hidden md:block p-2 text-gray-600 hover:text-primary transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <nav className="py-4 space-y-2">
              {headerData.navigation.mainLinks.map(({ id, text, path }) => (
                <Link
                  key={id}
                  to={path}
                  className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
                >
                  {text}
                </Link>
              ))}
              <Link
                to="/auth"
                className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
              >
                Login/Register
              </Link>
              <Link
                to="/wishlist"
                className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
              >
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full">
        <Slider />
      </div>
    </header>
  );
};

export default Header; 