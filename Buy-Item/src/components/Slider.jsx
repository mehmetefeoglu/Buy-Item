import React from 'react';
import SlickSlider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CustomArrow extends React.Component {
  render() {
    const { className, onClick, direction } = this.props;
    return (
      <button
        className={`${className} absolute z-10 top-1/2 transform -translate-y-1/2 
        ${direction === 'next' ? 'right-4' : 'left-4'}
        bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg
        transition duration-200 hover:scale-110`}
        onClick={onClick}
      >
        {direction === 'next' ? (
          <ChevronRight className="h-6 w-6" />
        ) : (
          <ChevronLeft className="h-6 w-6" />
        )}
      </button>
    );
  }
}

class Slider extends React.Component {
  render() {
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
      customPaging: (i) => (
        <div className="w-3 h-3 mx-1 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200" />
      ),
    };

    return (
      <div className="relative">
        <SlickSlider {...settings}>
          {this.props.slides.map((slide, index) => (
            <div key={index} className="relative h-[60vh] md:h-[80vh]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                  {slide.button && (
                    <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg transition duration-300">
                      {slide.button}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </SlickSlider>
      </div>
    );
  }
}

export default Slider; 