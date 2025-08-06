import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// To make this component work in your project, you must have Tailwind CSS installed.
// If you are using Create React App, follow this guide:
// https://tailwindcss.com/docs/guides/create-react-app

// The keyframe animations for the floating and eye-moving effects are included in the <style> tag below.
const keyframes: string = `
@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-15px);
  }
  100% {
    transform: translatey(0px);
  }
}
.toucan-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes look-around {
  0% { transform: translateX(0); }
  15% { transform: translateX(0); } /* Pause looking center */
  35% { transform: translateX(3px); } /* Glance to the right */
  65% { transform: translateX(3px); } /* Pause looking right */
  85% { transform: translateX(-3px); } /* Glance to the left */
  100% { transform: translateX(0); }
}
.eye-scan {
  animation: look-around 5s ease-in-out infinite;
}
`;

// This is our main component, now typed as a React Functional Component (React.FC).
// In a real app, you would likely name this component 'NotFoundPage'.
const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* We inject the CSS keyframes into the document's head */}
      <style>{keyframes}</style>
      
      {/* Main container for the 404 page.
        ADDED INLINE STYLE: A fallback background color is added here. 
        This ensures the page is not blank even if Tailwind CSS is not configured.
      */}
      <div 
        className="bg-gray-900 flex items-center justify-center min-h-screen text-white font-sans p-4"
        style={{ backgroundColor: '#111827' }} 
      >
        <div className="bg-gray-800 border-2 border-yellow-500 rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-2xl w-full">
          
          {/* Animated Toucan SVG */}
          <div className="mx-auto mb-6 w-48 md:w-64 toucan-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" overflow="visible">
              
              {/* Neck and Bandana */}
              <g>
                <path d="M75 130 C 75 145, 95 145, 95 130 V 125 H 75 Z" fill="#212121" />
                <path d="M70 120 Q 85 145, 100 120 L 105 130 Q 85 155, 65 130 Z" fill="#F44336"/>
                <path d="M72 122 Q 85 135, 98 122 L 103 132 Q 85 145, 67 132 Z" fill="#D32F2F"/>
              </g>

              {/* Beak */}
              <path fill="#FFC107" d="M100 80 Q180 70 195 100 Q180 130 100 120 Z" />
              <path fill="#F44336" d="M100 80 Q140 75 165 90 L195 100 Q180 130 100 120 Z" />
              <path fill="#212121" d="M100 100 Q150 105 195 100 Q180 130 100 120 Z" />
              
              {/* Head */}
              <circle cx="85" cy="95" r="40" fill="#FFFFFF" />
              <path fill="#212121" d="M85 55 A 40 40 0 0 1 85 135 A 20 20 0 0 0 85 95 Z" />
              
              {/* Eye container and the moving parts */}
              <g>
                <circle cx="80" cy="85" r="12" fill="#42A5F5" />
                <g className="eye-scan">
                  <circle cx="78" cy="83" r="5" fill="#212121" />
                  <circle cx="81" cy="86" r="2" fill="#FFFFFF" />
                </g>
              </g>
              
              {/* --- FIXED Cowboy Hat (moved up by 10px) --- */}
              <g>
                <path fill="#8D6E63" d="M50 50 Q100 30 120 50 L130 70 L40 70 Z" />
                <path fill="#A1887F" d="M30 65 Q100 60 140 65 L130 75 L40 75 Z" />
              </g>
            </svg>
          </div>
          
          {/* Error Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-4" style={{ fontFamily: "'Luckiest Guy', cursive" }}>
            404
          </h1> 
          
          {/* Main Message */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Lost in the Jungle?
          </h2>
          
          {/* Sub Message */}
          <p className="text-gray-300 text-lg mb-8">
            Looks like you've wandered off the trail. The page you're looking for isn't here.
          </p>
          
          {/* Home Button */}
          <Link
            to={ROUTES.HOME}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Go Back to the Casino
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage; 