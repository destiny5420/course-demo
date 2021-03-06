const VertexShader = `
    void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FragmentShader = `
    uniform vec2 u_resolution;
    uniform float u_time;

    float remap(float a, float b, float target) {
      return clamp((target - a) / (b - a), 0.0, 1.0);
    }

    float remap(float a, float b, float c, float d, float target) {
      float step1 = clamp((target - a) / (b - a), 0.0, 1.0);
      return step1 * (d-c) + c;
    }

    vec2 within(vec2 uv, vec4 rect) {
      return (uv - rect.xy) / (rect.zw - rect.xy);
    }

    vec4 head(vec2 uv) {
      float distance = length(uv);
      vec3 v3HeadColor = vec3(0.9, 0.65, 0.1);
      vec4 col = vec4(v3HeadColor, 1.0);

      float edgeShade = remap(0.4, 0.5, distance);
      col -= edgeShade * 0.5;

      /*** circle outline ***/
      vec3 v3OutlineColor = vec3(0.6, 0.3, 0.1);
      col.rgb = mix(col.rgb, v3OutlineColor, smoothstep(0.48, 0.5, distance));

      /*** create white highlight ***/
      float highLight = smoothstep(0.41, 0.405, distance);
      highLight = highLight * remap(0.41, -0.1, 0.75, 0.0, uv.y);
      vec3 v3HighLightColor = vec3(1.0);
      col.rgb = mix(col.rgb, v3HighLightColor, highLight);

      /*** create cheek ***/
      float cheekDistance = length(uv - vec2(0.25, -0.2));
      float cheek = smoothstep(0.2, 0.01, cheekDistance) * 0.4;
      cheek = cheek * smoothstep(0.18, 0.16, cheekDistance);
      vec3 v3CheekColor = vec3(1.0, 0.1, 0.1);
      col.rgb = mix(col.rgb, v3CheekColor, cheek);

      col.a = smoothstep(0.5, 0.49, distance);
      return col;
    }

    vec4 eye(vec2 uv) {
      uv -= 0.5;
      float distance = length(uv);
      vec3 v3EyeColor = vec3(1.0);
      vec4 col = vec4(v3EyeColor, 1.0);

      /* === eye iris === */
      float fIrisShape = smoothstep(0.1, 0.7, distance) * 0.5;
      vec3 v3IrisColor = vec3(0.3, 0.5, 1.0);
      col.rgb = mix(col.rgb, v3IrisColor, fIrisShape);

      /* === eye shadow === */
      col.rgb = col.rgb * (1.0 - smoothstep(0.45, 0.5, distance) * 0.5 * clamp(-uv.y-uv.x, 0.0, 1.0));

      /* === eye outline === */
      vec3 v3OutlineColor = vec3(0.0);
      col.rgb = mix(col.rgb, v3OutlineColor, smoothstep(0.3, 0.28, distance));

      /* === eye blue in black === */
      v3IrisColor = v3IrisColor * ( 1.0 + smoothstep(0.3, 0.05, distance));
      col.rgb = mix(col.rgb, v3IrisColor, smoothstep(0.3, 0.25, distance));

      /* === eye pupil === */
      float fPupilShape = smoothstep(0.16, 0.14, distance);
      vec3 v3PupilColor = vec3(0.0);
      col.rgb = mix(col.rgb, v3PupilColor, fPupilShape);

      /* === eye highlight === */
      float fEyeHighlighShape = smoothstep(0.1, 0.09, length(uv-vec2(-0.15, 0.15)));
      float fEyeHighlighShape2 = smoothstep(0.07, 0.05, length(uv-vec2(0.08, -0.08)));
      fEyeHighlighShape += fEyeHighlighShape2;
      vec3 v3EyeHighlightColor = vec3(1.0);
      col.rgb = mix(col.rgb, v3EyeHighlightColor, fEyeHighlighShape);

      col.a = smoothstep(0.5, 0.48, distance);
      return col;
    }

    vec4 mouth(vec2 uv) {
      uv -= 0.5;

      uv.y *= 1.5;
      uv.y -= uv.x * uv.x * 2.0;
      float distance = length(uv);
      vec3 v3MouthColor = vec3(0.5, 0.18, 0.05);
      vec4 col = vec4(v3MouthColor, 1.0);

      /* === tooth === */
      float fToothShape = smoothstep(0.4, 0.35, length(uv-vec2(0.0, 0.6)));
      vec3 v3ToothColor = vec3(1.0) * smoothstep(0.6, 0.35, distance);
      col.rgb = mix(col.rgb, v3ToothColor, fToothShape);

      /* === tongue === */
      float fTongueShape = smoothstep(0.5, 0.2, length(uv-vec2(0.0, -0.6)));
      vec3 v3TongueColor = vec3(1.0, 0.5, 0.5);
      col.rgb = mix(col.rgb, v3TongueColor, fTongueShape);

      col.a = smoothstep(0.5, 0.48, distance);
      return col;
    }

    vec4 smiley(vec2 uv) {
      vec4 col = vec4(0.0);

      uv.x = abs(uv.x); /* mirror vertical */
      vec4 head = head(uv);
      vec4 eye = eye(within(uv, vec4(0.03, -0.1, 0.37, 0.25)));
      vec4 mouth = mouth(within(uv, vec4(-0.3, -0.4, 0.3, -0.1)));

      col = mix(col, head, head.a);
      col = mix(col, eye, eye.a);
      col = mix(col, mouth, mouth.a);
      return col;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv -= 0.5;
      uv.x *= u_resolution.x / u_resolution.y;

      gl_FragColor = smiley(uv);
    }
`;

export { VertexShader, FragmentShader };
