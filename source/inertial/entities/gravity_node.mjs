///-----------------------------------------------------------------------///
//gravity_node.mjs
//A class representing the gravitational nodes that make up the map
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { StaticEntity } from "./entity.mjs";

///-----------------------------------------------------------------------///
//GravityNode class
export class GravityNode extends StaticEntity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, pos, mass, regenMult, regenDoubleDist)
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


    ///-----------------------------------------------------------------------///
    //Serialize()
    //@return the serialized GravityNode
    Serialize()
    {
        return {
            id: this.id,
            pos: this.pos,
            mass: this.mass,
            regenMult: this.regenMult,
            regenDoubleDist: this.regenDoubleDist
        };
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //UpdateFromSerialized(id, pos, mass, regenMult, regenDoubleDist)
    //@param id the id of the entity that represents the GravityNode
    //@param pos the position of the GravityNode
    //@param mass the GravityNode's mass
    //@param regenMult the strength of the GravityNode's regeneration effect
    //@param regenDoubleDist the distance at which the GravityNode's regeneration effect has doubled
    UpdateFromSerialized({id, pos, mass, regenMult, regenDoubleDist})
    {
        this.id = id;
        this.pos = new Vec2(pos.x, pos.y);
        this.mass = mass;
        this.regenMult = regenMult;
        this.regenDoubleDist = regenDoubleDist;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //NewFromSerialized(serialized)
    //@param serialized the serialized GravityNode
    //@return the new GravityNode object
    static NewFromSerialized(serialized)
    {
        serialized.pos = new Vec2(serialized.pos.x, serialized.pos.y);
        return new GravityNode(serialized.id, serialized);
    }
    ///-----------------------------------------------------------------------///
}
//End of GravityNode class
///-----------------------------------------------------------------------///