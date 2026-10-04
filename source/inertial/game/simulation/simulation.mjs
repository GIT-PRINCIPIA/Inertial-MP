///-----------------------------------------------------------------------///
//simulation.mjs
//Handles orchestration of the integration of the simulation of the game state.
///-----------------------------------------------------------------------///

import { GameState } from "./game_state.mjs";
import { GameStatePatcher } from "./game_state_patcher.mjs";
import { PlayerSimulation } from "./player_simulation.mjs";

///-----------------------------------------------------------------------///
//Simulation class
export class Simulation
{
    gameState;
    ///-----------------------------------------------------------------------///
    //constructor()
    constructor()
    {
        this.gameState = new GameState();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        for (const PLAYER of this.gameState.players)
        {
            PlayerSimulation.UpdatePlayer(PLAYER, dt, this.gameState);
            console.log("Player pos: " + PLAYER.pos.ToString());
            console.log("Player vel: " + PLAYER.vel.ToString());
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //AddPlayer(player)
    //@param player the player to add
    AddPlayer(player)
    {
        this.gameState.players.push(player);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //AddNode(node)
    //@param node the GravityNode to add
    AddNode(node)
    {
        this.gameState.nodes.push(node);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //PatchGameState(patch)
    //@param patch the GameStatePatch to apply
    PatchGameState(patch)
    {
        GameStatePatcher.Patch(this.gameState, patch);
    }
    ///-----------------------------------------------------------------------///
}
//End of Simulation class
///-----------------------------------------------------------------------///