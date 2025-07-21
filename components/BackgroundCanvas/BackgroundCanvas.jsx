'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './BackgroundCanvas.module.css';

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [originalImageData, setOriginalImageData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Neon rainbow colors - starting with green
  const neonColors = [
    [0, 255, 0], // Neon Green (starting color)
    [255, 255, 0], // Neon Yellow
    [255, 165, 0], // Neon Orange
    [255, 0, 0], // Neon Red
    [255, 0, 255], // Neon Pink/Magenta
    [138, 43, 226], // Neon Purple
    [0, 191, 255], // Neon Blue
    [0, 255, 255], // Neon Cyan
  ];

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    }, 16); // ~60fps

    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load image once and store original data
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setOriginalImageData(imageData);
      } catch (error) {
        console.error('Error processing background image:', error);
      }
    };

    img.onerror = () => {
      console.error(
        'Failed to load background image: /images/lambda_stepweaver.png'
      );
      // Could set a fallback state here if needed
    };

    img.src = '/images/lambda_stepweaver.png';
  }, []);

  // Update colors and scale based on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Create a copy of the original image data
    const imageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );
    const data = imageData.data;

    // Calculate which color to use based on scroll progress
    const colorProgress = scrollProgress * (neonColors.length - 1);
    const colorIndex = Math.floor(colorProgress);
    const nextColorIndex = Math.min(colorIndex + 1, neonColors.length - 1);
    const blend = colorProgress - colorIndex;

    // Interpolate between current and next color for smooth transitions
    const currentColor = neonColors[colorIndex];
    const nextColor = neonColors[nextColorIndex];

    const r = Math.round(currentColor[0] * (1 - blend) + nextColor[0] * blend);
    const g = Math.round(currentColor[1] * (1 - blend) + nextColor[1] * blend);
    const b = Math.round(currentColor[2] * (1 - blend) + nextColor[2] * blend);

    // Apply the color to all non-transparent pixels
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        // Only change non-transparent pixels
        data[i] = r; // Red
        data[i + 1] = g; // Green
        data[i + 2] = b; // Blue
        // Keep original alpha (data[i + 3])
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [scrollProgress, originalImageData]);

  return (
    <>
      {/* Fixed background canvas */}
      <div className='fixed inset-0 z-10 flex items-center justify-start'>
        <canvas
          ref={canvasRef}
          className='opacity-30 origin-center drop-shadow-[0_0_20px_rgba(0,255,65,0.3)]'
          style={{
            transform: `scale(${
              isMobile
                ? 0.9 - scrollProgress * 0.4 // Mobile: 0.9 to 0.5
                : 1.4 - scrollProgress * 0.8 // Desktop: 1.4 to 0.6
            }) translateX(${
              isMobile
                ? -30 - scrollProgress * 20 // Mobile: -30% to -50%
                : -15 - scrollProgress * 25 // Desktop: -15% to -40%
            }%) translateY(${isMobile ? '2%' : '5%'})`,
          }}
        />
      </div>
    </>
  );
}
