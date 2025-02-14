import { Link } from 'react-router-dom';

const NeuralSection = ({ data }) => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto h-[900px]"> {/* Carousel'in 1200px'inin %75'i */}
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          {/* Small Title */}
          <span className="text-sm text-gray-400 tracking-wider">
            {data.smallTitle}
          </span>

          {/* Main Title */}
          <h2 className="text-3xl font-bold text-gray-900">
            {data.title}
          </h2>

          {/* Description */}
          <p className="text-base text-gray-900 max-w-xl">
            {data.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <Link
              to={data.buttons.primary.link}
              className="px-10 py-4 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a7ab3] 
                       transition-colors duration-200"
            >
              {data.buttons.primary.text}
            </Link>

            <Link
              to={data.buttons.secondary.link}
              className="px-10 py-4 bg-white text-[#23A6F0] font-bold rounded border-2 
                       border-[#23A6F0] hover:bg-[#23A6F0] hover:text-white
                       transition-colors duration-200"
            >
              {data.buttons.secondary.text}
            </Link>
          </div>

          {/* Image */}
          <div className="w-full mt-8">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralSection; 