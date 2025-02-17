import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductCard2 from '../components/ProductCard2';
import { homeData } from '../data/index';
import Carousel from '../components/Carousel';
import NeuralSection from '../components/NeuralSection';
import ArticleCard from '../components/ArticleCard';

import Slider from '../components/Slider.jsx';

const HomePage = () => {
  return (

    
    <div className="w-full">
{/* Hero Section */}
<div className="w-full">
        <Slider />
      </div>

      {/* Editor's Pick Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {homeData.editorsPick.title}
          </h2>
          {/* Flex Container */}
          <div className="hidden md:flex gap-4">
            {/* MEN */}
            <div className="w-5/12 relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={homeData.editorsPick.categories[0].image}
                alt={homeData.editorsPick.categories[0].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <Link
                  to={homeData.editorsPick.categories[0].link}
                  className="absolute bottom-4 left-4 bg-white text-gray-900 px-8 py-3 rounded-lg 
                           font-medium hover:bg-gray-100 transition-colors duration-200 min-w-[160px] text-center"
                >
                  {homeData.editorsPick.categories[0].name}
                </Link>
              </div>
            </div>

            {/* WOMEN */}
            <div className="w-5/12 relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={homeData.editorsPick.categories[1].image}
                alt={homeData.editorsPick.categories[1].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <Link
                  to={homeData.editorsPick.categories[1].link}
                  className="absolute bottom-4 left-4 bg-white text-gray-900 px-8 py-3 rounded-lg 
                           font-medium hover:bg-gray-100 transition-colors duration-200 min-w-[160px] text-center"
                >
                  {homeData.editorsPick.categories[1].name}
                </Link>
              </div>
            </div>

            {/* Right Stack (ACCESSORIES & KIDS) */}
            <div className="w-2/12 flex flex-col gap-4">
              {/* ACCESSORIES */}
              <div className="relative h-[calc(50%-8px)] overflow-hidden rounded-lg">
                <img
                  src={homeData.editorsPick.categories[2].image}
                  alt={homeData.editorsPick.categories[2].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <Link
                    to={homeData.editorsPick.categories[2].link}
                    className="absolute bottom-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-lg 
                             font-medium hover:bg-gray-100 transition-colors duration-200 text-sm text-center w-[calc(100%-32px)]"
                  >
                    {homeData.editorsPick.categories[2].name}
                  </Link>
                </div>
              </div>

              {/* KIDS */}
              <div className="relative h-[calc(50%-8px)] overflow-hidden rounded-lg">
                <img
                  src={homeData.editorsPick.categories[3].image}
                  alt={homeData.editorsPick.categories[3].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <Link
                    to={homeData.editorsPick.categories[3].link}
                    className="absolute bottom-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-lg 
                             font-medium hover:bg-gray-100 transition-colors duration-200 text-sm text-center w-[calc(100%-32px)]"
                  >
                    {homeData.editorsPick.categories[3].name}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View - Mevcut görünüm korundu */}
          <div className="md:hidden space-y-6">
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
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            BESTSELLER PRODUCTS
          </h3>
          {/* Web View */}
          <div className="hidden md:flex flex-wrap justify-center gap-y-16">
            {homeData.products.items.map((product) => (
              <div key={product.id} className="w-1/4 px-4">
                <ProductCard2 {...product} />
              </div>
            ))}
          </div>
          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4">
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
          {/* Web View */}
          <div className="hidden md:flex flex-wrap gap-8 justify-center">
            {homeData.featuredArticles.articles.map(article => (
              <div key={article.id} className="w-[calc(33.333%-1.5rem)]">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          {/* Mobile View */}
          <div className="md:hidden flex flex-col">
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