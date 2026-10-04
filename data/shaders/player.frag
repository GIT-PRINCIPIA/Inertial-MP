#version 300 es

precision mediump float;

out vec4 outColour;
in vec2 localPos;
void main()
{
    vec2 vec = localPos;
    vec *= vec2(0.5, 0.5);
    vec += vec2(0.5);


	outColour = vec4(0.1,localPos.y + 0.1,localPos.y + 0.1, 1);
}
