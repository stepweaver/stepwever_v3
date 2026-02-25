'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSafeScroll } from '@/utils/useSafeScroll';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';

const COLOR_PALETTES = {
  dark: [
    [0, 255, 0], [255, 255, 0], [255, 165, 0], [255, 0, 0],
    [255, 0, 255], [138, 43, 226], [0, 191, 255], [0, 255, 255],
  ],
  light: [
    [0, 0, 0], [51, 51, 51], [102, 51, 102], [102, 0, 102],
    [153, 0, 153], [153, 0, 51], [51, 51, 102], [0, 51, 102],
  ],
  monochrome: [
    [255, 255, 255], [245, 245, 245], [235, 235, 235], [225, 225, 225],
    [215, 215, 215], [205, 205, 205], [195, 195, 195], [185, 185, 185],
  ],
  'monochrome-inverted': [
    [0, 0, 0], [10, 10, 10], [20, 20, 20], [30, 30, 30],
    [40, 40, 40], [50, 50, 50], [60, 60, 60], [70, 70, 70],
  ],
  vintage: [
    [85, 255, 255], [255, 255, 255], [85, 85, 255], [255, 255, 85],
    [85, 255, 85], [255, 85, 255], [170, 170, 170], [85, 85, 85],
  ],
  apple: [
    [51, 255, 51], [102, 255, 102], [68, 204, 68], [136, 255, 136],
    [119, 255, 119], [85, 255, 85], [153, 255, 153], [34, 136, 34],
  ],
  c64: [
    [163, 230, 255], [124, 112, 218], [163, 163, 255], [216, 216, 255],
    [149, 149, 221], [184, 184, 255], [200, 200, 255], [96, 88, 184],
  ],
  amber: [
    [255, 176, 0], [255, 187, 34], [255, 153, 0], [255, 204, 102],
    [221, 136, 68], [255, 170, 85], [255, 221, 136], [204, 136, 51],
  ],
  synthwave: [
    [255, 20, 147], [0, 255, 255], [157, 0, 255], [255, 255, 0],
    [255, 105, 180], [65, 105, 225], [255, 0, 255], [0, 191, 255],
  ],
  dracula: [
    [189, 147, 249], [255, 121, 198], [139, 233, 253], [80, 250, 123],
    [241, 250, 140], [255, 184, 108], [255, 85, 85], [248, 248, 242],
  ],
  solarized: [
    [42, 161, 152], [38, 139, 210], [133, 153, 0], [181, 137, 0],
    [203, 75, 22], [211, 54, 130], [108, 113, 196], [131, 148, 150],
  ],
  nord: [
    [136, 192, 208], [129, 161, 193], [94, 129, 172], [163, 190, 140],
    [235, 203, 139], [208, 135, 112], [191, 97, 106], [180, 142, 173],
  ],
  cobalt: [
    [255, 198, 0], [255, 157, 0], [255, 0, 136], [174, 129, 255],
    [0, 136, 255], [0, 187, 255], [58, 217, 0], [255, 198, 0],
  ],
};

const GLOW_FILTERS = {
  light: 'drop-shadow(8px 8px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(0,0,0,0.3))',
  monochrome: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 20px rgba(255,255,255,0.4))',
  'monochrome-inverted': 'drop-shadow(0 0 8px rgba(0,0,0,1)) drop-shadow(0 0 20px rgba(0,0,0,0.4))',
  vintage: 'drop-shadow(0 0 8px rgba(85,255,255,1)) drop-shadow(0 0 20px rgba(85,255,255,0.4))',
  apple: 'drop-shadow(0 0 8px rgba(51,255,51,1)) drop-shadow(0 0 20px rgba(51,255,51,0.4))',
  c64: 'drop-shadow(0 0 8px rgba(163,230,255,1)) drop-shadow(0 0 20px rgba(163,230,255,0.4))',
  amber: 'drop-shadow(0 0 8px rgba(255,176,0,1)) drop-shadow(0 0 20px rgba(255,176,0,0.4))',
  synthwave: 'drop-shadow(0 0 8px rgba(255,20,147,1)) drop-shadow(0 0 20px rgba(255,20,147,0.4))',
  dracula: 'drop-shadow(0 0 8px rgba(189,147,249,1)) drop-shadow(0 0 20px rgba(189,147,249,0.4))',
  solarized: 'drop-shadow(0 0 8px rgba(42,161,152,1)) drop-shadow(0 0 20px rgba(42,161,152,0.4))',
  nord: 'drop-shadow(0 0 8px rgba(136,192,208,1)) drop-shadow(0 0 20px rgba(136,192,208,0.4))',
  cobalt: 'drop-shadow(0 0 8px rgba(255,198,0,1)) drop-shadow(0 0 20px rgba(255,198,0,0.4))',
  dark: 'drop-shadow(0 0 8px rgba(0,255,65,1)) drop-shadow(0 0 20px rgba(0,255,65,0.4))',
};

