import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Search, User, Menu, X, Phone,
  Mail, Instagram, Youtube, Facebook, Twitter,
  ChevronDown, Heart
} from 'lucide-react';
import { headerData } from '../data/index';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

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
                <Link 
                  to="/shop"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </nav>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* User Icon - Desktop Only */}
              <Link 
                to="/auth"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="whitespace-nowrap">Login/Register</span>
              </Link>

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

              {/* Heart Icon */}
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-primary transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
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
                <nav className="flex flex-col p-4">
                  {headerData.navigation.mainLinks.map(({ id, text, path }) => (
                    <Link 
                      key={id}
                      to={path} 
                      className="py-3 text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {text}
                    </Link>
                  ))}
                  <Link 
                    to="/shop"
                    className="py-3 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="border-t">
                <div className="flex flex-col p-4 gap-4">
                  <Link 
                    to="/auth"
                    className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Login/Register</span>
                  </Link>

                  <Link
                    to="/search"
                    className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shopping Cart</span>
                    <span className="ml-auto bg-[#23A6F0] text-white text-xs px-2 py-1 rounded-full">0</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
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