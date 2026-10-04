///-----------------------------------------------------------------------///
//player.mjs
//A player object
///-----------------------------------------------------------------------///

import { DynamicEntity } from "../entities/entity.mjs";


///-----------------------------------------------------------------------///
//Player class
export class Player extends DynamicEntity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, pos, vel, rot, angVel, shipConfig)
    //@param id the id of the player
    //@param pos the position of the player
    //@param vel the velocity of the player
    //@param rot the rotation of the player
    //@param angVel the angular velocity of the player
    //@param shipConfig the ship's configuration (mass, etc)
    constructor(id, pos, vel, rot, angVel, shipConfig)
    {
        super(id, pos, vel);
        this.rot = rot;
        this.angVel = angVel;
        this.shipConfig = shipConfig;
    }
    ///-----------------------------------------------------------------------///
}
//End of Player class
///-----------------------------------------------------------------------///