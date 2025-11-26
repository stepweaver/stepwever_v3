/**
 * OptimizedImage component that serves WebP images with PNG fallback
 * Uses the <picture> element to provide modern format support with graceful degradation
 */

// List of images that have WebP versions available
// Add images here as WebP versions are created
const IMAGES_WITH_WEBP = [
  '/images/dice-roller.png',
  '/images/lambda_stepweaver.png',
  '/images/screencapture-lambda-ortho.png',
  '/images/screencapture-soap-stache.png',
];

export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props
}) {
  // Ensure loading attribute is explicitly set (not undefined)
  const loadingAttr = loading || 'lazy';
  
  // Prevent context menu on images (right-click)
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };
  
  // If src doesn't end with .png, assume it's already optimized or not a PNG
  if (!src || !src.endsWith('.png')) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loadingAttr}
        fetchPriority={fetchPriority}
        onContextMenu={handleContextMenu}
        draggable={false}
        {...props}
      />
    );
  }

  // Only use WebP if we know the WebP version exists
  const hasWebPVersion = IMAGES_WITH_WEBP.includes(src);

  // If no WebP version exists, just use the PNG directly
  if (!hasWebPVersion) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loadingAttr}
        fetchPriority={fetchPriority}
        onContextMenu={handleContextMenu}
        draggable={false}
        {...props}
      />
    );
  }

  // Generate WebP version path
  const webpSrc = src.replace('.png', '.webp');

  return (
    <picture onContextMenu={handleContextMenu}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loadingAttr}
        fetchPriority={fetchPriority}
        decoding="async"
        onContextMenu={handleContextMenu}
        draggable={false}
        {...props}
      />
    </picture>
  );
}

