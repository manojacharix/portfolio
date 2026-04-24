"use client"
import { useEffect, useRef } from "react"

// All terminal lines are hardcoded constants — no user input, no XSS risk
const LINES = [
  { type: "cmd",     prompt: "agent@manoj:~$", text: "./agent init --watch manoj.work" },
  { type: "out",     text: "Initializing autonomous agent v2.1.0..." },
  { type: "out",     text: "Loading context: manoj_achari.profile" },
  { type: "success", text: "[ok] Profile loaded — AI Product Manager" },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent scan --projects --live" },
  { type: "out",     text: "Scanning repository..." },
  { type: "bar",     text: "XXXXXXXXXXXXXXXXXXXX 100%  5 projects" },
  { type: "success", text: "[ok] Indexed: Litscreen — 89% efficiency gain" },
  { type: "success", text: "[ok] Indexed: Zataak Se — payments, 3-app system" },
  { type: "success", text: "[ok] Indexed: Job Automation — 0-to-1 pipeline" },
  { type: "warn",    text: "[!] New commit detected — branch: main" },
  { type: "out",     text: "Fetching diff: +847 -212 lines" },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent update --site --deploy" },
  { type: "out",     text: "Generating project summary..." },
  { type: "success", text: "[ok] Site updated — sector coverage: 13/13" },
  { type: "out",     text: "Manoj is currently building. Stand by." },
  { type: "cmd",     prompt: "agent@manoj:~$", text: "agent status" },
  { type: "success", text: "STATUS: NOMINAL  |  UPTIME: 99.98%" },
  { type: "out",     text: "Next scan in 3600s. Watching..." },
  { type: "cursor",  text: "" },
]

function colorStyle(type: string) {
  if (type === "success") return "rgba(52,211,153,0.8)"
  if (type === "warn")    return "rgba(241,143,1,0.85)"
  if (type === "bar")     return "rgba(38,192,248,0.7)"
  if (type === "cmd")     return "rgba(109,213,250,0.95)"
  return "rgba(166,229,252,0.55)"
}

