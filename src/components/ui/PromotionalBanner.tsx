import React from 'react';
import { Link } from 'react-router-dom';

interface PromotionalBannerProps {
  backgroundImage: string;
  link: string;
  alt: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ backgroundImage, link, alt }) => {
  return (
    <section className="py-6 bg-black">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="relative">
          <Link to={link} onClick={() => window.scrollTo(0, 0)} className="block">
            <div className="relative rounded-2xl p-8 border border-blue-400/30 overflow-hidden h-80 opacity-100 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;