import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uColA;   // base / fond
uniform vec3 uColB;   // teinte
uniform vec3 uColC;   // reflet
uniform float uLight; // 0 = sombre (accueil), 1 = clair teinté

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(1.7,9.2); a*=0.5; }
  return v;
}

// hauteur du métal liquide en un point — réutilisée pour calculer la normale
float field(vec2 p, float t, vec2 warp){
  vec2 q = vec2(fbm(p*2.6 + t), fbm(p*2.6 - t + 5.2));
  vec2 r = vec2(
    fbm(p*2.6 + q*2.0 + t*1.3 + warp),
    fbm(p*2.6 + q*2.0 - t*1.1 + 2.7 + warp.yx)
  );
  return fbm(p*2.6 + r*2.4);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv; p.x *= aspect;
  vec2 ptr = uPointer; ptr.x *= aspect;
  // le scroll fait couler le métal verticalement
  float t = uTime * 0.10 + uScroll * 0.9;

  // influence du curseur : creux/relief qui suit la souris
  float pd = length(p - ptr);
  vec2 warp = (p - ptr) * 0.55 / (pd*pd + 0.22);

  float f = field(p, t, warp);

  // normale par différences finies -> reflets métalliques réalistes
  float e = 0.0022;
  float fx = field(p + vec2(e,0.0), t, warp) - f;
  float fy = field(p + vec2(0.0,e), t, warp) - f;
  vec3 n = normalize(vec3(-fx, -fy, e*0.6));

  // éclairage spéculaire (chrome)
  vec3 L = normalize(vec3(0.35, 0.65, 0.7));
  vec3 H = normalize(L + vec3(0.0,0.0,1.0));
  float spec = pow(max(dot(n, H), 0.0), 22.0);
  float diff = max(dot(n, L), 0.0);

  // crêtes métalliques saturées
  float band = sin(f*16.0 + t*2.0)*0.5+0.5;
  band = pow(band, 3.0);

  float vig = smoothstep(1.35, 0.25, length(uv-0.5));
  vec3 col;

  if (uLight > 0.5) {
    // MODE CLAIR : métal pâle et teinté, ambiance douce et lisible
    col = mix(uColA, uColB, smoothstep(0.25, 0.85, f) * 0.55);
    col = mix(col, uColC, band * 0.30);
    col += uColC * spec * 0.55;            // reflets discrets
    col += uColB * diff * 0.10;            // léger volume
    col += uColB * 0.09 * smoothstep(0.55, 0.0, pd); // halo curseur
    col = mix(col, uColA, (1.0 - vig) * 0.20);       // vignette douce vers le fond clair
  } else {
    // MODE SOMBRE : chrome liquide profond (accueil)
    col = mix(uColA, uColB, smoothstep(0.22,0.78,f));
    col = mix(col, uColC, band*0.55);
    col += uColC * spec;                   // reflets spéculaires nets
    col += uColB * diff * 0.30;            // volume / diffus
    col += uColC * 0.14 * smoothstep(0.55, 0.0, pd); // halo curseur
    col *= 0.45 + 0.55*vig;                // vignette profonde
  }

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos,0.0,1.0); }
`

// Palettes par variante. light:0 = mode sombre (accueil), light:1 = mode clair teinté.
// Couleurs normalisées 0..1 : a = fond, b = teinte, c = reflet.
const VARIANTS = {
  home:   { light: 0, a: [0.008, 0.028, 0.042], b: [0.020, 0.270, 0.340], c: [0.62, 0.92, 1.00] },
  // Métal liquide sombre, version chaude/marron (portfolio) — même rendu que l'accueil mais ambré.
  brown:  { light: 0, a: [0.055, 0.038, 0.024], b: [0.40, 0.24, 0.085], c: [0.96, 0.78, 0.52] },
  teal:   { light: 1, a: [0.56, 0.73, 0.78], b: [0.07, 0.40, 0.49], c: [1.0, 1.0, 1.0] },
  blue:   { light: 1, a: [0.58, 0.69, 0.86], b: [0.10, 0.29, 0.60], c: [1.0, 1.0, 1.0] },
  violet: { light: 1, a: [0.68, 0.64, 0.86], b: [0.34, 0.25, 0.66], c: [1.0, 1.0, 1.0] },
  amber:  { light: 1, a: [0.88, 0.76, 0.58], b: [0.70, 0.44, 0.12], c: [1.0, 1.0, 1.0] },
}

export default function LiquidChrome({ className = '', variant = 'home' }) {
  const canvasRef = useRef(null)
  const variantRef = useRef(variant)
  const renderRef = useRef(null)
  variantRef.current = variant

  // Redessine une frame quand la teinte change (utile si l'animation est en pause / reduced-motion)
  useEffect(() => {
    if (renderRef.current) renderRef.current()
  }, [variant])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) {
      canvas.style.background =
        'radial-gradient(120% 120% at 30% 20%, var(--c-teal-mid), var(--c-teal) 45%, var(--c-dark) 80%, #031018)'
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const applyFallback = () => {
      canvas.style.background =
        'radial-gradient(120% 120% at 30% 20%, var(--c-teal-mid), var(--c-teal) 45%, var(--c-dark) 80%, #031018)'
    }

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('[LiquidChrome] shader compile error:', gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vertShader = compile(gl.VERTEX_SHADER, VERT)
    const fragShader = compile(gl.FRAGMENT_SHADER, FRAG)

    const prog = gl.createProgram()

    if (!vertShader || !fragShader) {
      gl.deleteProgram(prog)
      applyFallback()
      return () => {}
    }

    gl.attachShader(prog, vertShader)
    gl.attachShader(prog, fragShader)
    gl.linkProgram(prog)

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[LiquidChrome] program link error:', gl.getProgramInfoLog(prog))
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
      gl.deleteProgram(prog)
      applyFallback()
      return () => {}
    }

    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uPtr = gl.getUniformLocation(prog, 'uPointer')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')
    const uColA = gl.getUniformLocation(prog, 'uColA')
    const uColB = gl.getUniformLocation(prog, 'uColB')
    const uColC = gl.getUniformLocation(prog, 'uColC')
    const uLight = gl.getUniformLocation(prog, 'uLight')

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    let scroll = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = (e.clientX - r.left) / r.width
      pointer.ty = 1.0 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    const onScroll = (e) => {
      const tgt = e && e.target
      const top = tgt && typeof tgt.scrollTop === 'number' ? tgt.scrollTop : window.scrollY
      const h = (tgt && tgt.clientHeight) || window.innerHeight
      scroll = top / Math.max(h, 1)
    }
    // capture:true pour capter aussi le scroll d'un conteneur interne (Lenis)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    onScroll()

    let raf
    let running = true
    const start = performance.now()
    // dessine UNE frame (sans planifier de boucle) — réutilisé pour les MAJ ponctuelles
    const draw = () => {
      const time = (performance.now() - start) / 1000
      // lissage du pointeur pour un suivi fluide
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      gl.uniform1f(uTime, time)
      gl.uniform2f(uPtr, pointer.x, pointer.y)
      gl.uniform1f(uScroll, scroll)
      const pal = VARIANTS[variantRef.current] || VARIANTS.home
      gl.uniform3f(uColA, pal.a[0], pal.a[1], pal.a[2])
      gl.uniform3f(uColB, pal.b[0], pal.b[1], pal.b[2])
      gl.uniform3f(uColC, pal.c[0], pal.c[1], pal.c[2])
      gl.uniform1f(uLight, pal.light)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = () => {
      if (!running) return
      draw()
      if (!reduced) raf = requestAnimationFrame(loop)
    }
    renderRef.current = draw
    loop()

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        running = true
        loop()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll, { capture: true })
      document.removeEventListener('visibilitychange', onVisibility)
      if (buf) gl.deleteBuffer(buf)
      if (vertShader) gl.deleteShader(vertShader)
      if (fragShader) gl.deleteShader(fragShader)
      if (prog) gl.deleteProgram(prog)
      // NB: ne pas appeler WEBGL_lose_context.loseContext() ici — en StrictMode
      // le cleanup s'exécute avant le remount sur le MÊME canvas, ce qui tuerait
      // définitivement le contexte et ferait échouer la 2e compilation du shader.
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
