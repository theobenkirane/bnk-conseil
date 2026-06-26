import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv; p.x *= aspect;
  vec2 ptr = uPointer; ptr.x *= aspect;
  float t = uTime * 0.06;
  vec2 q = vec2(fbm(p*2.0 + t), fbm(p*2.0 - t + 5.2));
  vec2 r = vec2(
    fbm(p*2.0 + q*1.5 + t*1.3 + (p-ptr)*0.25),
    fbm(p*2.0 + q*1.5 - t*1.1)
  );
  float f = fbm(p*2.0 + r*2.0);
  float band = sin(f*10.0 + r.x*4.0)*0.5+0.5;
  band = pow(band, 1.5);
  vec3 lo = vec3(0.094,0.357,0.482);
  vec3 hi = vec3(0.294,0.741,0.941);
  vec3 light = vec3(0.98,0.99,1.0);
  vec3 col = mix(lo, hi, band);
  col = mix(col, light, smoothstep(0.6,1.0,f));
  float spec = smoothstep(0.85,1.0, fbm(p*3.0 - t*2.0 + r));
  col += spec*0.5;
  gl_FragColor = vec4(col,1.0);
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
        'radial-gradient(120% 120% at 30% 20%, var(--c-chrome-hi), var(--c-chrome-lo) 60%, var(--c-dark))'
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
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

    const pointer = { x: 0.5, y: 0.5 }
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
      pointer.x = (e.clientX - r.left) / r.width
      pointer.y = 1.0 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    let raf
    let running = true
    const start = performance.now()
    const render = () => {
      if (!running) return
      const time = (performance.now() - start) / 1000
      gl.uniform1f(uTime, time)
      gl.uniform2f(uPtr, pointer.x, pointer.y)
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
      document.removeEventListener('visibilitychange', onVisibility)
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
