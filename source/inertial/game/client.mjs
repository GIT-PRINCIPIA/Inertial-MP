///-----------------------------------------------------------------------///
//client.mjs
//Stores client side game state, which is patched by the server
///-----------------------------------------------------------------------///

import { ClientMessage } from "../player/client_message.mjs";
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

        //Would request a player to be constructed - but the client NEED NOT know about the player
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
                case "INPUT":
                    this.#HandleInputMSG(PAYLOAD);
                break;
            }
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //#HandleInputMSG(payload)
    //@param payload the input message's payload
    #HandleInputMSG(payload)
    {
        const INPUT_TYPE = payload.type;

        switch (INPUT_TYPE)
        {
            case "key":
                const CODE = payload.code;
                this.#HandleKeyPress(CODE);
            break;
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //#HandleKeyPress(code)
    //@param code the key code for the input, e.g 'KeyW'
    #HandleKeyPress(code)
    {
        switch (code)
        {
            case "KeyW":
                //Forward
                this.output.Write("INPUT", "W");
            break;
            case "KeyS":
                //Backward
                this.output.Write("INPUT", "S");
            break;
            case "KeyA":
                //Left
                this.output.Write("INPUT", "A");
            break;
            case "KeyD":
                //Right
                this.output.Write("INPUT", "D");
            break;  
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of Client class
///-----------------------------------------------------------------------///