import { Link } from 'react-router-dom';

const NeuralSection = ({ data }) => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <span className="text-sm text-gray-400 tracking-wider">
              {data.smallTitle}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              {data.title}
            </h2>
            <p className="text-base text-gray-900 max-w-xl">
              {data.description}
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to={data.buttons.primary.link}
                className="px-10 py-4 bg-[#2DC071] text-white font-bold rounded hover:bg-[#25a35f] 
                         transition-colors duration-200"
              >
                {data.buttons.primary.text}
              </Link>
              <Link
                to={data.buttons.secondary.link}
                className="px-10 py-4 bg-white text-[#2DC071] font-bold rounded border-2 
                         border-[#2DC071] hover:bg-[#2DC071] hover:text-white
                         transition-colors duration-200"
              >
                {data.buttons.secondary.text}
              </Link>
            </div>
            <div className="w-full mt-8">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Web View */}
        <div className="hidden md:flex gap-8 items-center">
          {/* Left Side - Image */}
          <div className="w-1/2">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Right Side - Content */}
          <div className="w-1/2 flex flex-col space-y-8">
            <span className="text-sm text-gray-400 tracking-wider">
              {data.smallTitle}
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              {data.title}
            </h2>
            <p className="text-lg text-gray-900">
              {data.description}
            </p>
            <div className="flex gap-4">
              <Link
                to={data.buttons.primary.link}
                className="px-10 py-4 bg-[#2DC071] text-white font-bold rounded hover:bg-[#25a35f] 
                         transition-colors duration-200"
              >
                {data.buttons.primary.text}
              </Link>
              <Link
                to={data.buttons.secondary.link}
                className="px-10 py-4 bg-white text-[#2DC071] font-bold rounded border-2 
                         border-[#2DC071] hover:bg-[#2DC071] hover:text-white
                         transition-colors duration-200"
              >
                {data.buttons.secondary.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralSection; 