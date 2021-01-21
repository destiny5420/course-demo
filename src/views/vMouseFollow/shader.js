const VERTEX = `
  #define PI 3.14159265359
  uniform float u_offset;
  uniform float u_progress;
  uniform float u_direction;
  uniform float u_time;
  uniform float u_waveIntensity;
  varying vec2 vUv;

  /* --- System Property */
  /* 1. uv */
  /* 2. position */

  void main() {
    vec3 pos = position.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
  }
`;

const FRAGMENT = `
  void main() {
    gl_FragColor = vec4(1.0);
  }
`;

export default {
  VERTEX,
  FRAGMENT,
};
