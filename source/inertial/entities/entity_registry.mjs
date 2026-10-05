///-----------------------------------------------------------------------///
//entity_registry.mjs
//Handles entity types, and creation
///-----------------------------------------------------------------------///

import { Logger } from "../../engine/debug/logging.mjs";
import { Player } from "../player/player.mjs";
import { GravityNode } from "./gravity_node.mjs";


///-----------------------------------------------------------------------///
//EntityRegistry class
export class EntityRegistry
{
    static TYPES = 
    {
        player: Player,
        gravityNode: GravityNode
    };


    ///-----------------------------------------------------------------------///
    //constructor(gameState)
    //@param gameState the gameState to add entities to
    constructor(gameState)
    {
        this.entityIDs = [];
        this.freeIDs = [];

        this.gameState = gameState;
    }   
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //RegisterEntity(entity)
    //@param entity the entity to register
    RegisterEntity(entity)
    {
        if (this.freeIDs.length > 0)
        {
            const ID = this.freeIDs.shift()
            entity.id = ID;
            this.entityIDs[ID] = ID; //Just make sure
        } 
        else
        {
            const ID = this.entityIDs.length
            entity.id = ID;
            this.entityIDs.push(ID);
        }

        this.gameState.AddEntity(entity);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //UnregisterID(id)
    //@param id the id to unregister
    UnregisterID(id)
    {
        if (this.entityIDs.length > id && this.freeIDs.indexOf(id) == -1)
        {
            this.freeIDs.push(id);
            this.gameState.RemoveEntity(id);
        }
        else
        {
            Logger.Error(
                "id not found in entityIDs",
                "UnregisterID(id)",
                "EntityRegistry",
                "entity_registry.mjs"
            );
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of EntityRegistry class
///-----------------------------------------------------------------------///