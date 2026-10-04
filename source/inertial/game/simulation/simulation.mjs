///-----------------------------------------------------------------------///
//simulation.mjs
//Handles orchestration of the integration of the simulation of the game state.
///-----------------------------------------------------------------------///

import { GameState } from "./game_state.mjs";
import { PlayerSimulation } from "./player_simulation.mjs";

///-----------------------------------------------------------------------///
//Simulation class
export class Simulation
{
    #gameState;
    ///-----------------------------------------------------------------------///
    //constructor()
    constructor()
    {
        this.#gameState = new GameState();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        for (const PLAYER of this.#gameState.players)
        {
            PlayerSimulation.UpdatePlayer(PLAYER, dt, this.#gameState);
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of Simulation class
///-----------------------------------------------------------------------///