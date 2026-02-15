'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSafeScroll } from '@/utils/useSafeScroll';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import styles from './BackgroundCanvas.module.css';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const rainCanvasRef = useRef(null);
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

  const colorsCobalt = [
    [255, 198, 0], // Bright Yellow (starting color)
    [255, 157, 0], // Orange
    [255, 0, 136], // Hot Pink
    [174, 129, 255], // Purple
    [0, 136, 255], // Blue
    [0, 187, 255], // Cyan
    [58, 217, 0], // Green
    [255, 198, 0], // Back to Yellow
  ];

  // Select color palette based on theme (memoised to prevent re-render loops)
  const neonColors = useMemo(() =>
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
    theme === 'cobalt' ? colorsCobalt :
    neonColorsDark,
    [theme]
  );

  // Stable scroll callback (memoised to prevent re-attaching listener)
  const handleScroll = useCallback((scrollData) => {
    setScrollProgress(scrollData.scrollProgressY);
  }, []);

  // Use safe scroll hook
  useSafeScroll({
    onScroll: handleScroll,
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

  // Circuit-board data sprites: glowing pulses traveling along PCB-style traces
  useEffect(() => {
    const rainCanvas = rainCanvasRef.current;
    if (!rainCanvas || typeof window === 'undefined') return;

    const ctx = rainCanvas.getContext('2d');
    if (!ctx) return;

    let W, H;
    const isLightMode = theme === 'light' || theme === 'monochrome-inverted';
    const gDim = isLightMode ? 0.3 : 1.0;

    let nodes = [];
    let edges = [];
    let sprites = [];

    // ---- Rectilinear trace between two nodes (PCB routing) ----
    function makeTrace(a, b) {
      const pts = [{ x: a.x, y: a.y }];
      const roll = Math.random();
      if (roll < 0.3) {
        // Horizontal first, then vertical (L-shape)
        pts.push({ x: b.x, y: a.y });
      } else if (roll < 0.6) {
        // Vertical first, then horizontal (L-shape)
        pts.push({ x: a.x, y: b.y });
      } else {
        // Z-shape: H-V-H or V-H-V
        if (Math.random() > 0.5) {
          const midX = a.x + (b.x - a.x) * (0.3 + Math.random() * 0.4);
          pts.push({ x: midX, y: a.y });
          pts.push({ x: midX, y: b.y });
        } else {
          const midY = a.y + (b.y - a.y) * (0.3 + Math.random() * 0.4);
          pts.push({ x: a.x, y: midY });
          pts.push({ x: b.x, y: midY });
        }
      }
      pts.push({ x: b.x, y: b.y });
      return pts;
    }

    function pathLen(pts) {
      let l = 0;
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        l += Math.sqrt(dx * dx + dy * dy);
      }
      return l || 1;
    }

    function posOnPath(pts, len, t) {
      const target = Math.max(0, Math.min(1, t)) * len;
      let acc = 0;
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const seg = Math.sqrt(dx * dx + dy * dy);
        if (acc + seg >= target && seg > 0) {
          const f = (target - acc) / seg;
          return { x: pts[i - 1].x + dx * f, y: pts[i - 1].y + dy * f };
        }
        acc += seg;
      }
      return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y };
    }

    // ---- Build the circuit network ----
    function buildCircuit() {
      nodes = [];
      edges = [];
      sprites = [];

      const cell = 80 + Math.floor(Math.random() * 30);
      const cols = Math.ceil(W / cell) + 2;
      const rows = Math.ceil(H / cell) + 2;

      // Place nodes on a jittered grid (~65% fill)
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          if (Math.random() > 0.65) continue;
          nodes.push({
            x: c * cell + (Math.random() - 0.5) * cell * 0.55,
            y: r * cell + (Math.random() - 0.5) * cell * 0.55,
            edges: [],
            flash: 0,
          });
        }
      }

      // Connect nearby pairs with rectilinear traces
      const maxDist = cell * 2.2;
      const edgeSet = new Set();

      for (let i = 0; i < nodes.length; i++) {
        const cands = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist && d > 25) cands.push({ j, d });
        }
        cands.sort((a, b) => a.d - b.d);

        let added = 0;
        for (const { j } of cands) {
          if (added >= 3) break;
          const key = `${i}-${j}`;
          if (edgeSet.has(key)) continue;
          // Limit max connections per node to keep it clean
          if (nodes[i].edges.length >= 5 || nodes[j].edges.length >= 5) continue;
          edgeSet.add(key);

          const pts = makeTrace(nodes[i], nodes[j]);
          const len = pathLen(pts);
          const eIdx = edges.length;
          edges.push({ from: i, to: j, pts, len });
          nodes[i].edges.push(eIdx);
          nodes[j].edges.push(eIdx);
          added++;
        }
      }

      // Spawn data sprites
      if (edges.length === 0) return;
      const count = Math.max(10, Math.min(50, Math.floor(edges.length * 0.35)));
      for (let i = 0; i < count; i++) sprites.push(newSprite());
    }

    // Neon cyberpunk sprite color palette
    const spriteColors = [
      { r: 90,  g: 255, b: 140, hr: 190, hg: 255, hb: 215 }, // Matrix green (most common)
      { r: 90,  g: 255, b: 140, hr: 190, hg: 255, hb: 215 }, // Matrix green (weighted)
      { r: 0,   g: 200, b: 255, hr: 160, hg: 230, hb: 255 }, // Cyan
      { r: 255, g: 60,  b: 180, hr: 255, hg: 180, hb: 220 }, // Hot pink
      { r: 160, g: 80,  b: 255, hr: 210, hg: 180, hb: 255 }, // Purple
      { r: 255, g: 200, b: 0,   hr: 255, hg: 235, hb: 160 }, // Gold
      { r: 255, g: 80,  b: 60,  hr: 255, hg: 190, hb: 180 }, // Red-orange
      { r: 0,   g: 255, b: 255, hr: 180, hg: 255, hb: 255 }, // Teal
    ];

    function newSprite() {
      const eIdx = Math.floor(Math.random() * edges.length);
      const fwd = Math.random() > 0.5;
      const color = spriteColors[Math.floor(Math.random() * spriteColors.length)];
      return {
        eIdx,
        t: fwd ? 0 : 1,
        speed: 0.0015 + Math.random() * 0.005,
        forward: fwd,
        size: 1.5 + Math.random() * 1.5,
        brightness: 0.7 + Math.random() * 0.3,
        trail: [],
        trailMax: 8 + Math.floor(Math.random() * 10),
        pulse: Math.random() * Math.PI * 2,
        color,
      };
    }

    const setSize = () => {
      W = rainCanvas.width = window.innerWidth;
      H = rainCanvas.height = window.innerHeight;
      buildCircuit();
    };
    setSize();
    window.addEventListener('resize', setSize);

    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // ==== Draw traces (faint circuit paths) ====
      ctx.lineCap = 'square';
      ctx.lineJoin = 'miter';
      for (const e of edges) {
        ctx.beginPath();
        ctx.moveTo(e.pts[0].x, e.pts[0].y);
        for (let i = 1; i < e.pts.length; i++) ctx.lineTo(e.pts[i].x, e.pts[i].y);
        ctx.strokeStyle = `rgba(90,255,140,${0.07 * gDim})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ==== Draw nodes (junction pads) ====
      for (const n of nodes) {
        if (n.edges.length === 0) continue;

        let flashA = 0;
        if (n.flash > 0) { flashA = n.flash / 25; n.flash--; }

        // Small square pad
        const s = 1.5 + (n.edges.length > 2 ? 1 : 0);
        const baseA = 0.1 + flashA * 0.6;
        ctx.fillStyle = `rgba(90,255,140,${baseA * gDim})`;
        ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);

        // Flash burst when a sprite arrives (in sprite's color)
        if (flashA > 0.05) {
          const fc = n.flashColor || { r: 90, g: 255, b: 140 };
          ctx.shadowBlur = 14;
          ctx.shadowColor = `rgba(${fc.r},${fc.g},${fc.b},${flashA * 0.5 * gDim})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 5 + flashA * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${fc.r},${fc.g},${fc.b},${flashA * 0.2 * gDim})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ==== Update & draw data sprites ====
      for (const sp of sprites) {
        if (!sp) continue;
        const edge = edges[sp.eIdx];
        if (!edge) continue;

        // Advance position
        sp.t += sp.forward ? sp.speed : -sp.speed;
        sp.pulse += 0.07;

        const pos = posOnPath(edge.pts, edge.len, sp.t);

        // Record trail
        sp.trail.push({ x: pos.x, y: pos.y });
        if (sp.trail.length > sp.trailMax) sp.trail.shift();

        // Reached a node → flash it and pick next edge
        if (sp.t >= 1 || sp.t <= 0) {
          const nodeIdx = sp.t >= 1 ? edge.to : edge.from;
          const node = nodes[nodeIdx];
          if (node && node.edges.length > 0) {
            node.flash = 25;
            node.flashColor = sp.color;

            // Prefer a different edge than the one we arrived on
            const others = node.edges.filter((e) => e !== sp.eIdx);
            const nextEIdx =
              others.length > 0
                ? others[Math.floor(Math.random() * others.length)]
                : node.edges[Math.floor(Math.random() * node.edges.length)];
            const next = edges[nextEIdx];
            if (next) {
              sp.eIdx = nextEIdx;
              if (next.from === nodeIdx) {
                sp.forward = true;
                sp.t = 0;
              } else {
                sp.forward = false;
                sp.t = 1;
              }
            }
          }
          sp.trail = [];
        }

        // Draw trail (fading afterglow in sprite color)
        const sc = sp.color;
        for (let i = 0; i < sp.trail.length; i++) {
          const fade = (i + 1) / sp.trail.length;
          ctx.beginPath();
          ctx.arc(sp.trail[i].x, sp.trail[i].y, sp.size * fade * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sc.r},${sc.g},${sc.b},${fade * 0.35 * sp.brightness * gDim})`;
          ctx.fill();
        }

        // Draw sprite core (bright pulse)
        const pulseSz = 1 + Math.sin(sp.pulse) * 0.12;
        const sz = sp.size * pulseSz;

        // Neon glow in sprite color
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${sc.r},${sc.g},${sc.b},${0.55 * sp.brightness * gDim})`;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sc.hr},${sc.hg},${sc.hb},${0.95 * sp.brightness * gDim})`;
        ctx.fill();

        // Soft outer halo
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sc.r},${sc.g},${sc.b},${0.08 * sp.brightness * gDim})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
    };
  }, [theme]);

  // Don't render if there's an error
  if (hasError) {
    return null;
  }

  return (
    <>
      {/* Rain effect layer (behind main canvas) */}
      <div className="fixed inset-0 z-[9] pointer-events-none" aria-hidden>
        <canvas
          ref={rainCanvasRef}
          className="w-full h-full"
          style={{
            opacity: theme === 'light' || theme === 'monochrome-inverted' ? 0.2 : 0.4,
          }}
        />
      </div>
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
