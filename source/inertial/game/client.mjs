///-----------------------------------------------------------------------///
//client.mjs
//Stores client side game state, which is patched by the server
///-----------------------------------------------------------------------///

import { GameState } from "./Simulation/game_state.mjs";
import { GameStatePatcher } from "./simulation/game_state_patcher.mjs";

///-----------------------------------------------------------------------///
//Client class
export class Client
{
    ///-----------------------------------------------------------------------///
    //constructor(input, output)
    //@param input the input queue, e.g packets from the server, or keyboard input
    //@param output the output queue, e.g packets to the server
    constructor(input, output)
    {
        this.gameState = new GameState();
        this.input = input;
        this.output = output;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time / timestep
    FixedUpdate(dt)
    {
        while (!this.input.Empty())
        {
            const MSG = this.input.Pop();
            const TYPE = MSG.type;
            const PAYLOAD = MSG.msg;

            switch (TYPE)
            {
                case "PATCH":
                    GameStatePatcher.Patch(this.gameState, PAYLOAD);
                break;
            }
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of Client class
///-----------------------------------------------------------------------///