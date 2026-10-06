///-----------------------------------------------------------------------///
//gravity_simulation.mjs
//Handles simulating the effects of gravity on ARBITRARY objects
///-----------------------------------------------------------------------///

import { Vec2 } from "../../../utility/vector.mjs";


///-----------------------------------------------------------------------///
//GravitySimulation class
export class GravitySimulation
{
    static UNIVERSAL_GRAVITATIONAL_CONSTANT = 10;

    ///-----------------------------------------------------------------------///
    //CalculateAcceleration(sqrDist, attractorMass)
    //@param sqrDist the square of the distance to the attractor
    //@param attractorMass the mass of the attractor
    //@return the gravitational acceleration
    static CalculateAcceleration(sqrDist, attractorMass)
    {
        return GravitySimulation.UNIVERSAL_GRAVITATIONAL_CONSTANT * attractorMass / sqrDist;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CalculateNodesAcceleration(pos, nodes)
    //@param pos the position of the object affected by gravity
    //@param nodes the gravity nodes
    static CalculateNodesAcceleration(pos, nodes)
    {
        let accel = Vec2.ZERO.Copy();
        for (const NODE of nodes)
        {
            const DELTA = NODE.pos.Subtract(pos);
            const SQR_DIST = DELTA.SqrLength();
            const DELTA_NORM = DELTA.Normalize();
            const ACCELERATIION = GravitySimulation.CalculateAcceleration(SQR_DIST, NODE.mass);

            accel.AddInPlace(DELTA_NORM.MultiplyScalar(ACCELERATIION));
        }
        return accel;
    }
    ///-----------------------------------------------------------------------///
}
//End of GravitySimulation class
///-----------------------------------------------------------------------///