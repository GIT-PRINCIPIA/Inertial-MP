///-----------------------------------------------------------------------///
//circle_collider.mjs
//A circular collider
///-----------------------------------------------------------------------///

import { Collider } from "./collider.mjs";


///-----------------------------------------------------------------------///
//CircleCollider class
export class CircleCollider extends Collider
{
    ///-----------------------------------------------------------------------///
    //constructor(radius)
    //@param radius the radius of the circle collider
    constructor(radius)
    {
        super();
        this.radius = radius;
    }
    ///-----------------------------------------------------------------------///
}
//End of CircleCollider
///-----------------------------------------------------------------------///