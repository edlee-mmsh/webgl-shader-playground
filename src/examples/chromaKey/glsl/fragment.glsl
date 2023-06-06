uniform sampler2D uTexture;
uniform vec3 uKeyColor;
varying vec2 vUv;

void main() {

  vec4 rgba = texture2D(uTexture, vUv);
  float alphaDist = distance(vec3(uKeyColor), rgba.rgb);
  gl_FragColor = vec4(rgba.rgb, pow(alphaDist, 1.5));
}