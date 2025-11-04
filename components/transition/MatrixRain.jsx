'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixRain({ children }) {
  const canvasRef = useRef(null);
  const pathname = usePathname();
  const isTransitioning = useRef(false);
  const animationRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const firstMount = useRef(true);

  // Initial content display after first render
  useEffect(() => {
    if (firstMount.current) {
      setTimeout(() => {
        setContentVisible(true);
        firstMount.current = false;
      }, 100);
    }

    // Cleanup on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Matrix effect implementation
  const startMatrixEffect = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return null;

    // Get device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    // Canvas setup with DPR support
    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      // Set actual size in memory (scaled for DPR)
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      // Scale the context to match DPR (setting width/height resets context, so this is safe)
      ctx.scale(dpr, dpr);

      // Set display size (CSS pixels)
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      // Re-apply black background after resize
      if (isTransitioning.current) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial black fill
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Character setup
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ';
    const charsArray = chars.split('');
    const fontSize = 16;
    const columns = Math.ceil(canvasWidth / fontSize);

    // Pre-generate character sequences for each column (more efficient)
    const charSequences = Array.from({ length: columns }, () => {
      const sequence = [];
      for (let i = 0; i < 50; i++) {
        sequence.push(charsArray[Math.floor(Math.random() * charsArray.length)]);
      }
      return sequence;
    });
    const charIndices = Array.from({ length: columns }, () => 0);

    // Arrays for tracking drops
    const drops = Array.from({ length: columns }, () => Math.random() * -50);
    const speeds = Array.from(
      { length: columns },
      () => 0.5 + Math.random() * 1.5
    );

    // Color variations - cache as strings
    const colors = Array.from({ length: columns }, () => {
      const hue = 120 + Math.random() * 40 - 20;
      const saturation = 80 + Math.random() * 20;
      const lightness = 40 + Math.random() * 20;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    // Highlight characters
    const highlightIndices = new Set(
      Array.from({ length: Math.floor(columns / 10) }, () =>
        Math.floor(Math.random() * columns)
      )
    );

    // Cache font strings
    const normalFont = `${fontSize}px monospace`;
    const highlightFont = `${fontSize + 2}px monospace`;

    // Batch context operations
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    // Animation function
    const draw = (currentTime) => {
      if (!isTransitioning.current) return;

      // Throttle to target FPS
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime - (elapsed % frameInterval);

      // Semi-transparent black fill for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Only draw if visible
        if (y > -fontSize && y < canvasHeight + fontSize) {
          // Get character from pre-generated sequence
          const charIndex = Math.floor(drops[i]) % charSequences[i].length;
          const text = charSequences[i][charIndex];

          // Different styling for highlights
          if (highlightIndices.has(i)) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = highlightFont;
          } else {
            ctx.fillStyle = colors[i];
            ctx.font = normalFont;
          }

          // Draw character
          ctx.fillText(text, x, y);
        }

        // Reset drops at random intervals
        if (drops[i] * fontSize > canvasHeight && Math.random() > 0.95) {
          drops[i] = 0;
          // Reset character index for this column
          charIndices[i] = 0;
        }

        // Update position
        drops[i] += speeds[i];
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Start animation
    isTransitioning.current = true;
    setOpacity(1);
    animationRef.current = requestAnimationFrame(draw);

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      isTransitioning.current = false;
    };
  }, []);

  // Handle clicks on internal links
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      // Skip transition for download links or external links
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('#') ||
        href === pathname ||
        link.hasAttribute('download') // Skip transition if download attribute is present
      )
        return;

      // Start transition
      setContentVisible(false);
      startMatrixEffect();
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname, startMatrixEffect]);

  // Handle path changes
  useEffect(() => {
    if (firstMount.current) return;

    // Hide content and start effect
    setContentVisible(false);
    const cleanup = startMatrixEffect();

    // Timing for transition end
    const transitionDuration = 1000;
    const endTransitionTimer = setTimeout(() => {
      setOpacity(0);
      setContentVisible(true);
    }, transitionDuration);

    return () => {
      clearTimeout(endTransitionTimer);
      if (cleanup) cleanup();
    };
  }, [pathname, startMatrixEffect]);

  return (
    <>
      {/* Black background layer */}
      <div
        className={`fixed inset-0 bg-black pointer-events-none z-40 transition-opacity duration-700 ease-in-out ${
          opacity ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Matrix canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-700 ease-in-out ${
          opacity ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'opacity' }}
      />

      {/* Page content */}
      <div
        className={`h-full relative z-10 transition-opacity duration-700 ease-in-out ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
