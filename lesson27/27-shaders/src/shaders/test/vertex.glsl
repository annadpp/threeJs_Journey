// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position;
// attribute vec2 uv;
// attribute float aRandom;

varying vec2 vUv;
varying float vElevation;
// varying float vRandom; //to send it (attribute) to the fragment.glsl

    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
        elevation += sin(modelPosition.xy * uFrequency.y - uTime) * 0.1;

        modelPosition.z += elevation;

        // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1; //multiply to get a higher frequency and else we don't see it
        // // modelPosition.z += aRandom * 0.1;
        // modelPosition.z += sin(modelPosition.xy * uFrequency.y - uTime) * 0.1;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;

        // vRandom = aRandom;
        vUv = uv;
        vElevation = elevation;

        // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }