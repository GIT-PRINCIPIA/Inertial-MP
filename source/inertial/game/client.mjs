///-----------------------------------------------------------------------///
//client.mjs
//Stores client side game state, which is patched by the server
///-----------------------------------------------------------------------///

import { EventBroadcast } from "../../engine/events/broadcast.mjs";
import { ClientMessage } from "../player/client_message.mjs";
import { PlayerCamera } from "../player/player_camera.mjs";
import { PlayerCommand } from "../player/player_command.mjs";
import { GameState } from "./simulation/game_state.mjs";
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
        this.playerID = null;
        this.output.Write("REQUEST_PLAYER_ID", "REQUEST_PLAYER_ID");

        this.onPlayerIDreceived = new EventBroadcast();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time / timestep
    FixedUpdate(dt)
    {
        let playerCommand = new PlayerCommand(0,0);
        const MESSAGE_VIEWS = this.input.PeekAll();
        for (const VIEW of MESSAGE_VIEWS)
        {
            console.log(VIEW);
            switch (VIEW.type)
            {
                case "PATCH":
                {
                    const MSG = this.input.CommitTo(VIEW.id);
                    console.log(MSG);
                    const PAYLOAD = MSG.msg;
                    GameStatePatcher.Patch(this.gameState, PAYLOAD);
                }
                break;
                case "INPUT":
                {
                    const MSG = this.input.CommitTo(VIEW.id);
                    console.log(MSG);
                    const PAYLOAD = MSG.msg;
                    this.#HandleInputMSG(playerCommand, PAYLOAD);
                }
                break;
                case "PLAYER_ID":
                {
                    const MSG = this.input.CommitTo(VIEW.id);
                    const PAYLOAD = MSG.msg;
                    console.log(MSG);
                    this.playerID = PAYLOAD;
                    this.onPlayerIDreceived.Fire(PAYLOAD);
                }
                break;
            }
        }
        this.output.Write("PLAYER_COMMAND", playerCommand.Serialize());

        if (this.playerID == null) this.output.Write("REQUEST_PLAYER_ID", "REQUEST_PLAYER_ID");
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //#HandleInputMSG(command, payload)
    //@param command the command which will absorb any new commands
    //@param payload the input message's payload
    #HandleInputMSG(command, payload)
    {
        const INPUT_TYPE = payload.type;

        switch (INPUT_TYPE)
        {
            case "key":
                const CODE = payload.code;
                this.#HandleKeyPress(command, CODE);
            break;
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //#HandleKeyPress(command, code)
    //@param command the command which will absorb any new commands
    //@param code the key code for the input, e.g 'KeyW'
    #HandleKeyPress(command, code)
    {
        switch (code)
        {
            case "KeyW":
                //Forward
                command.Thrust(1);
            break;
            case "KeyS":
                //Backward
                command.Thrust(-1);
            break;
            case "KeyA":
                //Left
                command.Turn(-1);
            break;
            case "KeyD":
                //Right
                command.Turn(1);
            break;  
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of Client class
///-----------------------------------------------------------------------///