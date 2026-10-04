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
    //constructor(id, pos, mass, regenMult, regenHalfDist)
    //@param id the id of the entity that represents the GravityNode
    //@param pos the position of the GravityNode
    //@param mass the GravityNode's mass
    //@param regenMult the strength of the GravityNode's regeneration effect
    //@param regenDoubleDist the distance at which the GravityNode's regeneration effect has doubled
    constructor(id, {pos, mass, regenMult, regenDoubleDist})
    {
        super(id, "gravityNode", pos);
        this.mass = mass;
        this.regenMult = regenMult;
        this.regenDoubleDist = regenDoubleDist;

        this.radius = this.mass * 0.1; //Could be scaled by some factor
    }
    ///-----------------------------------------------------------------------///
}
//End of GravityNode class
///-----------------------------------------------------------------------///