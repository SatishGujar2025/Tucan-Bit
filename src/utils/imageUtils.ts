// Image optimization utilities for better performance without external CDN

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  lazy?: boolean;
}

export class ImageOptimizer {
  private static imageCache = new Map<string, string>();
  private static observer: IntersectionObserver | null = null;

  /**
   * Optimize image loading with lazy loading and caching
   */
  static optimizeImage(config: ImageConfig): string {
    const { src, width, height, quality = 80, format = 'webp' } = config;
    
    // Check cache first
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }

    // For now, return the original src since we're not using external CDN
    // In production, you could implement client-side optimization here
    this.imageCache.set(src, src);
    return src;
  }

  /**
   * Lazy load images using Intersection Observer
   */
  static setupLazyLoading(): void {
    if (this.observer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              this.observer?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );
  }

  /**
   * Add lazy loading to an image element
   */
  static addLazyLoading(img: HTMLImageElement, src: string): void {
    if (!this.observer) {
      this.setupLazyLoading();
    }

    img.setAttribute('data-src', src);
    img.classList.add('lazy');
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'; // Placeholder
    this.observer?.observe(img);
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
   * Convert image to WebP format if supported
   */
  static async convertToWebP(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, 'image/webp', 0.8);
      };

      img.src = URL.createObjectURL(file);
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

/**
 * Optimized image component
 */
export const OptimizedImage: React.FC<ImageConfig> = ({
  src,
  alt,
  width,
  height,
  quality,
  format,
  lazy = true,
  ...props
}) => {
  const optimizedSrc = ImageOptimizer.optimizeImage({
    src,
    alt,
    width,
    height,
    quality,
    format,
  });

  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (lazy && imgRef.current) {
      ImageOptimizer.addLazyLoading(imgRef.current, optimizedSrc);
    }
  }, [optimizedSrc, lazy]);

  return (
    <img
      ref={imgRef}
      src={lazy ? undefined : optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
}; 