export default function HeroTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Dot matrix WebGL
  useEffect(() => {
    const hc = canvasRef.current
    if (!hc) return
    const gl = hc.getContext("webgl")
    if (!gl) return

    const vs = `attribute vec2 p; void main(){gl_Position=vec4(p,0,1);}`
    const fs = `
      precision highp float;
      uniform float T; uniform vec2 R;
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/R; uv.y=1.-uv.y;
        float COLS=floor(R.x/10.),ROWS=floor(R.y/10.);
        vec2 cellUV=fract(uv*vec2(COLS,ROWS)),cellID=floor(uv*vec2(COLS,ROWS));
        float d=length(cellUV-.5),dotMask=1.-smoothstep(.18,.28,d);
        float n=noise(cellID*.12+T*.08),n2=noise(cellID*.06-T*.05+99.);
        float brightness=pow(n*n2,.6);
        float stream=noise(vec2(cellID.x*.3,T*1.4-cellID.y*.1));
        stream=pow(max(stream-.4,0.)/.6,2.);
        brightness=max(brightness,stream*.9);
        brightness=max(brightness,step(.97,hash(cellID+floor(T*3.)))*0.8);
        brightness*=dotMask;
        float scan=.88+.12*sin(uv.y*R.y*3.14159);
        vec3 bg=vec3(.004,.051,.082),dotDim=vec3(.02,.12,.20),dotMid=vec3(.06,.45,.72),dotBright=vec3(.15,.75,.97),dotPeak=vec3(.75,.95,1.);
        vec3 dotCol=mix(dotDim,dotMid,smoothstep(0.,.3,brightness));
        dotCol=mix(dotCol,dotBright,smoothstep(.3,.7,brightness));
        dotCol=mix(dotCol,dotPeak,smoothstep(.7,1.,brightness));
        vec3 col=mix(bg,dotCol,dotMask*(.12+brightness*.88));
        col*=scan;
        vec2 vig=uv*(1.-uv);
        col*=pow(vig.x*vig.y*18.,.25);
        gl_FragColor=vec4(col,1.);
      }
    `
    const mk = (src: string, t: number) => {
      const s = gl.createShader(t)!
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, mk(vs, gl.VERTEX_SHADER))
    gl.attachShader(pr, mk(fs, gl.FRAGMENT_SHADER))
    gl.linkProgram(pr); gl.useProgram(pr)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const pl = gl.getAttribLocation(pr, "p")
    gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0)
    const uT = gl.getUniformLocation(pr, "T"), uR = gl.getUniformLocation(pr, "R")

    const resize = () => {
      const rect = hc.parentElement!.getBoundingClientRect()
      hc.width = rect.width; hc.height = rect.height
      gl.viewport(0, 0, hc.width, hc.height)
    }
    resize(); window.addEventListener("resize", resize)
    const t0 = performance.now()
    const frame = (now: number) => {
      gl.uniform1f(uT, (now - t0) / 1000)
      gl.uniform2f(uR, hc.width, hc.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize) }
  }, [])

  // Typewriter using DOM API (no innerHTML with user content)
  useEffect(() => {
    const container = textRef.current
    if (!container) return
    let lineIdx = 0, charIdx = 0
    const rendered: { type: string; prompt?: string; text: string }[] = []

    const rebuildDOM = () => {
      container.replaceChildren()
      rendered.forEach(l => {
        const row = document.createElement("div")
        row.style.cssText = "display:flex;gap:6px"

        if (l.type === "cmd") {
          const prompt = document.createElement("span")
          prompt.style.cssText = "color:rgba(38,192,248,0.4);flex-shrink:0"
          prompt.textContent = l.prompt ?? ""
          const cmd = document.createElement("span")
          cmd.style.color = colorStyle("cmd")
          cmd.textContent = l.text
          row.append(prompt, cmd)
        } else if (l.type === "cursor") {
          const prompt = document.createElement("span")
          prompt.style.cssText = "color:rgba(38,192,248,0.4)"
          prompt.textContent = "agent@manoj:~$"
          const cur = document.createElement("span")
          cur.style.cssText = "display:inline-block;width:7px;height:13px;background:rgba(109,213,250,0.8);vertical-align:middle;animation:blink 1s step-end infinite"
          row.append(prompt, cur)
        } else {
          const span = document.createElement("span")
          span.style.cssText = `padding-left:16px;color:${colorStyle(l.type)}`
          span.textContent = l.text
          row.appendChild(span)
        }
        container.appendChild(row)
      })
      container.scrollTop = container.scrollHeight
    }

    const type = () => {
      if (lineIdx >= LINES.length) {
        typeRef.current = setTimeout(() => { rendered.length = 0; lineIdx = 0; charIdx = 0; type() }, 4000)
        return
      }
      const line = LINES[lineIdx]
      if (line.type === "cursor") {
        rendered.push(line); rebuildDOM(); lineIdx++
        typeRef.current = setTimeout(type, 3200)
        return
      }
      if (line.type === "cmd") {
        if (charIdx === 0) rendered.push({ ...line, text: "" })
        rendered[rendered.length - 1].text = line.text.slice(0, charIdx + 1)
        rebuildDOM(); charIdx++
        if (charIdx < line.text.length) {
          typeRef.current = setTimeout(type, 38 + Math.random() * 30)
        } else { charIdx = 0; lineIdx++; typeRef.current = setTimeout(type, 320) }
      } else {
        rendered.push(line); rebuildDOM(); lineIdx++
        typeRef.current = setTimeout(type, line.type === "bar" ? 60 : 90)
      }
    }
    typeRef.current = setTimeout(type, 600)
    return () => { if (typeRef.current) clearTimeout(typeRef.current) }
  }, [])

  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      boxShadow: "0 24px 80px rgba(1,26,35,0.18), 0 4px 16px rgba(1,26,35,0.1)",
      border: "1px solid rgba(38,192,248,0.15)",
      height: 460, display: "flex", flexDirection: "column",
    }}>
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#011A23", borderBottom: "1px solid rgba(38,192,248,0.1)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["#FF5F57","#FEBC2E","#28C840"] as const).map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(38,192,248,0.4)", letterSpacing: "0.06em", flex: 1, textAlign: "center" }}>
          agent@manoj — bash — 80x24
        </div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#010D14" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} />
        <div ref={textRef} style={{ position: "absolute", inset: 0, padding: "16px 18px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7, color: "rgba(109,213,250,0.85)", overflow: "hidden", textShadow: "0 0 8px rgba(38,192,248,0.5)" }} />
      </div>
    </div>
  )
}
