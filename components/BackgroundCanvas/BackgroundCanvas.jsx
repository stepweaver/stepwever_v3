'use client';

import { useEffect, useRef, useState } from 'react';
import { useSafeScroll } from '@/utils/useSafeScroll';
import styles from './BackgroundCanvas.module.css';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [originalImageData, setOriginalImageData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

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
  // Use requestAnimationFrame and chunked processing to avoid blocking main thread
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData || hasError) return;

    let rafId = null;
    let lastColor = null;
    let isProcessing = false;

    const updateCanvas = () => {
      if (isProcessing) {
        rafId = requestAnimationFrame(updateCanvas);
        return;
      }

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

        // Skip update if color hasn't changed significantly (reduces unnecessary processing)
        const colorKey = `${r},${g},${b}`;
        if (lastColor === colorKey) {
          rafId = requestAnimationFrame(updateCanvas);
          return;
        }
        lastColor = colorKey;

        // Process pixels in chunks to avoid blocking main thread
        // Process 10000 pixels per chunk (allows browser to handle other tasks)
        const PIXELS_PER_CHUNK = 10000;
        const dataLength = originalImageData.data.length;
        const imageData = new ImageData(
          new Uint8ClampedArray(originalImageData.data),
          originalImageData.width,
          originalImageData.height
        );
        const data = imageData.data;

        isProcessing = true;
        let currentIndex = 0;

        const processChunk = (deadline) => {
          // Process one chunk per call to avoid blocking
          if (currentIndex >= dataLength) {
            // All pixels processed - update canvas
            ctx.putImageData(imageData, 0, 0);
            isProcessing = false;
            rafId = requestAnimationFrame(updateCanvas);
            return;
          }

          const endIndex = Math.min(currentIndex + PIXELS_PER_CHUNK * 4, dataLength);
          
          // Process pixels in this chunk
          for (let i = currentIndex; i < endIndex; i += 4) {
            if (data[i + 3] > 0) {
              // Only change non-transparent pixels
              data[i] = r; // Red
              data[i + 1] = g; // Green
              data[i + 2] = b; // Blue
              // Keep original alpha (data[i + 3])
            }
          }

          currentIndex = endIndex;

          // Continue processing - yield to browser between chunks
          if (deadline && deadline.timeRemaining() > 0) {
            // Still have time in this idle period, continue immediately
            processChunk(deadline);
          } else {
            // Yield to browser - schedule next chunk
            if (typeof requestIdleCallback !== 'undefined') {
              requestIdleCallback(processChunk, { timeout: 100 });
            } else {
              setTimeout(() => processChunk(null), 0);
            }
          }
        };

        // Use requestIdleCallback if available, otherwise fallback to setTimeout
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(processChunk, { timeout: 100 });
        } else {
          setTimeout(() => processChunk(null), 0);
        }
      } catch (error) {
        console.error('Error updating canvas colors:', error);
        setHasError(true);
        isProcessing = false;
      }
    };

    // Use requestAnimationFrame to batch updates and yield to browser
    rafId = requestAnimationFrame(updateCanvas);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      isProcessing = false;
    };
  }, [scrollProgress, originalImageData, hasError]);

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
