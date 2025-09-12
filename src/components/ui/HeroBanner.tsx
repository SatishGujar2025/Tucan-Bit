import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from '../../assets/banner.png' 

const slides = [
  {
    title: "Welcome to TucanBit Casino",
    description: "Experience...",
    buttonText: "Play Now",
    bgImage: banner,
  },
  {
    title: "Spin & Win Big!",
    description: "Join exciting...",
    buttonText: "Start Spinning",
    bgImage: banner,
  },
  {
    title: "Exclusive Rewards",
    description: "Unlock daily...",
    buttonText: "Claim Bonus",
    bgImage: banner,
  },
];
 
const PrevArrow = ({ onClick }) => {
  return (
<button
      type="button"
      aria-label="Previous slide"
      onClick={onClick}
      className="absolute top-1/2 left-0 -translate-y-1/2 z-30 flex items-center justify-center
                 w-6 h-14 md:w-6 md:h-20 
                 bg-[#202328] shadow-lg text-white 
                 rounded-r-2xl md:rounded-r-3xl"
>
<svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 md:h-3 md:w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
>
<path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
</svg>
</button>
  );
};
 
const NextArrow = ({ onClick }) => {
  return (
<button
      type="button"
      aria-label="Next slide"
      onClick={onClick}
      className="absolute top-1/2 right-0 -translate-y-1/2 z-30 flex items-center justify-center
                     w-6 h-14 md:w-6 md:h-20 
                 bg-[#202328] shadow-lg text-white 
                 rounded-l-2xl md:rounded-l-3xl"
>
<svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 md:h-3 md:w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
>
<path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
</svg>
</button>
  );
};
 
const HeroBanner = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerMode: false,
  };
 
  return (
<div className="w-full max-w-[1295px] mx-auto relative overflow-visible">
<Slider {...settings} className="relative rounded-lg">
        {slides.map((slide, index) => (
<div key={index} className="relative w-full">
            {/* image should take full width */}
<div className="relative w-full h-[60vh] md:h-[72vh] lg:h-[80vh]">
<img
                src={slide.bgImage}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
</div>
 
            {/* content overlay */}
<div className="absolute inset-0 z-20 flex items-center pointer-events-none">
<div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20 flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
<motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-5xl font-extrabold leading-tight text-white"
>
                  {slide.title}
</motion.h1>
 
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 text-lg text-gray-200 max-w-2xl"
>
                  {slide.description}
</motion.p>
 
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300"
                  type="button"
>
                  {slide.buttonText}
</motion.button>
</div>
</div>
</div>
        ))}
</Slider>
</div>
  );
};
 
export default HeroBanner;