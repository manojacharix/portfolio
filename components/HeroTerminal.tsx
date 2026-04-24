"use client"
import { useEffect, useRef } from "react"

const LINES = [
  { type: "cmd",     prompt: "agent@manoj:~$", text: "./agent init --watch manoj.work" },
  { type: "out",     text: "Initializing autonomous agent v2.1.0..." },
  { type: "out",     text: "Loading context: manoj_achari.profile" },
  { type: "success", text: "[ok] Profile loaded — AI Product Manager" },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent scan --projects --live" },
  { type: "out",     text: "Scanning repository..." },
  { type: "bar",     text: "████████████████████ 100%  6 projects" },
  { type: "success", text: "[ok] Indexed: Intelligent Doc Assistant" },
  { type: "success", text: "[ok] Indexed: Growth Analytics Platform" },
  { type: "success", text: "[ok] Indexed: Brand OS" },
  { type: "warn",    text: "[!] New commit detected — branch: main" },
  { type: "out",     text: "Fetching diff: +847 −212 lines" },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent update --site --deploy" },
  { type: "out",     text: "Generating project summary..." },
  { type: "out",     text: "Updating work index..." },
  { type: "success", text: "[ok] Site updated — 2 new entries" },
  { type: "out",     text: "Manoj is currently building. Stand by." },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent status" },
  { type: "success", text: "STATUS: NOMINAL  |  UPTIME: 99.98%" },
  { type: "out",     text: "Next scan in 3600s. Watching..." },
  { type: "cursor",  text: "" },
]

function lineColor(type: string) {
  if (type === "success") return "rgba(52,211,153,0.8)"
  if (type === "warn")    return "rgba(241,143,1,0.85)"
  if (type === "bar")     return "rgba(38,192,248,0.7)"
  if (type === "cmd")     return "rgba(109,213,250,0.95)"
  return "rgba(166,229,252,0.55)"
}

