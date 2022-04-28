precision mediump float;

uniform vec3 uColor;

varying float vRandom;
varying float vElevation;

void main() {
    float lvElevation = vElevation * 5.0;
    gl_FragColor = vec4(vRandom + uColor.r * lvElevation, uColor.g * lvElevation, uColor.b * lvElevation - vRandom, 1.0);
}