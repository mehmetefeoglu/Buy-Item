import { memo } from 'react';
import SlickSlider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = memo(({ className, onClick, direction }) => (
  <button
    className={`absolute z-20 top-1/2 -translate-y-1/2 
    ${direction === 'next' ? 'right-4 md:right-8' : 'left-4 md:left-8'}
    w-[3.5rem] h-[3.5rem] md:w-16 md:h-16 flex items-center justify-center
    text-white/90 hover:text-white
    rounded-full
    transition-all duration-300 hover:scale-110
    group`}
    onClick={onClick}
    aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
  >
    {direction === 'next' ? (
      <ChevronRight className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:translate-x-0.5" />
    ) : (
      <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:-translate-x-0.5" />
    )}
  </button>
));

const Slider = () => {
  const slides = [
    {
      image: "https://picsum.photos/seed/1/640/960",
      imageLarge: "https://picsum.photos/seed/1/1920/1080",
      title: "Spring Collection 2024",
      description: "Discover our latest fashion trends",
      button: "Shop Now"
    },
    {
      image: "https://picsum.photos/seed/2/640/960",
      imageLarge: "https://picsum.photos/seed/2/1920/1080",
      title: "Summer Essentials",
      description: "Get ready for the perfect summer",
      button: "View Collection"
    },
    {
      image: "https://picsum.photos/seed/3/640/960",
      imageLarge: "https://picsum.photos/seed/3/1920/1080",
      title: "New Arrivals",
      description: "Be the first to explore our newest items",
      button: "Explore"
    }
  ];

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
    dotsClass: "slick-dots custom-dots",
    customPaging: () => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200" />
    ),
    accessibility: true,
    focusOnSelect: false,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          arrows: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="relative">
      <div className="hero-section">
        <SlickSlider {...settings}>
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="relative h-[calc(100vh-4rem)]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <picture>
                <source media="(min-width: 640px)" srcSet={slide.imageLarge} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div 
                className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="text-center text-white px-4 max-w-xs sm:max-w-2xl mx-auto">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8 text-gray-100">
                    {slide.description}
                  </p>
                  <button 
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-lg font-medium transition duration-300 transform hover:scale-105"
                    aria-label={slide.button}
                  >
                    {slide.button}
                  </button>
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