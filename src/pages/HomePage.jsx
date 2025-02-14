import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCard2 from '../components/ProductCard2';
import { homeData } from '../data/index';
import Carousel from '../components/Carousel';
import NeuralSection from '../components/NeuralSection';
import ArticleCard from '../components/ArticleCard';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Editor's Pick Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {homeData.editorsPick.title}
          </h2>
          <div className="space-y-6">
            {homeData.editorsPick.categories.map((category) => (
              <div key={category.id} className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <Link
                    to={category.link}
                    className="absolute bottom-4 left-4 bg-white text-gray-900 px-8 py-3 rounded-lg 
                             font-medium hover:bg-gray-100 transition-colors duration-200 min-w-[160px] text-center"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-5">
            {homeData.products.title}
          </h2>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            BESTSELLER PRODUCTS
          </h3>
          <div className="flex flex-wrap -mx-2">
            {homeData.products.items.map(product => (
              <ProductCard2 key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section className="mt-8">
        <Carousel slides={homeData.carousel.slides} />
      </section>

      {/* Neural Section */}
      <NeuralSection data={homeData.neuralSection} />

      {/* Featured Articles Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Link 
              to="/practice-advice"
              className="inline-block text-[#23A6F0] text-sm mb-4 hover:text-[#1a7ab3] transition-colors"
            >
              {homeData.featuredArticles.subtitle}
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              {homeData.featuredArticles.title}
            </h2>
          </div>
          <div className="flex flex-col">
            {homeData.featuredArticles.articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 