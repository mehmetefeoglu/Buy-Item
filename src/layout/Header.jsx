import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X, 
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  ChevronDown,
  Heart
} from 'lucide-react';
import Slider from '../components/Slider.jsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const shopCategories = {
    women: ['Bags', 'Belts', 'Cosmetics', 'Hats'],
    men: ['Bags', 'Belts', 'Cosmetics', 'Hats']
  };

  return (
    <header className="relative">
      {/* Top Bar - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 h-10">
          <div className="h-full flex items-center justify-between">
            {/* Contact Info Group */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(225) 555-0118</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">michelle.rivera@example.com</span>
              </div>
            </div>

            {/* Promotion Text */}
            <div className="text-sm font-medium">
              Follow Us and get a chance to win 80% off
            </div>

            {/* Social Media Group */}
            <div className="flex items-center space-x-4">
              <span className="text-sm">Follow Us:</span>
              <div className="flex items-center space-x-3">
                <a href="#" className="hover:text-primary transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-12">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-primary shrink-0">
                Buy-Item
              </Link>

              {/* Desktop Navigation - Hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                  Home
                </Link>
                
                {/* Shop Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
                  >
                    <span>Shop</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Shop Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-6 flex gap-8">
                      {/* Women's Category */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-4">Women</h3>
                        <ul className="space-y-2">
                          {shopCategories.women.map((item, index) => (
                            <li key={`women-${index}`}>
                              <Link 
                                to={`/shop/women/${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-primary transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Men's Category */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-4">Men</h3>
                        <ul className="space-y-2">
                          {shopCategories.men.map((item, index) => (
                            <li key={`men-${index}`}>
                              <Link 
                                to={`/shop/men/${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-primary transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/pages" className="text-gray-700 hover:text-primary transition-colors">
                  Pages
                </Link>
              </nav>
            </div>

            {/* Right Side Icons & Buttons */}
            <div className="flex items-center space-x-6">
              {/* Login/Register Button - Hidden on mobile */}
              <Link 
                to="/auth"
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors group"
              >
                <User className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors" />
                <span className="text-inherit">Login/Register</span>
              </Link>

              {/* Search Button with Hover Effect */}
              <Link
                to="/search"
                className="text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>

              {/* Cart Button with Counter */}
              <Link
                to="/cart"
                className="text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Wishlist Button - Hidden on mobile */}
              <Link
                to="/wishlist"
                className="hidden md:flex text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
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
          <nav
            className={`${
              isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
            } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col space-y-2 py-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-center"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-center"
              >
                Products
              </Link>
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-center"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-center"
              >
                Contact
              </Link>

              {/* Mobile Login Button */}
              <Link
                to="/auth"
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                <User className="h-5 w-5" />
                <span>Login/Register</span>
              </Link>

              {/* Mobile Wishlist Button */}
              <Link
                to="/wishlist"
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
            </div>
          </nav>
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