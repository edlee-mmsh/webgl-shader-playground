uniform float slice;
uniform float edge;
varying vec2 vUv;

void main() {
  float value = step(edge, mod(vUv.x * slice, 1.0));
  value += step(edge, mod(vUv.y * slice, 1.0));

  gl_FragColor.rgba = vec4(value, value, value, 1.0);
}