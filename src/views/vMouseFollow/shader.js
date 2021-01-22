const VERTEX = `
  #define PI 3.14159265359
  uniform float u_direction;
  uniform float u_time;
  varying vec2 v_uv;
  uniform float u_tmp;
  uniform vec2 u_v2Resolution;

  void main() {
    vec3 pos = position.xyz;
    vec2 vUv = uv.xy;
    vUv -= 0.5;
    vUv.x *= (u_v2Resolution.x * 0.85 / u_v2Resolution.y);
    float distance = length(vUv) / length(vec2(0.5));
    float stickIn = distance;
    float stickOut = distance * -1.0;

    float finalEffect = mix(stickIn, stickOut, u_direction);
    float offset = 5.0;

    pos.z += finalEffect * offset - u_direction * offset;
    pos.z += sin((distance * 10.0 - u_time * u_tmp)) * 1.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    v_uv = uv;
  }
`;

const FRAGMENT = `
  varying vec2 v_uv;
  uniform vec2 u_v2Resolution;
  uniform float u_tmp;

  void main() {
      vec2 vUv = v_uv;
      vUv -= 0.5;
      vUv.x *= (u_v2Resolution.x * 0.85 / u_v2Resolution.y);
      float distance = length(vUv) / length(vec2(0.5));

      vec3 color = vec3(distance);
      gl_FragColor = vec4(color,1.);
  }
`;

export default {
  VERTEX,
  FRAGMENT,
};
