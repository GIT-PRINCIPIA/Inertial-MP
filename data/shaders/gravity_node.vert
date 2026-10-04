#version 300 es

in vec2 vertex;

uniform vec2 nodePosition;
uniform float nodeRadius;
uniform vec2 cameraPosition;
uniform vec2 worldToClip;

out vec2 localPosition;

void main()
{
    localPosition = vertex;
    vec2 worldPosition = nodePosition + vertex * nodeRadius;
    gl_Position = vec4(
        (worldPosition - cameraPosition) * worldToClip,
        0.0,
        1.0
    );
}