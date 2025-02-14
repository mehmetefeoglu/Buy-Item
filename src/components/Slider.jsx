import { memo } from 'react';
import { Link } from 'react-router-dom';
import SlickSlider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { homeData } from '../data/index';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = memo(({ className, onClick, direction }) => (
  <button
    className={`absolute z-20 top-1/2 -translate-y-1/2 
    ${direction === 'next' ? 'right-4 md:right-8' : 'left-4 md:left-8'}
    w-10 h-10 flex items-center justify-center rounded-full
    bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900
    transition-all duration-200 shadow-md`}
    onClick={onClick}
  >
    {direction === 'next' ? (
      <ChevronRight className="w-6 h-6" />
    ) : (
      <ChevronLeft className="w-6 h-6" />
    )}
  </button>
));

const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    customPaging: () => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200" />
    )
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 z-10" />
      <div className="relative">
        <SlickSlider {...settings}>
          {homeData.slider.slides.map((slide) => (
            <div key={slide.id} className="relative h-[calc(100vh-4rem)]">
              <picture>
                <source media="(min-width: 640px)" srcSet={slide.imageLarge} />
                <img
                  src={slide.imageSmall}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-xl md:text-2xl mb-4">{slide.subtitle}</p>
                  <p className="text-lg mb-8 max-w-2xl mx-auto">{slide.description}</p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </SlickSlider>
      </div>
    </div>
  );
};

export default Slider; 