export default function HeroTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef   = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Dot-matrix WebGL
  useEffect(() => {
    const hc = canvasRef.current
    if (!hc) return
    const gl = hc.getContext("webgl")
    if (!gl) return

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0, 1); }`
    const fs = `
      precision highp float;
      uniform float T;
      uniform vec2 R;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        vec2 u = f*f*(3.-2.*f);
        return mix(
          mix(hash(i), hash(i+vec2(1,0)), u.x),
          mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x),
          u.y
        );
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / R;
        uv.y = 1.0 - uv.y;

        float COLS = floor(R.x / 10.0);
        float ROWS = floor(R.y / 10.0);
        vec2 cell = vec2(COLS, ROWS);
        vec2 cellUV = fract(uv * cell);
        vec2 cellID = floor(uv * cell);

        float d = length(cellUV - 0.5);
        float dotMask = 1.0 - smoothstep(0.18, 0.28, d);

        float n  = noise(cellID * 0.12 + T * 0.08);
        float n2 = noise(cellID * 0.06 - T * 0.05 + 99.0);
        float brightness = pow(n * n2, 0.6);

        float stream = noise(vec2(cellID.x * 0.3, T * 1.4 - cellID.y * 0.1));
        stream = pow(max(stream - 0.4, 0.0) / 0.6, 2.0);
        brightness = max(brightness, stream * 0.9);

        float flash = step(0.97, hash(cellID + floor(T * 3.0)));
        brightness = max(brightness, flash * 0.8);
        brightness *= dotMask;

        float scan = 0.88 + 0.12 * sin(uv.y * R.y * 3.14159);

        vec3 bg        = vec3(0.004, 0.051, 0.082);
        vec3 dotDim    = vec3(0.02,  0.12,  0.20);
        vec3 dotMid    = vec3(0.06,  0.45,  0.72);
        vec3 dotBright = vec3(0.15,  0.75,  0.97);
        vec3 dotPeak   = vec3(0.75,  0.95,  1.00);

        vec3 dotCol = mix(dotDim,    dotMid,    smoothstep(0.0, 0.3, brightness));
        dotCol      = mix(dotCol,    dotBright, smoothstep(0.3, 0.7, brightness));
        dotCol      = mix(dotCol,    dotPeak,   smoothstep(0.7, 1.0, brightness));

        vec3 col = mix(bg, dotCol, dotMask * (0.12 + brightness * 0.88));
        col *= scan;

        vec2 vig = uv * (1. - uv);
        col *= pow(vig.x * vig.y * 18.0, 0.25);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const mk = (src: string, t: number) => {
      const s = gl.createShader(t)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, mk(vs, gl.VERTEX_SHADER))
    gl.attachShader(pr, mk(fs, gl.FRAGMENT_SHADER))
    gl.linkProgram(pr)
    gl.useProgram(pr)

    const b = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, b)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pl = gl.getAttribLocation(pr, "p")
    gl.enableVertexAttribArray(pl)
    gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0)

    const uT = gl.getUniformLocation(pr, "T")
    const uR = gl.getUniformLocation(pr, "R")

    const resize = () => {
      const rect = hc.parentElement!.getBoundingClientRect()
      hc.width  = rect.width
      hc.height = rect.height
      gl.viewport(0, 0, hc.width, hc.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const t0 = performance.now()
    const frame = (now: number) => {
      gl.uniform1f(uT, (now - t0) / 1000)
      gl.uniform2f(uR, hc.width, hc.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  // Typewriter — DOM API only, no innerHTML
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    let lineIdx = 0
    let charIdx = 0
    const rendered: Array<{ type: string; prompt?: string; text: string }> = []

    const rebuild = () => {
      while (el.firstChild) el.removeChild(el.firstChild)

      rendered.forEach(line => {
        const row = document.createElement("div")
        row.style.cssText = "display:flex;gap:6px;"

        if (line.type === "cursor") {
          const prompt = document.createElement("span")
          prompt.style.cssText = "color:rgba(38,192,248,0.4);flex-shrink:0;"
          prompt.textContent = "agent@manoj:~$"
          const cur = document.createElement("span")
          cur.style.cssText = "display:inline-block;width:7px;height:13px;background:rgba(109,213,250,0.8);vertical-align:middle;margin-left:2px;animation:blink 1s step-end infinite;"
          row.appendChild(prompt)
          row.appendChild(cur)
        } else if (line.type === "cmd") {
          const prompt = document.createElement("span")
          prompt.style.cssText = "color:rgba(38,192,248,0.4);flex-shrink:0;"
          prompt.textContent = line.prompt || "agent@manoj:~$"
          const cmd = document.createElement("span")
          cmd.style.cssText = `color:${lineColor("cmd")};`
          cmd.textContent = line.text
          row.appendChild(prompt)
          row.appendChild(cmd)
        } else {
          const span = document.createElement("span")
          span.style.cssText = `padding-left:16px;color:${lineColor(line.type)};`
          span.textContent = line.text
          row.appendChild(span)
        }

        el.appendChild(row)
      })

      el.scrollTop = el.scrollHeight
    }

    const type = () => {
      if (lineIdx >= LINES.length) {
        timerRef.current = setTimeout(() => {
          while (el.firstChild) el.removeChild(el.firstChild)
          rendered.length = 0
          lineIdx = 0
          charIdx = 0
          type()
        }, 4000)
        return
      }

      const line = LINES[lineIdx]

      if (line.type === "cursor") {
        rendered.push({ ...line })
        rebuild()
        lineIdx++
        timerRef.current = setTimeout(type, 3200)
        return
      }

      if (line.type === "cmd") {
        if (charIdx === 0) rendered.push({ ...line, text: "" })
        rendered[rendered.length - 1].text = line.text.slice(0, charIdx + 1)
        rebuild()
        charIdx++
        if (charIdx < line.text.length) {
          timerRef.current = setTimeout(type, 38 + Math.random() * 30)
        } else {
          charIdx = 0
          lineIdx++
          timerRef.current = setTimeout(type, 320)
        }
      } else {
        rendered.push({ ...line })
        rebuild()
        lineIdx++
        timerRef.current = setTimeout(type, line.type === "bar" ? 60 : 90)
      }
    }

    timerRef.current = setTimeout(type, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      boxShadow: "0 24px 80px rgba(1,26,35,0.18), 0 4px 16px rgba(1,26,35,0.1)",
      border: "1px solid rgba(38,192,248,0.15)",
      height: "100%",
      display: "flex", flexDirection: "column",
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        background: "#011A23",
        borderBottom: "1px solid rgba(38,192,248,0.1)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(38,192,248,0.4)", letterSpacing: "0.06em", flex: 1, textAlign: "center" }}>
          agent@manoj — bash — 80×24
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#010D14" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} />
        <div
          ref={textRef}
          style={{
            position: "absolute", inset: 0,
            padding: "16px 18px",
            fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7,
            color: "rgba(109,213,250,0.85)",
            overflow: "hidden",
            textShadow: "0 0 8px rgba(38,192,248,0.5)",
          }}
        />
      </div>
    </div>
  )
}
