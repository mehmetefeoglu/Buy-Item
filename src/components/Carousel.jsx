import { memo } from 'react';
import SlickSlider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomArrow = memo(({ className, onClick, direction }) => (
  <button
    className={`absolute z-20 top-1/2 -translate-y-1/2 
    ${direction === 'next' ? 'right-4 md:right-8' : 'left-4 md:left-8'}
    w-24 h-24 flex items-center justify-center
    text-white hover:text-white/80
    transition-all duration-200`}
    onClick={onClick}
  >
    {direction === 'next' ? (
      <ChevronRight className="w-14 h-14" />
    ) : (
      <ChevronLeft className="w-14 h-14" />
    )}
  </button>
));

const Carousel = ({ slides }) => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
      <SlickSlider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[1200px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center z-20">
              <div className="w-full px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="w-10" />
                  <div className="text-center text-white -translate-y-32">
                    <p className="text-sm uppercase tracking-wider mb-6">{slide.smallTitle}</p>
                    <h2 className="text-4xl font-bold mb-6">{slide.title}</h2>
                    <p className="text-lg mb-6 max-w-xl mx-auto">{slide.description}</p>
                    <p className="text-2xl font-bold mb-8">${slide.price.toFixed(2)}</p>
                    <button className="bg-[#2DC071] hover:bg-[#25a35f] text-white px-10 py-4 rounded 
                                   transition-colors duration-200 font-bold text-lg">
                      {slide.buttonText}
                    </button>
                  </div>
                  <div className="w-10" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default Carousel; 