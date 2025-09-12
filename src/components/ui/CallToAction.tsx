import React from 'react';
import { Link } from 'react-router-dom';

interface CTAButton {
  text: string;
  link: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary';
}

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttons: CTAButton[];
}

const CallToAction: React.FC<CallToActionProps> = ({ title, subtitle, buttons }) => {
  return (
    <section className="py-8 bg-black">
      <div className="p-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.link}
              className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
                button.variant === 'primary'
                  ? 'bg-white text-black hover:bg-gray-100 transform hover:scale-105'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {button.icon}
              <span>{button.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;