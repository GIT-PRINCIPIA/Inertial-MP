///-----------------------------------------------------------------------///
//game_state.mjs
//Stores game state, such as players and nodes
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GameState class
export class GameState
{
    ///-----------------------------------------------------------------------///
    //constructor()
    constructor()
    {
        this.players = [];
        this.nodes = [];
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //AddEntity(entity)
    //@param entity the entity to add
    AddEntity(entity)
    {
        switch (entity.type)
        {
            case "player":
                this.players.push(entity);
            break;
            case "gravityNode":
                this.nodes.push(entity);
            break;
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //GetEntity(id)
    //@param id the id of the entity
    //@return the entity with id 'id', or null if no entity found
    GetEntity(id)
    {
        for (const PLAYER of this.players)
        {
            if (PLAYER.id == id) return PLAYER;
        }

        for (const NODE of this.nodes)
        {
            if (NODE.id == id) return NODE;
        }

        return null;
    }
    ///-----------------------------------------------------------------------///
}
//End of GameState class
///-----------------------------------------------------------------------///


