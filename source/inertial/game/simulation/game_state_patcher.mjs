///-----------------------------------------------------------------------///
//game_state_patcher.mjs
//Handles patching arbitrary game states with incoming packets
///-----------------------------------------------------------------------///

import { Logger } from "../../../engine/debug/logging.mjs";
import { EntityRegistry } from "../../entities/entity_registry.mjs";


///-----------------------------------------------------------------------///
//GameStatePatch class
export class GameStatePatch
{
    ///-----------------------------------------------------------------------///
    //constructor(id, type, args)
    //@param id the id of the entity to patch
    //@param type the type of the entity
    //@param args the arguments
    constructor(id, type, args)
    {
        this.id = id;
        this.type = type;
        this.args = args;
    }
    ///-----------------------------------------------------------------------///
}
//End of GameStatePatch class
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GameStatePatcher class
export class GameStatePatcher
{
    ///-----------------------------------------------------------------------///
    //Patch(gameState, patch)
    //@param gameState the GameState to patch
    //@param patch the GameStatePatch to apply
    static Patch(gameState, patch)
    {
        const ENTITY_ID = patch.id;
        var entity = gameState.GetEntity(ENTITY_ID);
        if (entity == null)
        {
            //Create a new entity
            const TYPE = patch.type;
            const CLASS = EntityRegistry.TYPES[TYPE];
            if (CLASS == null)
            {
                Logger.Error(
                    `Unknown entity type ${TYPE} - cannot create entity from patch.`,
                    "Patch(gameState, patch)",
                    "GameStatePatcher",
                    "game_state_patcher.mjs"
                );
                return;
            }
            entity = new CLASS(patch.id, patch.args); 
            gameState.AddEntity(entity);
        }
        else
        {
            //Update existing entity
            const KEYS = Object.keys(patch.args);
            for (const KEY of KEYS)
            {
                const VALUE = patch.args[KEY];
                entity[KEY] = VALUE;
            }
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //GeneratePatch(entity)
    //@param entity the entity to generate a patch for (must be an entity, since entities have 'id')
    //@return the patch for the entity, or null if failed
    static GeneratePatch(entity)
    {
        var keys = Object.keys(entity);
        const ID_IDX = keys.indexOf('id');
        if (ID_IDX == -1) 
        {
            Logger.Error(
                "could not generate patch for Entity 'entity' - 'entity' was not an Entity - it did not have an ID.",
                "GeneratePatch(entity)",
                "GameStatePatcher",
                "game_state_patcher.mjs"
            );
            return null;
        }
        const ID = entity.id;
        

        let args = {};
        for (const KEY of keys)
        {
            if (KEY == 'id') continue;
            if (KEY == 'type') continue;

            const VALUE = entity[KEY];
            args[KEY] = VALUE;
        }

        let patch = new GameStatePatch(ID, entity.type, args); 
        return patch;
    }
    ///-----------------------------------------------------------------------///
}
//End of GameStatePatcher class
///-----------------------------------------------------------------------///