#version 300 es

precision mediump float;

in vec2 localPosition;
out vec4 outColour;

void main()
{
	float distanceFromCenterSqr = dot(localPosition, localPosition);
    vec3 colour = vec3(0,0,0);
	if (distanceFromCenterSqr < float(1))
    {
        colour = vec3(1,1,1);
    }

	outColour = vec4(colour, 1);
}
