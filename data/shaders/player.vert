#version 300 es

in vec2 vertex;

uniform vec2 playerPosition;
uniform float playerRotation;
uniform float playerSize;
uniform vec2 cameraPosition;
uniform vec2 worldToClip;

out vec2 localPos;

void main()
{
    float cosine = cos(playerRotation);
    float sine = sin(playerRotation);
    localPos = vertex;

    vec2 scaledVert = vertex;
    scaledVert.y *= float(2);


    vec2 rotatedVertex = vec2(
        cosine * scaledVert.x + sine * scaledVert.y,
        -sine * scaledVert.x + cosine * scaledVert.y
    );

    vec2 worldPosition = playerPosition + rotatedVertex * playerSize;
    gl_Position = vec4(
        (worldPosition - cameraPosition) * worldToClip,
        0.0,
        1.0
    );
}