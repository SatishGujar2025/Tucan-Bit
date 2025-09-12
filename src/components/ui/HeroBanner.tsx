import React from 'react';
import bannerImage from "../../assets/Home/first-sec.svg";

interface HeroBannerProps {
  onPlayNow?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onPlayNow }) => {
  return (
    <div className="relative w-full">
      <img
        className="w-full"
        src={bannerImage}
        alt="banner"
      />
      
      <button
        onClick={onPlayNow}
        className="absolute top-[28rem] left-[10rem] -translate-x-1/2 -translate-y-1/2 
                   bg-blue-600 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-blue-700"
      >
        Play Now
      </button>
    </div>
  );
};

export default HeroBanner;