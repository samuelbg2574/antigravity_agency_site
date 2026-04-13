"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Palette A - Premium Dark Graphite & Silver
const vec3 c1 = vec3(218.0, 220.0, 224.0) / 255.0; // #DADCE0 - Soft highlight
const vec3 c2 = vec3(185.0, 190.0, 199.0) / 255.0; // #B9BEC7 - Light silver
const vec3 c3 = vec3(140.0, 146.0, 157.0) / 255.0; // #8C929D - Cool grey
const vec3 c4 = vec3(102.0, 109.0, 120.0) / 255.0; // #666D78 - Steel grey
const vec3 c5 = vec3(68.0,  73.0,  82.0)  / 255.0; // #444952 - Graphite
const vec3 c6 = vec3(42.0,  46.0,  53.0)  / 255.0; // #2A2E35 - Deep graphite
const vec3 c7 = vec3(24.0,  26.0,  31.0)  / 255.0; // #181A1F - Near-black

// Simplex 3D Noise by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    float mx = max(u_resolution.x, u_resolution.y);
    vec2 uv = gl_FragCoord.xy / mx;
    vec2 center = u_resolution.xy / mx * 0.5;

    // Mouse coordinates
    vec2 mouse = u_mouse / mx;
    vec2 toMouse = mouse - center;
    vec2 offset = toMouse * 0.15; // More subtle mouse interaction
    
    // Position relative to center
    vec2 pos = uv - center - offset;

    // Rotate field to create diagonal from upper-right to lower-left
    float angle = -0.7; // Approx -40 degrees for a graceful lean
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    vec2 rPos = pos * rot;

    // Extreme anisotropic scaling: heavily stretched along y-axis
    // x is across the streak, y is along the streak
    vec2 stretchPos = vec2(rPos.x * 6.5, rPos.y * 0.7);

    // Directional domain warping - flows completely along the y axis (stroke direction)
    float n1 = snoise(vec3(rPos.x * 4.0, rPos.y * 1.5 - u_time * 0.15, u_time * 0.08));
    float n2 = snoise(vec3(rPos.x * 2.0 + n1 * 0.5, rPos.y * 1.0, u_time * 0.1));
    float n3 = snoise(vec3(rPos.x * 1.0 + n2 * 0.3, rPos.y * 0.5 - u_time * 0.05, u_time * 0.04));

    // Distort the stretched position
    vec2 distortedPos = stretchPos + vec2(n1 * 0.3, n2 * 0.4);

    // Distance field for atmospheric streak core
    float dist = length(distortedPos);
    
    // Smooth feathering
    float mask = smoothstep(1.8, 0.0, dist); // Broad, invisible structural mist
    float core = smoothstep(0.4, 0.0, dist); // Inner luminous core

    // Tonal variation using the noise field
    float t = n3 * 0.5 + 0.5;
    
    // Map dark graphite to lighter silver based on noise/thickness
    vec3 color = mix(c7, c6, smoothstep(0.0, 0.2, t));
    color = mix(color, c5, smoothstep(0.2, 0.4, t));
    color = mix(color, c4, smoothstep(0.4, 0.7, t));
    color = mix(color, c3, smoothstep(0.7, 0.9, t));
    color = mix(color, c2, smoothstep(0.9, 1.0, t));

    // Boost the core slightly with a softer highlight
    color = mix(color, vec3(c1), core * 0.6);

    // Add explicit container edge fading (so it never hits a sharp harsh crop)
    // Canvas dimensions relative coordinates (0.0 to 1.0)
    vec2 canvasUv = gl_FragCoord.xy / u_resolution.xy;
    
    // Very broad left-side fade so it feels embedded into the layout background
    float leftFade = smoothstep(0.0, 0.6, canvasUv.x);
    // Standard soft fades for other edges
    float rightFade = smoothstep(1.0, 0.8, canvasUv.x);
    float topBottomFade = smoothstep(0.0, 0.25, canvasUv.y) * smoothstep(1.0, 0.75, canvasUv.y);
    
    float edgeMask = leftFade * rightFade * topBottomFade;

    // Output with pure alpha blend into the background gradient
    gl_FragColor = vec4(color, mask * edgeMask);
}
`;

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(null);
  
  // State for rendering
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 }); // Target mouse
  const currentMouseRef = useRef({ x: 0, y: 0 }); // Lerped mouse

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Geometry (Fullscreen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Increase resolution slightly for sharpness without killing performance
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Initialize mouse to center
      if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
        mouseRef.current.x = canvas.width / 2;
        mouseRef.current.y = canvas.height / 2;
        currentMouseRef.current.x = canvas.width / 2;
        currentMouseRef.current.y = canvas.height / 2;
      }
    };
    
    window.addEventListener("resize", resize);
    resize();

    let lastTime = performance.now();
    
    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += dt;

      // Lerp mouse
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * 0.05;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * 0.05;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeRef.current);
      gl.uniform2f(uMouse, currentMouseRef.current.x, currentMouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  useEffect(() => {
    // Global mouse tracking bound to the right side constraints
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // We want to capture mouse influence even if outside canvas safely,
      // but clamped so it doesn't pull the center off screen.
      // E.g. clamp X to right half of screen, clamped Y to below nav
      
      // Canvas bounding rect relative to viewport
      const rawX = e.clientX - rect.left;
      // Invert Y for WebGL coords (0 is bottom)
      const rawY = rect.height - (e.clientY - rect.top);
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Clamp the mouse target so it cannot shift indefinitely
      const x = Math.max(0, Math.min(rawX * dpr, rect.width * dpr));
      const y = Math.max(0, Math.min(rawY * dpr, rect.height * dpr));

      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-[140%] h-[140%] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-95 mix-blend-multiply"
    />
  );
}
