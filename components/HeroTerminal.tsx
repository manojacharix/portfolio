"use client"
import { useEffect, useRef } from "react"

/* ─────────────────────────────────────────────────────────────
   Mac128 dot-matrix hero
   • Full canvas is a cyan-phosphor dot grid
   • Dots inside the Mac silhouette light up brighter
   • Dots inside the screen area run an animated terminal readout
   ───────────────────────────────────────────────────────────── */

// Mac 128k shape — normalised coords [0,1]²
// Outer body (rounded rect), disk slot, screen cut-out
// We define everything as simple SDF shapes evaluated per-dot in JS
// so we keep WebGL simple (one full-screen quad) and do logic in the shader.

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// The fragment shader draws the dot grid and applies three layers:
//  1. background dots (very dim)
//  2. Mac-body dots (medium phosphor)
//  3. Screen dots (bright + scrolling text scanline)
const FRAG = `
precision highp float;
uniform float T;       // time seconds
uniform vec2  R;       // resolution
uniform float COLS;    // dot columns
uniform float ROWS;    // dot rows

// ── helpers ──────────────────────────────────────────────────
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}

// Signed distance: rounded rectangle, centred at c, half-size hs, radius r
float sdRoundRect(vec2 p, vec2 c, vec2 hs, float r){
  vec2 q = abs(p - c) - hs + r;
  return length(max(q, 0.0)) + min(max(q.x,q.y), 0.0) - r;
}

// ── Mac 128k SDF (normalised UV space) ──────────────────────
// Overall body
float macBody(vec2 uv){
  // body: centred ~(0.5, 0.46), width 0.52, height 0.70, radius 0.06
  return sdRoundRect(uv, vec2(0.50, 0.46), vec2(0.245, 0.335), 0.055);
}

// Screen cut-out: centred (0.50, 0.56), half-size (0.175, 0.155)
float macScreen(vec2 uv){
  return sdRoundRect(uv, vec2(0.50, 0.575), vec2(0.175, 0.145), 0.018);
}

// Disk slot: thin horizontal rect at bottom-front
float diskSlot(vec2 uv){
  return sdRoundRect(uv, vec2(0.50, 0.185), vec2(0.09, 0.012), 0.008);
}

// Power button: tiny rect top-right area of front
float powerBtn(vec2 uv){
  return sdRoundRect(uv, vec2(0.635, 0.185), vec2(0.018, 0.012), 0.006);
}

// Chin label area (very subtle — just a horizontal band)
float chinBand(vec2 uv){
  return sdRoundRect(uv, vec2(0.50, 0.270), vec2(0.20, 0.060), 0.0);
}

// ── terminal lines encoded as float patterns ──────────────────
// We fake scrolling text by mapping row index to a deterministic
// brightness pattern — gives CRT text feel without textures.
float terminalBrightness(vec2 cellID, float screenRow0, float screenRows){
  // which text row are we on?  (rows scroll upward over time)
  float scrollSpeed = 0.8;
  float row = mod(cellID.y - screenRow0 + floor(T * scrollSpeed), screenRows);
  float col = cellID.x;

  // Each "text line" is active for 1 cell high, with a gap
  float linePhase = mod(row, 2.0);              // alternate text / gap
  if(linePhase > 0.95) return 0.0;              // gap row

  // Pseudo-random glyph brightness per column — hashed from (col, textLine)
  float textLine = floor(row / 2.0);
  float h = hash(vec2(col * 0.37 + 1.1, textLine * 0.53 + T * 0.03));

  // Cursor blink on last text line — returned as special value 2.0 (yellow)
  float cursorLine = mod(floor(T * 1.0), screenRows / 2.0);
  bool isCursor = (textLine == cursorLine && col < 2.0);
  if(isCursor) return 2.0; // sentinel for yellow

  // Sparse: only ~60% of cells in a row are "lit"
  return step(0.40, h) * (0.4 + 0.55 * hash(vec2(col + T*0.1, row)));
}

void main(){
  vec2 uv = gl_FragCoord.xy / R;
  uv.y = 1.0 - uv.y;          // flip Y so 0=top

  // ── dot grid ──
  vec2 dotUV   = uv * vec2(COLS, ROWS);
  vec2 cellID  = floor(dotUV);
  vec2 cellUV  = fract(dotUV);
  float d      = length(cellUV - 0.5);
  float dotR   = 0.22;
  float dotMask = smoothstep(dotR + 0.04, dotR - 0.02, d);

  // ── SDFs ──
  float body   = macBody(uv);
  float screen = macScreen(uv);
  float slot   = diskSlot(uv);
  float btn    = powerBtn(uv);

  bool inBody   = body   < 0.0;
  bool inScreen = screen < 0.0;
  bool inSlot   = slot   < 0.0;
  bool inBtn    = btn    < 0.0;

  // body = mac body minus screen, slot, btn
  bool inCase = inBody && !inScreen && !inSlot && !inBtn;

  // ── screen terminal brightness ──
  // Compute which dot rows/cols fall inside the screen
  float sx0 = (0.50 - 0.175) * COLS;
  float sx1 = (0.50 + 0.175) * COLS;
  float sy0 = (0.575 - 0.145) * ROWS;
  float screenRows = (0.145 * 2.0) * ROWS;

  float termB = 0.0;
  if(inScreen){
    float localCol = cellID.x - sx0;
    termB = terminalBrightness(vec2(localCol, cellID.y), sy0, screenRows);
  }

  // ── dot brightness ──
  float bgNoise = noise(cellID * 0.15 + T * 0.04) * 0.18;

  float brightness = 0.0;
  if(inScreen){
    brightness = 0.08 + termB * 0.92;
  } else if(inSlot || inBtn){
    brightness = 0.35 + noise(cellID * 0.5) * 0.15;
  } else if(inCase){
    // subtle noise drift on body
    float bodyNoise = noise(cellID * 0.12 + T * 0.02);
    brightness = 0.12 + bodyNoise * 0.10;
    // edge highlight: glow near screen border
    float edgeDist = abs(screen) / 0.01;
    brightness += smoothstep(1.0, 0.0, edgeDist) * 0.25;
  } else {
    brightness = bgNoise * 0.5;
  }

  brightness *= dotMask;

  // ── color ──
  // Background: deep navy  #011A23
  // Mac body:   blue scale  #023345 → #05678A → #079ACF
  // Screen:     bright blue #26C0F8 → white
  // Cursor:     yellow      #F18F01
  vec3 bgCol       = vec3(0.004, 0.102, 0.137); // #011A23
  vec3 bodyDotDim  = vec3(0.008, 0.200, 0.271); // #023345
  vec3 bodyDotMid  = vec3(0.020, 0.404, 0.541); // #05678A
  vec3 screenDim   = vec3(0.030, 0.604, 0.812); // #079ACF
  vec3 screenMid   = vec3(0.149, 0.753, 0.973); // #26C0F8
  vec3 screenPeak  = vec3(0.85,  0.96,  1.00);  // near-white blue

  vec3 col;
  vec3 yellowDot = vec3(0.945, 0.561, 0.004); // #F18F01
  if(inScreen){
    if(brightness >= 1.9){ // cursor sentinel
      float blink = 0.5 + 0.5 * sin(T * 6.28 * 2.0);
      col = mix(bgCol, yellowDot, dotMask * blink);
    } else {
      col = mix(bgCol, screenDim,  smoothstep(0.0,  0.25, brightness));
      col = mix(col,  screenMid,   smoothstep(0.25, 0.65, brightness));
      col = mix(col,  screenPeak,  smoothstep(0.65, 1.0,  brightness));
    }
  } else {
    col = mix(bgCol, bodyDotDim, smoothstep(0.0, 0.5, brightness));
    col = mix(col,  bodyDotMid,  smoothstep(0.5, 1.0, brightness));
  }

  // Scanline on screen
  if(inScreen){
    float scan = 0.90 + 0.10 * sin(uv.y * R.y * 3.14159 * 1.5);
    col *= scan;
  }

  // Vignette
  vec2 vig = uv * (1.0 - uv);
  col *= pow(clamp(vig.x * vig.y * 12.0, 0.0, 1.0), 0.18);

  gl_FragColor = vec4(col, 1.0);
}
`

export default function HeroMac() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    // compile shaders
    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(VERT, gl.VERTEX_SHADER))
    gl.attachShader(prog, compile(FRAG, gl.FRAGMENT_SHADER))
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uT    = gl.getUniformLocation(prog, "T")
    const uR    = gl.getUniformLocation(prog, "R")
    const uCOLS = gl.getUniformLocation(prog, "COLS")
    const uROWS = gl.getUniformLocation(prog, "ROWS")

    const DOT_SPACING = 9   // px between dot centres

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const t0 = performance.now()
    let raf: number
    const frame = (now: number) => {
      const cols = canvas.width  / DOT_SPACING
      const rows = canvas.height / DOT_SPACING
      gl.uniform1f(uT,    (now - t0) / 1000)
      gl.uniform2f(uR,    canvas.width, canvas.height)
      gl.uniform1f(uCOLS, cols)
      gl.uniform1f(uROWS, rows)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width:  "100%",
        height: "100%",
        display: "block",
      }}
    />
  )
}
