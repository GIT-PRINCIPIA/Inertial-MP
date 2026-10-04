#version 300 es

in vec2 vertex;

uniform vec2 playerPosition;
uniform float playerRotation;
uniform float playerSize;
uniform vec2 cameraPosition;
uniform vec2 worldToClip;


void main()
{
    float cosine = cos(playerRotation);
    float sine = sin(playerRotation);

    vec2 rotatedVertex = vec2(
        cosine * vertex.x + sine * vertex.y,
        -sine * vertex.x + cosine * vertex.y
    );

    vec2 worldPosition = playerPosition + rotatedVertex * playerSize;
    gl_Position = vec4(
        (worldPosition - cameraPosition) * worldToClip,
        0.0,
        1.0
    );
}