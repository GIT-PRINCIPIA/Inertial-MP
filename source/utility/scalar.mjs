///-----------------------------------------------------------------------///
//scalar.mjs
//Contains utilities for scalar operations
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Clamp(value, min, max)
//@param value the value to clamp
//@param min the minimum value
//@param max the maximum value
//@return the clamped value
export function Clamp(value, min, max)
{
    return Math.max(min, Math.min(max, value));
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Clamp01(value)
//@param value the value to clamp
//@return the clamped value between 0 and 1
export function Clamp01(value)
{
    return Clamp(value, 0, 1);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Lerp(a, b, t)
//@param a the start value
//@param b the end value
//@param t the interpolation factor between 0 and 1
//@return the interpolated value
export function Lerp(a, b, t)
{
    return a + (b - a) * (t);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//InverseLerp(a, b, value)
//@param a the start value
//@param b the end value
//@param value the value to inverse lerp
//@return the interpolation factor between 0 and 1
export function InverseLerp(a, b, value)
{
    if (a !== b)
    {
        return (value - a) / (b - a);
    }
    return 0;
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Remap(value, from1, to1, from2, to2)
//@param value the value to remap
//@param from1 the start of the first range
//@param to1 the end of the first range
//@param from2 the start of the second range
//@param to2 the end of the second range
//@return the remapped value
export function Remap(value, from1, to1, from2, to2)
{
    return Lerp(from2, to2, InverseLerp(from1, to1, value));
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Wrap(value, min, max)
//@param value the value to wrap
//@param min the minimum value
//@param max the maximum value
//@return the wrapped value
export function Wrap(value, min, max)
{
    const range = max - min;
    if (range <= 0)
    {
        return min;
    }
    return value - range * Math.floor((value - min) / range);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//WrapAngle(angle)
//@param angle the angle to wrap in radians
//@return the wrapped angle between -PI and PI radians
export function WrapAngle(angle)
{
    return Wrap(angle, -Math.PI, Math.PI);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//LerpAngle(a, b, t)
//@param a the start angle in radians
//@param b the end angle in radians
//@param t the interpolation factor between 0 and 1
//@return the interpolated angle in radians, normalized between -PI and PI
export function LerpAngle(a, b, t)
{
    const difference = WrapAngle(b - a);
    return WrapAngle(a + difference * t);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//SmoothStep(a, b, t)
//@param a the start value
//@param b the end value
//@param t the interpolation factor between 0 and 1
//@return the interpolated value using a smooth step function - like sinusoidal interpolation
export function SmoothStep(a, b, t)
{
    t = Clamp01(t);
    t = t * t * (3 - 2 * t);
    return Lerp(a, b, t);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Radians(degrees)
//@param degrees the angle in degrees
//@return the angle in radians
export function Radians(degrees)
{
    return degrees * Math.PI / 180;
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Degrees(radians)
//@param radians the angle in radians
//@return the angle in degrees
export function Degrees(radians)
{
    return radians * 180 / Math.PI;
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ApproximatelyEqual(a, b, epsilon)
//@param a the first value
//@param b the second value
//@return true if |a - b| is less than 'epsilon'
export function ApproximatelyEqual(a, b, epsilon = 1e-6) 
{
    return Math.abs(a - b) < epsilon;
}
///-----------------------------------------------------------------------///