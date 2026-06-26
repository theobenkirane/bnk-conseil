import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uScroll;

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
  float t = uTime * 0.16 + uScroll * 0.9;

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

  // palette : noir-teal profond -> teal -> chrome clair
  vec3 black  = vec3(0.008,0.028,0.042);
  vec3 teal   = vec3(0.020,0.270,0.340);
  vec3 chrome = vec3(0.62,0.92,1.00);
  vec3 col = mix(black, teal, smoothstep(0.22,0.78,f));
  col = mix(col, chrome, band*0.55);
  col += chrome * spec;            // reflets spéculaires nets
  col += teal * diff * 0.30;       // volume / diffus

  // halo de réflexion autour du curseur
  col += chrome * 0.14 * smoothstep(0.55, 0.0, pd);

  // vignette (profondeur)
  float vig = smoothstep(1.35, 0.25, length(uv-0.5));
  col *= 0.45 + 0.55*vig;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos,0.0,1.0); }
`

export default function LiquidChrome({ className = '' }) {
  const canvasRef = useRef(null)

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
    const render = () => {
      if (!running) return
      const time = (performance.now() - start) / 1000
      // lissage du pointeur pour un suivi fluide
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      gl.uniform1f(uTime, time)
      gl.uniform2f(uPtr, pointer.x, pointer.y)
      gl.uniform1f(uScroll, scroll)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduced) raf = requestAnimationFrame(render)
    }
    render()

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        running = true
        render()
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
