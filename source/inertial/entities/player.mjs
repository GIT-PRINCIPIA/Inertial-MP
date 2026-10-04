///-----------------------------------------------------------------------///
//player.mjs
//A player object
///-----------------------------------------------------------------------///

import { DynamicEntity } from "./entity.mjs";


///-----------------------------------------------------------------------///
//Player class
export class Player extends DynamicEntity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, pos, vel, rot, angVel)
    //@param id the id of the player
    //@param pos the position of the player
    //@param vel the velocity of the player
    //@param rot the rotation of the player
    //@param angVel the angular velocity of the player
    constructor(id, pos, vel, rot, angVel)
    {
        super(id, pos, vel);
        this.rot = rot;
        this.angVel = angVel;
    }
    ///-----------------------------------------------------------------------///
}
//End of Player class
///-----------------------------------------------------------------------///