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
    ///-----------------------------------------------------------------------///
    //constructor(gameState)
    //@param gameState the gameState to simulate
    constructor(gameState)
    {
        this.gameState = gameState;
        this.playerCommands = new Map();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SetPlayerCommand(ID, command)
    //@param ID the id of the player
    //@param command the command
    SetPlayerCommand(ID, command)
    {
        this.playerCommands.set(ID, command);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        for (const PLAYER of this.gameState.players)
        {
            PlayerSimulation.UpdatePlayer(PLAYER, this.playerCommands.get(PLAYER.id), dt, this.gameState);
        }
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