import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
            {/* Company Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Buy-Item</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent service.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>contact@buyitem.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>123 Shopping Street, NY, USA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 Buy-Item. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer; 