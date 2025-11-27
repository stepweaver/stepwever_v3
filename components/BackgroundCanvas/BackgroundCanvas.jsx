'use client';

import { useEffect, useRef, useState } from 'react';
import { useSafeScroll } from '@/utils/useSafeScroll';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import styles from './BackgroundCanvas.module.css';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [originalImageData, setOriginalImageData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  // Neon rainbow colors for dark mode - starting with green
  const neonColorsDark = [
    [0, 255, 0], // Neon Green (starting color)
    [255, 255, 0], // Neon Yellow
    [255, 165, 0], // Neon Orange
    [255, 0, 0], // Neon Red
    [255, 0, 255], // Neon Pink/Magenta
    [138, 43, 226], // Neon Purple
    [0, 191, 255], // Neon Blue
    [0, 255, 255], // Neon Cyan
  ];

  // Colors for light mode - starting with black, transitioning through darker tones
  const colorsLight = [
    [0, 0, 0], // Black (starting color for light mode)
    [51, 51, 51], // Dark Gray
    [102, 51, 102], // Dark Purple
    [102, 0, 102], // Darker Magenta
    [153, 0, 153], // Deep Magenta
    [153, 0, 51], // Deep Red-Purple
    [51, 51, 102], // Dark Blue-Gray
    [0, 51, 102], // Dark Blue
  ];

  // Pure white/grayscale colors for monochrome mode
  const colorsMonochrome = [
    [255, 255, 255], // Pure White (starting color)
    [245, 245, 245], // Very Light Gray
    [235, 235, 235], // Light Gray
    [225, 225, 225], // Light-Medium Gray
    [215, 215, 215], // Medium Gray
    [205, 205, 205], // Medium-Dark Gray
    [195, 195, 195], // Dark Gray
    [185, 185, 185], // Very Dark Gray
  ];

  // Pure black/grayscale colors for monochrome inverted mode
  const colorsMonochromeInverted = [
    [0, 0, 0], // Pure Black (starting color)
    [10, 10, 10], // Very Dark Gray
    [20, 20, 20], // Dark Gray
    [30, 30, 30], // Dark-Medium Gray
    [40, 40, 40], // Medium Gray
    [50, 50, 50], // Medium-Light Gray
    [60, 60, 60], // Light Gray
    [70, 70, 70], // Very Light Gray
  ];

  // Vintage DOS/IBM PC colors for vintage mode
  const colorsVintage = [
    [85, 255, 255], // Bright Cyan (starting color)
    [255, 255, 255], // White
    [85, 85, 255], // Bright Blue
    [255, 255, 85], // Bright Yellow
    [85, 255, 85], // Bright Green
    [255, 85, 255], // Bright Magenta
    [170, 170, 170], // Light Gray
    [85, 85, 85], // Dark Gray
  ];

  // Apple II soft lime green colors
  const colorsApple = [
    [51, 255, 51], // Soft Lime (starting color)
    [102, 255, 102], // Medium Lime
    [68, 204, 68], // Muted Lime
    [136, 255, 136], // Pale Lime
    [119, 255, 119], // Light Lime
    [85, 255, 85], // Bright Lime
    [153, 255, 153], // Very Light Lime
    [34, 136, 34], // Dark Lime
  ];

  // Commodore 64 blue colors
  const colorsC64 = [
    [163, 230, 255], // Light Blue (starting color)
    [124, 112, 218], // Purple-Blue
    [163, 163, 255], // Bright Blue
    [216, 216, 255], // Very Light Blue
    [149, 149, 221], // Medium Blue
    [184, 184, 255], // Pale Blue
    [200, 200, 255], // Ultra Light Blue
    [96, 88, 184], // Dark Blue
  ];

  // Amber CRT colors
  const colorsAmber = [
    [255, 176, 0], // Amber (starting color)
    [255, 187, 34], // Light Amber
    [255, 153, 0], // Deep Amber/Orange
    [255, 204, 102], // Pale Amber
    [221, 136, 68], // Burnt Orange
    [255, 170, 85], // Soft Orange
    [255, 221, 136], // Cream Amber
    [204, 136, 51], // Dark Amber
  ];

  // Synthwave hot pink/cyan colors
  const colorsSynthwave = [
    [255, 20, 147], // Hot Pink (starting color)
    [0, 255, 255], // Cyan
    [157, 0, 255], // Purple
    [255, 255, 0], // Yellow
    [255, 105, 180], // Light Pink
    [65, 105, 225], // Royal Blue
    [255, 0, 255], // Magenta
    [0, 191, 255], // Deep Sky Blue
  ];

  // Dracula purple/pink colors
  const colorsDracula = [
    [189, 147, 249], // Purple (starting color)
    [255, 121, 198], // Pink
    [139, 233, 253], // Cyan
    [80, 250, 123], // Green
    [241, 250, 140], // Yellow
    [255, 184, 108], // Orange
    [255, 85, 85], // Red
    [248, 248, 242], // White
  ];

  // Solarized teal/cyan colors
  const colorsSolarized = [
    [42, 161, 152], // Teal (starting color)
    [38, 139, 210], // Blue
    [133, 153, 0], // Green
    [181, 137, 0], // Yellow
    [203, 75, 22], // Orange
    [211, 54, 130], // Magenta
    [108, 113, 196], // Violet
    [131, 148, 150], // Base0
  ];

  // Nord frost blue colors
  const colorsNord = [
    [136, 192, 208], // Frost Blue (starting color)
    [129, 161, 193], // Frost Blue 2
    [94, 129, 172], // Frost Blue 3
    [163, 190, 140], // Aurora Green
    [235, 203, 139], // Aurora Yellow
    [208, 135, 112], // Aurora Orange
    [191, 97, 106], // Aurora Red
    [180, 142, 173], // Aurora Purple
  ];

  // Select color palette based on theme
  const neonColors = 
    theme === 'light' ? colorsLight : 
    theme === 'monochrome' ? colorsMonochrome : 
    theme === 'monochrome-inverted' ? colorsMonochromeInverted :
    theme === 'vintage' ? colorsVintage :
    theme === 'apple' ? colorsApple :
    theme === 'c64' ? colorsC64 :
    theme === 'amber' ? colorsAmber :
    theme === 'synthwave' ? colorsSynthwave :
    theme === 'dracula' ? colorsDracula :
    theme === 'solarized' ? colorsSolarized :
    theme === 'nord' ? colorsNord :
    neonColorsDark;

  // Use safe scroll hook
  useSafeScroll({
    onScroll: (scrollData) => {
      setScrollProgress(scrollData.scrollProgressY);
    },
    throttleMs: 16, // ~60fps
  });

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      try {
        if (typeof window === 'undefined') return;
        setIsMobile(window.innerWidth < 768);
      } catch (error) {
        console.error('Error in resize handler:', error);
        setIsMobile(false);
      }
    };

    // Only add event listener if window is available
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, { passive: true });
      handleResize(); // Set initial value
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Load image once and store original data
  // Try WebP first for better compression, fallback to PNG
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
        setHasError(false);
        // Trigger fade-in after a short delay to ensure first paint
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error('Error processing background image:', error);
        setHasError(true);
      }
    };

    // Try WebP first, fallback to PNG if WebP fails
    let webpFailed = false;
    img.onerror = () => {
      if (!webpFailed) {
        // WebP failed, try PNG fallback
        webpFailed = true;
        img.src = '/images/lambda_stepweaver.png';
      } else {
        // Both formats failed
        console.error(
          'Failed to load background image: /images/lambda_stepweaver.webp and .png'
        );
        setHasError(true);
      }
    };

    // Start with WebP for better compression
    img.src = '/images/lambda_stepweaver.webp';
  }, []);

  // Update colors and scale based on scroll
  // Use requestAnimationFrame for smooth color transitions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData || hasError) return;

    let rafId = null;
    let lastColorKey = null;

    const updateCanvas = () => {
      try {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        // Calculate which color to use based on scroll progress
        const colorProgress = scrollProgress * (neonColors.length - 1);
        const colorIndex = Math.floor(colorProgress);
        const nextColorIndex = Math.min(colorIndex + 1, neonColors.length - 1);
        const blend = colorProgress - colorIndex;

        // Interpolate between current and next color for smooth transitions
        const currentColor = neonColors[colorIndex];
        const nextColor = neonColors[nextColorIndex];

        const r = Math.round(
          currentColor[0] * (1 - blend) + nextColor[0] * blend
        );
        const g = Math.round(
          currentColor[1] * (1 - blend) + nextColor[1] * blend
        );
        const b = Math.round(
          currentColor[2] * (1 - blend) + nextColor[2] * blend
        );

        // Skip update if color hasn't changed (reduces unnecessary processing)
        const colorKey = `${r},${g},${b}`;
        if (lastColorKey === colorKey) {
          return;
        }
        lastColorKey = colorKey;

        // Create new image data and process all pixels at once for smooth transition
        const imageData = new ImageData(
          new Uint8ClampedArray(originalImageData.data),
          originalImageData.width,
          originalImageData.height
        );
        const data = imageData.data;

        // Process all pixels in one frame (image is small enough to handle)
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 0) {
            // Only change non-transparent pixels
            data[i] = r; // Red
            data[i + 1] = g; // Green
            data[i + 2] = b; // Blue
            // Keep original alpha (data[i + 3])
          }
        }

        // Update canvas with new colors
        ctx.putImageData(imageData, 0, 0);
      } catch (error) {
        console.error('Error updating canvas colors:', error);
        setHasError(true);
      }
    };

    // Update immediately and then on any dependency change
    updateCanvas();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollProgress, originalImageData, hasError, neonColors, theme]);

  // Don't render if there's an error
  if (hasError) {
    return null;
  }

  return (
    <>
      {/* Fixed background canvas */}
      <div className='fixed inset-0 z-10 flex items-center justify-start'>
        <canvas
          ref={canvasRef}
          width={1024}
          height={1536}
          className={`origin-center transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: 
              theme === 'light' ? 'drop-shadow(8px 8px 12px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 60px rgba(0, 0, 0, 0.3))' :
              theme === 'monochrome' ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))' :
              theme === 'monochrome-inverted' ? 'drop-shadow(0 0 8px rgba(0, 0, 0, 1)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))' :
              theme === 'vintage' ? 'drop-shadow(0 0 8px rgba(85, 255, 255, 1)) drop-shadow(0 0 20px rgba(85, 255, 255, 0.4))' :
              theme === 'apple' ? 'drop-shadow(0 0 8px rgba(51, 255, 51, 1)) drop-shadow(0 0 20px rgba(51, 255, 51, 0.4))' :
              theme === 'c64' ? 'drop-shadow(0 0 8px rgba(163, 230, 255, 1)) drop-shadow(0 0 20px rgba(163, 230, 255, 0.4))' :
              theme === 'amber' ? 'drop-shadow(0 0 8px rgba(255, 176, 0, 1)) drop-shadow(0 0 20px rgba(255, 176, 0, 0.4))' :
              theme === 'synthwave' ? 'drop-shadow(0 0 8px rgba(255, 20, 147, 1)) drop-shadow(0 0 20px rgba(255, 20, 147, 0.4))' :
              theme === 'dracula' ? 'drop-shadow(0 0 8px rgba(189, 147, 249, 1)) drop-shadow(0 0 20px rgba(189, 147, 249, 0.4))' :
              theme === 'solarized' ? 'drop-shadow(0 0 8px rgba(42, 161, 152, 1)) drop-shadow(0 0 20px rgba(42, 161, 152, 0.4))' :
              theme === 'nord' ? 'drop-shadow(0 0 8px rgba(136, 192, 208, 1)) drop-shadow(0 0 20px rgba(136, 192, 208, 0.4))' :
              'drop-shadow(0 0 8px rgba(0, 255, 65, 1)) drop-shadow(0 0 20px rgba(0, 255, 65, 0.4))',
            opacity: theme === 'light' || theme === 'monochrome-inverted' ? 0.2 : 0.3,
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
