"use client"
import { useEffect, useRef } from "react"
import { useTheme } from "./ThemeProvider"

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const darkRef   = useRef<number>(0)   // 0 = light, 1 = dark — smoothly animated
  const { theme } = useTheme()

  // Push theme target into ref so the render loop can access it without re-mounting
  useEffect(() => {
    // darkRef.current is the target; the render loop lerps toward it
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vs = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0, 1); }`
    const fs = `
      precision mediump float;
      uniform float u_time;
      uniform vec2  u_res;
      uniform float u_dark;   /* 0 = light, 1 = dark — lerp between themes */

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3. - 2. * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }
      float fbm(vec2 p){
        float v = 0., a = .5;
        for(int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2. + 1.7; a *= .5; }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res;
        float t = u_time * 0.07;

        float n1 = fbm(uv * 2.0 + vec2(t * .4, t * .2));
        float n2 = fbm(uv * 1.5 + vec2(-t * .3, t * .15) + n1 * .5);
        float aurora = n1 * n2;

        /* ── Light palette ── */
        vec3 l_base  = vec3(0.957, 0.984, 0.996);  /* #F4FAFE */
        vec3 l_tint1 = vec3(0.882, 0.965, 0.992);
        vec3 l_tint2 = vec3(0.773, 0.933, 0.984);
        vec3 l_tint3 = vec3(0.600, 0.880, 0.970);

        vec3 l_col = l_base;
        l_col = mix(l_col, l_tint1, smoothstep(0.30, 0.55, n1));
        l_col = mix(l_col, l_tint2, smoothstep(0.45, 0.65, aurora));
        l_col = mix(l_col, l_tint3, smoothstep(0.60, 0.80, n2) * 0.5);
        float l_warm = 1. - length(uv - vec2(0.85, 0.15)) * 1.2;
        l_col = mix(l_col, vec3(1., 0.97, 0.93), clamp(l_warm, 0., 1.) * 0.15);

        /* ── Dark palette ── */
        vec3 d_base  = vec3(0.004, 0.051, 0.078);  /* #010D14 */
        vec3 d_tint1 = vec3(0.006, 0.080, 0.120);
        vec3 d_tint2 = vec3(0.010, 0.110, 0.168);
        vec3 d_tint3 = vec3(0.024, 0.180, 0.260);

        vec3 d_col = d_base;
        d_col = mix(d_col, d_tint1, smoothstep(0.30, 0.55, n1));
        d_col = mix(d_col, d_tint2, smoothstep(0.45, 0.68, aurora));
        d_col = mix(d_col, d_tint3, smoothstep(0.60, 0.80, n2) * 0.45);
        float d_warm = 1. - length(uv - vec2(0.90, 0.08)) * 2.5;
        d_col += vec3(0.06, 0.03, 0.0) * clamp(d_warm, 0., 1.) * 0.3;

        /* Interpolate between themes */
        vec3 col = mix(l_col, d_col, u_dark);
        gl_FragColor = vec4(col, 1.);
      }
    `

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(vs, gl.VERTEX_SHADER))
    gl.attachShader(prog, compile(fs, gl.FRAGMENT_SHADER))
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes  = gl.getUniformLocation(prog, "u_res")
    const uDark = gl.getUniformLocation(prog, "u_dark")

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    let currentDark = 0
    const start = performance.now()

    const render = (now: number) => {
      // Lerp toward target (read from DOM attribute so no re-mount needed)
      const isDark = document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0
      currentDark += (isDark - currentDark) * 0.05

      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uDark, currentDark)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])  // mount once — reads DOM attribute each frame

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
    />
  )
}
