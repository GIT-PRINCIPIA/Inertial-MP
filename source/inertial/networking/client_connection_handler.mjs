///-----------------------------------------------------------------------///
//client_connection_handler.mjs
//Handles mapping client connection IDs to entity IDs, and creating new clients
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { Player } from "../player/player.mjs";
import { ShipConfig } from "../player/ship_config.mjs";


///-----------------------------------------------------------------------///
//ClientConnectionHandler class
export class ClientConnectionHandler
{
    connectionIDtoEntityID = {};
    ///-----------------------------------------------------------------------///
    //constructor(entityRegistry)
    //@param entityRegistry the entity registry
    constructor(entityRegistry)
    {
        this.entityRegistry = entityRegistry;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //GetClientPlayerEntity(connectionID)
    //@param connectionID the connection id for the client
    //@return the id of the player object the client owns (potentially new, or not if called multiple times)
    GetClientPlayerEntity(connectionID)
    {
        if (this.connectionIDtoEntityID[connectionID] == undefined)
        {
            //New client
            //For now, all players start at the same spot. A player spawner would take over, later
            let player = new Player(0, {pos: Vec2.ZERO.Copy(), vel: Vec2.ZERO.Copy(), rot: 0, angVel: 0, shipConfig: new ShipConfig(1, 0.1)});
            this.entityRegistry.RegisterEntity(player);
            this.connectionIDtoEntityID[connectionID] = player.id;
            return player.id;
        }
        else
        {
            //Existing client
            return this.connectionIDtoEntityID[connectionID];
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of ClientConnectionHandler class
///-----------------------------------------------------------------------///