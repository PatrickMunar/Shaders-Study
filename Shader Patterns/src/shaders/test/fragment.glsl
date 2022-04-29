varying vec2 vUv;

void main()
{
    // 0
    // gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);

    // 1
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);

    // 2
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0);

    // 3
    // gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

    // 4
    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 5
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

     // 6
    // float strength = vUv.y * 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
    
    // 7
    // float strength = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    // 8
    float strength = mod(vUv.y * 10.0, 1.0);
    if (strength < 0.5) {
        strength = 0.0;
    }
    else {
        strength = 1.0;
    }

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}