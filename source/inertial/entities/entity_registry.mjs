///-----------------------------------------------------------------------///
//entity_registry.mjs
//Handles entity types, and creation
///-----------------------------------------------------------------------///

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
}
//End of EntityRegistry class
///-----------------------------------------------------------------------///