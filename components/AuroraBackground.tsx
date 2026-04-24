"use client"
import { useEffect, useRef } from "react"

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vs = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0,1);}`
    const fs = `
      precision mediump float;
      uniform float u_time; uniform vec2 u_res;
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }
      float noise(vec2 p){
        vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      float fbm(vec2 p){
        float v=0.,a=.5;
        for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.+1.7;a*=.5;}
        return v;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/u_res;
        float t=u_time*0.08;
        float n1=fbm(uv*2.+vec2(t*.4,t*.2));
        float n2=fbm(uv*1.5+vec2(-t*.3,t*.15)+n1*.5);
        float aurora=n1*n2;
        vec3 base=vec3(0.957,0.984,0.996);
        vec3 tint1=vec3(0.882,0.965,0.992);
        vec3 tint2=vec3(0.773,0.933,0.984);
        vec3 tint3=vec3(0.6,0.88,0.97);
        vec3 col=base;
        col=mix(col,tint1,smoothstep(0.3,0.55,n1));
        col=mix(col,tint2,smoothstep(0.45,0.65,aurora));
        col=mix(col,tint3,smoothstep(0.6,0.8,n2)*0.5);
        float warmspot=1.-length(uv-vec2(0.85,0.15))*1.2;
        col=mix(col,vec3(1.,.97,.93),clamp(warmspot,0.,1.)*0.15);
        gl_FragColor=vec4(col,1.);
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes = gl.getUniformLocation(prog, "u_res")

    const resize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize(); window.addEventListener("resize", resize)
    const start = performance.now()
    const render = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  )
}
