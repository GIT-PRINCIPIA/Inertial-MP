///-----------------------------------------------------------------------///
//gravity_simulation.mjs
//Handles simulating the effects of gravity on ARBITRARY objects
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GravitySimulation class
export class GravitySimulation
{
    static UNIVERSAL_GRAVITATIONAL_CONSTANT = 0.1;
    
    ///-----------------------------------------------------------------------///
    //CalculateForce(sqrDist, attractorMass)
    //@param sqrDist the square of the distance to the attractor
    //@param attractorMass the mass of the attractor
    //@return the gravitational force exerted by the attractor
    CalculateForce(sqrDist, attractorMass)
    {
        return GravitySimulation.UNIVERSAL_GRAVITATIONAL_CONSTANT * attractorMass / sqrDist;
    }
    ///-----------------------------------------------------------------------///
}
//End of GravitySimulation class
///-----------------------------------------------------------------------///