///-----------------------------------------------------------------------///
//client.mjs
//Stores client side game state, which is patched by the server
///-----------------------------------------------------------------------///

import { EventBroadcast } from "../../engine/events/broadcast.mjs";
import { ClientOutputPacket } from "../networking/client_output_packet.mjs";
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

        const SERVER_TO_CLIENT_PACKETS = this.input.Drain("SERVER_TO_CLIENT_PACKET");
        for (const SERVER_TO_CLIENT_PACKET of SERVER_TO_CLIENT_PACKETS)
        {
            switch (SERVER_TO_CLIENT_PACKET.type)
            {
                case "PATCH":
                {
                    GameStatePatcher.Patch(this.gameState, SERVER_TO_CLIENT_PACKET.msg);
                }
                break;
                case "PLAYER_ID":
                {
                    const ID = SERVER_TO_CLIENT_PACKET.msg;
                    this.playerID = ID;
                    this.onPlayerIDreceived.Fire(ID);
                }
                break;
            }
        }


        const INPUTS = this.input.Read("INPUT");
        for (const INPUT of INPUTS)
        {
            this.#HandleInputMSG(playerCommand, INPUT);
        }

        
        
        this.output.Write("CLIENT_TO_SERVER_PACKET", new ClientOutputPacket("PLAYER_COMMAND", playerCommand.Serialize()));

        if (this.playerID == null) this.output.Write("CLIENT_TO_SERVER_PACKET", new ClientOutputPacket("REQUEST_PLAYER_ID", null));
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