const SPRITE_COLORS = [
  { r: 90,  g: 255, b: 140, hr: 190, hg: 255, hb: 215 },
  { r: 90,  g: 255, b: 140, hr: 190, hg: 255, hb: 215 },
  { r: 0,   g: 200, b: 255, hr: 160, hg: 230, hb: 255 },
  { r: 255, g: 60,  b: 180, hr: 255, hg: 180, hb: 220 },
  { r: 160, g: 80,  b: 255, hr: 210, hg: 180, hb: 255 },
  { r: 255, g: 200, b: 0,   hr: 255, hg: 235, hb: 160 },
  { r: 255, g: 80,  b: 60,  hr: 255, hg: 190, hb: 180 },
  { r: 0,   g: 255, b: 255, hr: 180, hg: 255, hb: 255 },
];

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const rainCanvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const originalImageDataRef = useRef(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  const neonColors = useMemo(
    () => COLOR_PALETTES[theme] || COLOR_PALETTES.dark,
    [theme]
  );

  const neonColorsRef = useRef(neonColors);
  useEffect(() => { neonColorsRef.current = neonColors; }, [neonColors]);

  const rafIdRef = useRef(null);
  const lastColorKeyRef = useRef(null);

  const updateCanvasColors = useCallback(() => {
    const canvas = canvasRef.current;
    const imgData = originalImageDataRef.current;
    if (!canvas || !imgData) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const colors = neonColorsRef.current;
    const progress = scrollProgressRef.current;

    const colorProgress = progress * (colors.length - 1);
    const colorIndex = Math.floor(colorProgress);
    const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
    const blend = colorProgress - colorIndex;

    const cur = colors[colorIndex];
    const nxt = colors[nextColorIndex];
    const r = Math.round(cur[0] * (1 - blend) + nxt[0] * blend);
    const g = Math.round(cur[1] * (1 - blend) + nxt[1] * blend);
    const b = Math.round(cur[2] * (1 - blend) + nxt[2] * blend);

    const colorKey = `${r},${g},${b}`;
    if (lastColorKeyRef.current === colorKey) return;
    lastColorKeyRef.current = colorKey;

    const imageData = new ImageData(
      new Uint8ClampedArray(imgData.data),
      imgData.width,
      imgData.height
    );
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  const updateTransform = useCallback(() => {
    if (!canvasRef.current) return;
    const mobile = isMobileRef.current;
    const sp = scrollProgressRef.current;
    const scale = mobile ? 0.9 - sp * 0.4 : 1.4 - sp * 0.8;
    const tx = mobile ? -30 - sp * 20 : -15 - sp * 25;
    const ty = mobile ? '2%' : '5%';
    canvasRef.current.style.transform = `scale(${scale}) translateX(${tx}%) translateY(${ty})`;
  }, []);

  const handleScroll = useCallback((scrollData) => {
    scrollProgressRef.current = scrollData.scrollProgressY;
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateCanvasColors();
        updateTransform();
      });
    }
  }, [updateCanvasColors, updateTransform]);

  useSafeScroll({
    onScroll: handleScroll,
    throttleMs: 16,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      isMobileRef.current = window.innerWidth < 768;
      updateTransform();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, { passive: true });
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [updateTransform]);

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
        originalImageDataRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHasError(false);
        updateCanvasColors();
        updateTransform();
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error('Error processing background image:', error);
        setHasError(true);
      }
    };

    let webpFailed = false;
    img.onerror = () => {
      if (!webpFailed) {
        webpFailed = true;
        img.src = '/images/lambda_stepweaver.png';
      } else {
        console.error('Failed to load background image');
        setHasError(true);
      }
    };
    img.src = '/images/lambda_stepweaver.webp';
  }, [updateCanvasColors, updateTransform]);

  // Re-color when theme changes
  useEffect(() => {
    lastColorKeyRef.current = null;
    updateCanvasColors();
  }, [neonColors, updateCanvasColors]);

  // Circuit-board data sprites
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

    function makeTrace(a, b) {
      const pts = [{ x: a.x, y: a.y }];
      const roll = Math.random();
      if (roll < 0.3) {
        pts.push({ x: b.x, y: a.y });
      } else if (roll < 0.6) {
        pts.push({ x: a.x, y: b.y });
      } else {
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

    function buildCircuit() {
      nodes = [];
      edges = [];
      sprites = [];

      const isMobileCircuit = W < 768;
      const cell = isMobileCircuit ? (100 + Math.floor(Math.random() * 30)) : (70 + Math.floor(Math.random() * 20));
      const cols = Math.ceil(W / cell) + 2;
      const rows = Math.ceil(H / cell) + 2;

      const fillRate = isMobileCircuit ? 0.55 : 0.7;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          if (Math.random() > fillRate) continue;
          nodes.push({
            x: c * cell + (Math.random() - 0.5) * cell * 0.55,
            y: r * cell + (Math.random() - 0.5) * cell * 0.55,
            edges: [],
            flash: 0,
          });
        }
      }

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
          if (added >= (isMobileCircuit ? 3 : 5)) break;
          const key = `${i}-${j}`;
          if (edgeSet.has(key)) continue;
          const maxConn = isMobileCircuit ? 4 : 6;
          if (nodes[i].edges.length >= maxConn || nodes[j].edges.length >= maxConn) continue;
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

      if (edges.length === 0) return;
      const spriteRatio = isMobileCircuit ? 0.35 : 0.5;
      const count = Math.max(8, Math.min(isMobileCircuit ? 30 : 80, Math.floor(edges.length * spriteRatio)));
      for (let i = 0; i < count; i++) sprites.push(newSprite());
    }

    function newSprite() {
      const eIdx = Math.floor(Math.random() * edges.length);
      const fwd = Math.random() > 0.5;
      const color = SPRITE_COLORS[Math.floor(Math.random() * SPRITE_COLORS.length)];
      return {
        eIdx,
        t: fwd ? 0 : 1,
        speed: 0.0015 + Math.random() * 0.005,
        forward: fwd,
        size: 1.4 + Math.random() * 1.6,
        brightness: 0.65 + Math.random() * 0.35,
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

      ctx.lineCap = 'square';
      ctx.lineJoin = 'miter';
      for (const e of edges) {
        ctx.beginPath();
        ctx.moveTo(e.pts[0].x, e.pts[0].y);
        for (let i = 1; i < e.pts.length; i++) ctx.lineTo(e.pts[i].x, e.pts[i].y);
        ctx.strokeStyle = `rgba(90,255,140,${0.09 * gDim})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      for (const n of nodes) {
        if (n.edges.length === 0) continue;

        let flashA = 0;
        if (n.flash > 0) { flashA = n.flash / 25; n.flash--; }

        const s = 1.5;
        const baseA = 0.1 + flashA * 0.4;
        ctx.fillStyle = `rgba(90,255,140,${baseA * gDim})`;
        ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);

        if (flashA > 0.05) {
          const fc = n.flashColor || { r: 90, g: 255, b: 140 };
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${fc.r},${fc.g},${fc.b},${flashA * 0.45 * gDim})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4 + flashA * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${fc.r},${fc.g},${fc.b},${flashA * 0.2 * gDim})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (const sp of sprites) {
        if (!sp) continue;
        const edge = edges[sp.eIdx];
        if (!edge) continue;

        sp.t += sp.forward ? sp.speed : -sp.speed;
        sp.pulse += 0.07;

        const pos = posOnPath(edge.pts, edge.len, sp.t);

        sp.trail.push({ x: pos.x, y: pos.y });
        if (sp.trail.length > sp.trailMax) sp.trail.shift();

        if (sp.t >= 1 || sp.t <= 0) {
          const nodeIdx = sp.t >= 1 ? edge.to : edge.from;
          const node = nodes[nodeIdx];
          if (node && node.edges.length > 0) {
            node.flash = 25;
            node.flashColor = sp.color;

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

        const sc = sp.color;
        for (let i = 0; i < sp.trail.length; i++) {
          const fade = (i + 1) / sp.trail.length;
          ctx.beginPath();
          ctx.arc(sp.trail[i].x, sp.trail[i].y, sp.size * fade * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sc.r},${sc.g},${sc.b},${fade * 0.5 * sp.brightness * gDim})`;
          ctx.fill();
        }

        const pulseSz = 1 + Math.sin(sp.pulse) * 0.12;
        const sz = sp.size * pulseSz;

        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${sc.r},${sc.g},${sc.b},${0.5 * sp.brightness * gDim})`;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sc.hr},${sc.hg},${sc.hb},${0.95 * sp.brightness * gDim})`;
        ctx.fill();

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

  if (hasError) {
    return null;
  }

  const isLightish = theme === 'light' || theme === 'monochrome-inverted';
  const glowFilter = GLOW_FILTERS[theme] || GLOW_FILTERS.dark;

  return (
    <>
      <div className="fixed inset-0 z-[9] pointer-events-none" aria-hidden>
        <canvas
          ref={rainCanvasRef}
          className="w-full h-full"
          style={{ opacity: isLightish ? 0.2 : 0.4 }}
        />
      </div>
      <div className='fixed inset-0 z-10 flex items-center justify-start'>
        <canvas
          ref={canvasRef}
          width={1024}
          height={1536}
          className={`origin-center transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: glowFilter,
            opacity: isLightish ? 0.2 : 0.3,
          }}
        />
      </div>
    </>
  );
}
