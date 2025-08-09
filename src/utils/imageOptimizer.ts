// Simple image optimization utilities for better performance

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export class ImageOptimizer {
  private static imageCache = new Map<string, string>();

  /**
   * Optimize image loading with caching
   */
  static optimizeImage(config: ImageConfig): string {
    const { src } = config;
    
    // Check cache first
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }

    // For now, return the original src
    // In production, you could implement client-side optimization here
    this.imageCache.set(src, src);
    return src;
  }

  /**
   * Preload critical images
   */
  static preloadImages(urls: string[]): void {
    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  /**
   * Generate responsive image sizes
   */
  static getResponsiveSizes(baseWidth: number): number[] {
    return [
      Math.round(baseWidth * 0.25), // Mobile
      Math.round(baseWidth * 0.5),  // Tablet
      Math.round(baseWidth * 0.75), // Small desktop
      baseWidth,                     // Full size
    ];
  }
}

/**
 * React hook for lazy loading images
 */
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || '');
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded };
}; 