import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { footerData } from '../data/index';

const Footer = () => {
  // Icon mapping objesi
  const IconMap = {
    Facebook: Facebook,
    Instagram: Instagram,
    Twitter: Twitter
  };

  return (
    <footer className="bg-white text-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Social Icons Row */}
        <div className="flex flex-col items-start md:flex-row md:justify-between pb-8 mb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            {footerData.logo}
          </h2>
          <div className="flex items-center space-x-6">
            {footerData.socialLinks.map(({ id, icon, url }) => {
              const Icon = IconMap[icon];
              return (
                <a 
                  key={id}
                  href={url} 
                  className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Footer Links */}
          {Object.entries(footerData.footerLinks).map(([title, links]) => (
            <div key={title} className="mb-6 md:mb-0">
              <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get In Touch Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-gray-900 font-semibold mb-4">Get In Touch</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full md:w-auto bg-gray-100 text-gray-900 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-sm text-gray-600">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 