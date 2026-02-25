import Image from 'next/image';

export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fill = true,
  width,
  height,
  priority,
  ...props
}) {
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const isPriority = priority || loading === 'eager' || fetchPriority === 'high';

  if (fill && !width && !height) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={isPriority}
        onContextMenu={handleContextMenu}
        draggable={false}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={isPriority}
      onContextMenu={handleContextMenu}
      draggable={false}
      {...props}
    />
  );
}
