///-----------------------------------------------------------------------///
//fundamentals.mjs
//Simple physics fundamentals helpers
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GetAcceleration(mass, force)
//@param mass the mass of the object
//@param force the force to be applied
//@return the acceleration, in units / s^2
export function GetAcceleration(mass, force)
{
    return (force / mass);
}
///-----------------------------------------------------------------------///