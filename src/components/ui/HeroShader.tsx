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

// Palette A - Soft silver / graphite
const vec3 c1 = vec3(245.0, 245.0, 243.0) / 255.0; // #F5F5F3
const vec3 c2 = vec3(231.0, 231.0, 226.0) / 255.0; // #E7E7E2
const vec3 c3 = vec3(207.0, 207.0, 212.0) / 255.0; // #CFCFD4
const vec3 c4 = vec3(169.0, 171.0, 179.0) / 255.0; // #A9ABB3
const vec3 c5 = vec3(111.0, 115.0, 124.0) / 255.0; // #6F737C
const vec3 c6 = vec3(42.0,  45.0,  51.0)  / 255.0; // #2A2D33

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

    // Mouse coordinates mapped to match
    vec2 mouse = u_mouse / mx;
    // Mirror Y to match gl_FragCoord space natively, or let React handle it. React gives Y from top, gl_Fragcoord is Y from bottom.
    // We already handle Y flip in React so u_mouse is correct bottom-up.
    
    // Create an offset influenced by mouse
    vec2 toMouse = mouse - center;
    // Scale down mouse influence so it's subtle, parallax-like drift
    vec2 offset = toMouse * 0.3;
    
    vec2 pos = uv - offset;

    // FBM Domain warping
    float n1 = snoise(vec3(pos * 2.5, u_time * 0.2));
    float n2 = snoise(vec3(pos * 4.0 + n1 * 0.5, u_time * 0.3));
    float n3 = snoise(vec3(pos * 1.5 + n2 * 0.5, u_time * 0.15));

    // Smooth circular mask from actual center
    float dist = length(uv - center);
    // Tweak to create an organic shape combined with noise
    float radius = 0.35 + n3 * 0.1;
    float mask = smoothstep(radius + 0.15, radius - 0.1, dist);

    // Map noise into color palette
    float t = n3 * 0.5 + 0.5; // 0.0 to 1.0
    
    vec3 color = mix(c1, c2, smoothstep(0.0, 0.2, t));
    color = mix(color, c3, smoothstep(0.2, 0.4, t));
    color = mix(color, c4, smoothstep(0.4, 0.7, t));
    color = mix(color, c5, smoothstep(0.7, 0.9, t));
    color = mix(color, c6, smoothstep(0.9, 1.0, t));

    // Subtle edge fade to pure white (since it's a light background) or to alpha
    // We will use alpha to blend naturally with DOM backgrounds
    gl_FragColor = vec4(color, mask);
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
      className="w-full h-full pointer-events-none absolute inset-0 mix-blend-multiply opacity-90"
      style={{
        maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)"
      }}
    />
  );
}
