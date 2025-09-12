import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, features }) => {
  return (
    <section className="py-4 bg-black">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;