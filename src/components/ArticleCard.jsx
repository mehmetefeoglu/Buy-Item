import { Link } from 'react-router-dom';
import { Clock, BarChart2, ChevronRight } from 'lucide-react';

const ArticleCard = ({ article }) => {
  return (
    <div className="w-full mb-8">
      {/* Image Container */}
      <div className="relative w-full">
        <div className="aspect-square w-full">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {article.isNew && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Content Container - Border top removed and attached to image */}
        <div className="border-b border-l border-r border-gray-200 p-6 h-full">
          {/* Categories */}
          <div className="flex gap-4 mb-4">
            {article.categories.map((category, index) => (
              <Link
                key={index}
                to="#"
                className={`text-sm ${index === 0 ? 'text-[#23A6F0]' : 'text-gray-600'}`}
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            {article.description}
          </p>

          {/* Meta Info */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-sm text-[#23A6F0]">
              <Clock className="w-4 h-4 mr-2 text-[#23A6F0]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BarChart2 className="w-4 h-4 mr-2" />
              <span>{article.comments} comments</span>
            </div>
          </div>

          {/* Learn More Link */}
          <Link
            to="#"
            className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-[#23A6F0] transition-colors group"
          >
            Learn More <ChevronRight className="w-4 h-4 ml-2 text-[#23A6F0] group-hover:text-[#23A6F0]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 