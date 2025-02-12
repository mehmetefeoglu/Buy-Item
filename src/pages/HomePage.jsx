import React from 'react';
import Slider from '../components/Slider.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ArrowRight } from 'lucide-react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: [
        {
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
          title: "Welcome to Buy-Item",
          description: "Discover Amazing Products at Great Prices",
          button: "Shop Now"
        },
        {
          image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
          title: "Summer Collection",
          description: "Get Ready for Summer with Our Latest Collection",
          button: "View Collection"
        }
      ],
      featuredProducts: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          discount: 20,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          discount: 15,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        },
        {
          id: 3,
          name: "Laptop Pro",
          price: 1299.99,
          discount: 10,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
        },
        {
          id: 4,
          name: "Premium Camera",
          price: 799.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
        }
      ],
      categories: [
        {
          name: "Electronics",
          image: "https://images.unsplash.com/photo-1498049794561-7780e7231661"
        },
        {
          name: "Fashion",
          image: "https://images.unsplash.com/photo-1445205170230-053b83016050"
        },
        {
          name: "Home & Living",
          image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a"
        },
        {
          name: "Sports",
          image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
        }
      ]
    };
  }

  render() {
    return (
      <div className="min-h-screen">
        {/* Hero Slider */}
        <section className="relative">
          <Slider slides={this.state.sliderData} />
        </section>

        {/* Featured Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
              <a href="#" className="text-primary hover:text-primary-dark flex items-center">
                View All <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {this.state.categories.map((category, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <a href="#" className="text-primary hover:text-primary-dark flex items-center">
                View All <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {this.state.featuredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Stay updated with our latest products, exclusive offers, and shopping tips.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark px-8 py-2 rounded-full transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage; 