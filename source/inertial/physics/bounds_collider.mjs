///-----------------------------------------------------------------------///
//bounds_collider.mjs
//A bounds collider, such as the enclosing walls to an arena or map
//Actually a polygon collider with reversed winding order and edge normals
///-----------------------------------------------------------------------///

import { PolygonCollider } from "./polygon_collider.mjs";


///-----------------------------------------------------------------------///
//BoundsCollider class
export class BoundsCollider extends PolygonCollider
{
    ///-----------------------------------------------------------------------///
    //constructor(points)
    //@param points the vertices of the bounds
    constructor(points)
    {
        //Reverse the winding order before constructing the polygon.
        //
        //This makes the polygon negative-area and therefore makes its
        //interior the valid region rather than the collidable region.
        super([...points].reverse());

        this.isBounds = true;
    }
    ///-----------------------------------------------------------------------///
}
//End of BoundsCollider class
///-----------------------------------------------------------------------///