uniform float uTime;

attribute float aRandom;

varying vec2 vUv;
varying float vRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * 1.0 - uTime * 1.0) * 0.2;
    elevation += sin(modelPosition.y * 1.0 + uTime * 1.0) * 0.2;
    // elevation += aRandom;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    vUv = uv * 2.0;
}