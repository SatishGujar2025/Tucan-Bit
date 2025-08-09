import React, { useState, useEffect, useRef } from 'react';
import { ImageOptimizer } from '../../utils/imageOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  placeholder,
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      // Load immediately if not lazy
      setImageSrc(src);
    } else {
      // Lazy loading with Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [src, lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show placeholder while loading
  if (!isLoaded && !hasError) {
    return (
      <div 
        className={`bg-gray-700 animate-pulse ${className}`}
        style={{ width, height }}
        {...props}
      />
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center text-gray-400 ${className}`}
        style={{ width, height }}
        {...props}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

// Specialized components for different use cases
export const GameImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    className={`rounded-lg object-cover ${props.className || ''}`}
    lazy={true}
  />
);

export const PromoImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    className={`rounded-xl object-cover ${props.className || ''}`}
    lazy={false} // Promo images should load immediately
  />
);

export const AvatarImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    className={`rounded-full object-cover ${props.className || ''}`}
    lazy={true}
  />
); 