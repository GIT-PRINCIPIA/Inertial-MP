///-----------------------------------------------------------------------///
//gravity_node.mjs
//A class representing the gravitational nodes that make up the map
///-----------------------------------------------------------------------///

import { StaticEntity } from "./entity.mjs";

///-----------------------------------------------------------------------///
//GravityNode class
export class GravityNode extends StaticEntity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, pos, gravity, regenMult, regenHalfDist)
    //@param id the id of the entity that represents the GravityNode
    //@param pos the position of the GravityNode
    //@param gravity the strength of the GravityNode's gravity
    //@param regenMult the strength of the GravityNode's regeneration effect
    //@param regenDoubleDist the distance at which the GravityNode's regeneration effect has doubled
    constructor(id, pos, gravity, regenMult, regenDoubleDist)
    {
        super(id, pos);
        this.gravity = gravity;
        this.regenMult = regenMult;
        this.regenDoubleDist = regenDoubleDist;
    }
    ///-----------------------------------------------------------------------///
}
//End of GravityNode class
///-----------------------------------------------------------------------///