/**
 * OptimizedImage component that serves WebP images with PNG fallback
 * Uses the <picture> element to provide modern format support with graceful degradation
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props
}) {
  // If src doesn't end with .png, assume it's already optimized or not a PNG
  if (!src || !src.endsWith('.png')) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        {...props}
      />
    );
  }

  // Generate WebP version path
  const webpSrc = src.replace('.png', '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        {...props}
      />
    </picture>
  );
}

