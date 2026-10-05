///-----------------------------------------------------------------------///
//player.mjs
//A player object
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
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
    constructor(id, {pos, vel, rot, angVel, shipConfig})
    {
        super(id, "player", pos, vel);
        this.rot = rot;
        this.angVel = angVel;
        this.targetAngVel = 0;
        this.shipConfig = shipConfig;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Serialize()
    //@return an object representing the serialized version of this
    Serialize()
    {
        return {
            id: this.id,
            pos: this.pos,
            vel: this.vel,
            rot: this.rot,
            angVel: this.angVel,
            shipConfig: this.shipConfig
        };
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //UpdateFromSerialized(id, pos, vel, rot, angVel, shipConfig)
    //@param id the id of the player
    //@param pos the position of the player
    //@param vel the velocity of the player
    //@param rot the rotation of the player
    //@param angVel the angular velocity of the player
    //@param shipConfig the ship's configuration (mass, etc)
    UpdateFromSerialized({id, pos, vel, rot, angVel, shipConfig})
    {
        this.id = id;
        this.pos = new Vec2(pos.x, pos.y);
        this.vel = new Vec2(vel.x, vel.y);
        this.rot = rot;
        this.angVel = angVel;
        this.shipConfig = shipConfig;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //NewFromSerialized(serialized)
    //@param serialized the serialized player to create a new Player from
    //@return the new player from serialized
    static NewFromSerialized(serialized)
    {
        serialized.pos = new Vec2(serialized.pos.x, serialized.pos.y);
        serialized.vel = new Vec2(serialized.vel.x, serialized.vel.y);
        return new Player(serialized.id, serialized);
    }
    ///-----------------------------------------------------------------------///
}
//End of Player class
///-----------------------------------------------------------------------///