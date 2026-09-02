'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero object: an analytic sphere with a domain-warped silk surface and
 * thin rotating meridians, drawn in a single fragment shader. Hand-written
 * WebGL rather than a 3D library, so it costs a few kilobytes instead of a
 * few hundred. It reads the palette from the page, pauses when it scrolls out
 * of view or the tab is hidden, and renders one still frame when the visitor
 * asks for reduced motion.
 */

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uSheen;
uniform vec3 uGlow;

const float PI = 3.14159265;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += amp * vnoise(p);
    p *= 2.03;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float radius = 0.44;
  float d = length(uv) / radius;
  float t = uTime;

  float z = sqrt(max(0.0, 1.0 - d * d));
  vec3 n = normalize(vec3(uv / radius, max(z, 0.0001)));

  // Silk: anisotropic noise warped by noise, so the surface reads as drawn
  // fabric or brushed chrome rather than cloud.
  vec2 q = vec2(n.x * 2.05, n.y * 0.62) + vec2(t * 0.03, 0.16 * sin(t * 0.07));
  float warp = fbm(q * 0.85 + t * 0.035);
  float w = fbm(q * 1.15 + warp * 1.7);
  float streak = smoothstep(0.3, 0.92, w * 1.0 + 0.22 * n.y + 0.24);
  float sheenAmt = pow(streak, 2.3);

  vec3 lightDir = normalize(vec3(-0.34, 0.66, 0.67));
  float diffuse = clamp(dot(n, lightDir), 0.0, 1.0);
  vec3 ref = reflect(-lightDir, n);
  float specTight = pow(clamp(ref.z, 0.0, 1.0), 34.0);
  float specBroad = pow(clamp(ref.z, 0.0, 1.0), 7.0);
  float fresnel = pow(1.0 - clamp(z, 0.0, 1.0), 2.6);

  vec3 col = uBase * (0.32 + 0.55 * diffuse);
  col += uSheen * sheenAmt * (0.36 + 0.44 * diffuse);
  col += uSheen * specTight * (0.2 + 0.8 * sheenAmt) * 0.7;
  col += uSheen * specBroad * 0.13;
  col += uGlow * fresnel * 0.2;
  col *= 0.46 + 0.68 * diffuse;

  // Filmic roll-off, so the bright silk never clips to flat white.
  col = col / (1.0 + col * 0.42);

  // The cage: thin meridians, brightest where the surface turns away.
  float lon = atan(n.x, n.z) + t * 0.12;
  float lonSeg = PI / 8.0;
  float mLon = abs(fract(lon / lonSeg + 0.5) - 0.5) * 2.0;
  float aaLon = 2.0 * fwidth(lon) / lonSeg * 1.1 + 0.0012;
  float lineLon = 1.0 - smoothstep(0.0, aaLon, mLon);

  float lat = asin(clamp(n.y, -1.0, 1.0));
  float latSeg = PI / 4.0;
  float mLat = abs(fract(lat / latSeg + 0.5) - 0.5) * 2.0;
  float aaLat = 2.0 * fwidth(lat) / latSeg * 1.1 + 0.0012;
  float lineLat = (1.0 - smoothstep(0.0, aaLat, mLat)) * 0.35;

  float wire = clamp(lineLon + lineLat, 0.0, 1.0) * (0.14 + 0.86 * pow(fresnel, 0.75));
  col = mix(col, uGlow * 1.2, wire * 0.9);

  float edge = fwidth(d) * 1.6;
  float alpha = 1.0 - smoothstep(1.0 - edge, 1.0 + edge, d);

  // A faint halo so the object sits in the page instead of looking cut out.
  float halo = exp(-pow(max(d - 1.0, 0.0) * 7.0, 1.5));
  alpha = max(alpha, halo * 0.14);

  outColor = vec4(col, alpha);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function readPalette(): { base: number[]; sheen: number[]; glow: number[] } {
  const dark = document.documentElement.classList.contains('dark');
  const styles = getComputedStyle(document.documentElement);
  const accent = styles
    .getPropertyValue('--accent')
    .trim()
    .split(/\s+/)
    .map((value) => Number(value) / 255);
  const glow = accent.length === 3 && accent.every((v) => !Number.isNaN(v)) ? accent : [0, 0.45, 0.51];

  return dark
    ? { base: [0.047, 0.067, 0.075], sheen: [0.88, 0.93, 0.935], glow }
    : { base: [0.115, 0.14, 0.148], sheen: [0.96, 0.955, 0.93], glow };
}

export function HeroObject({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      canvas.dataset.unsupported = 'true';
      return;
    }

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vert || !frag || !program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uBase = gl.getUniformLocation(program, 'uBase');
    const uSheen = gl.getUniformLocation(program, 'uSheen');
    const uGlow = gl.getUniformLocation(program, 'uGlow');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let palette = readPalette();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (time: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform3fv(uBase, palette.base);
      gl.uniform3fv(uSheen, palette.sheen);
      gl.uniform3fv(uGlow, palette.glow);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let frame = 0;
    let start = performance.now();
    let running = false;
    let started = false;

    const loop = (now: number) => {
      draw((now - start) / 1000);
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || reduceQuery.matches) return;
      running = true;
      start = performance.now() - 4000; // start mid-motion, not from a flat field
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // Nothing is drawn until the browser is idle, so the shader never competes
    // with the first paint or with hydration.
    let idleHandle = 0;
    let timeoutHandle = 0;
    const startWhenIdle = () => {
      started = true;
      draw(4);
      const observe = () => {
        if (!document.hidden) play();
      };
      observe();
    };
    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleHandle = idleWindow.requestIdleCallback(startWhenIdle, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(startWhenIdle, 300);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          if (started) play();
        } else {
          pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);

    // Repaint with the other palette when the theme is toggled.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (!running) draw(4);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onReduceChange = () => {
      pause();
      palette = readPalette();
      draw(4);
      if (!reduceQuery.matches) play();
    };
    reduceQuery.addEventListener('change', onReduceChange);

    const onResize = () => {
      if (!running) draw(4);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (idleHandle && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      pause();
      observer.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduceQuery.removeEventListener('change', onReduceChange);
      window.removeEventListener('resize', onResize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
      // No fallback graphic: without WebGL the hero is type on paper, which is
      // the same page with one fewer layer.
    />
  );
}
