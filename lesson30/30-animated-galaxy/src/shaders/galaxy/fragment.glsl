varying vec3 vColor;

void main() {
    //Disc
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength = step(0.5, strength);
        // strength = 1.0 - strength; //go to lesson 28 to understand what we're doing -> now each particle is round

        //Diffuse point -> same as above but with a gradient around the border
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength *= 2.0;
        // strength = 1.0 - strength;

        //Light point -> same as above but with more concentration in the center
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 10.0);

        // Final color
        vec3 color = mix(vec3(0.0), vColor, strength);

        gl_FragColor = vec4(color, 1.0);

        #include <colorspace_fragment>
    }