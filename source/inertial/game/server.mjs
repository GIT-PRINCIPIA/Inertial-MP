///-----------------------------------------------------------------------///
//server.mjs
//The game server, authoritative over game state
///-----------------------------------------------------------------------///

import { Lerp, Clamp01 } from "../../utility/scalar.mjs";
import { Vec2 } from "../../utility/vector.mjs";
import { EntityRegistry } from "../entities/entity_registry.mjs";
import { GravityNode } from "../entities/gravity_node.mjs";
import { ClientConnectionHandler } from "../networking/client_connection_handler.mjs";
import { ClientMessage } from "../player/client_message.mjs";
import { Player } from "../player/player.mjs";
import { PlayerCommand } from "../player/player_command.mjs";
import { ShipConfig } from "../player/ship_config.mjs";
import { GameStatePatcher } from "./simulation/game_state_patcher.mjs";
import { PlayerSimulation } from "./simulation/player_simulation.mjs";
import { Simulation } from "./simulation/simulation.mjs";

///-----------------------------------------------------------------------///
//Server class
export class Server
{
    ///-----------------------------------------------------------------------///
    //constructor(input, output)
    //@param input the queue reader the server will use for receiving messages
    //@param output the queue writer the server will use for submitting messages
    constructor(input, output)
    {
        this.input = input;
        this.output = output;
        this.simulation = new Simulation();

        this.entityRegistry = new EntityRegistry(this.simulation.gameState);

        this.clientConnectionHandler = new ClientConnectionHandler(this.entityRegistry);


        let node = new GravityNode(1, {pos: new Vec2(0, 4), mass: 1, regenMult: 1, regenDoubleDist: 10});
        this.entityRegistry.RegisterEntity(node);

        let node1 = new GravityNode(2, {pos: new Vec2(2, 6), mass: 1, regenMult: 1, regenDoubleDist: 10});
        this.entityRegistry.RegisterEntity(node1);

        let node2 = new GravityNode(3, {pos: new Vec2(-4, 3), mass: 1, regenMult: 1, regenDoubleDist: 10});
        this.entityRegistry.RegisterEntity(node2);

        let node3 = new GravityNode(4, {pos: new Vec2(-2, -3), mass: 1, regenMult: 1, regenDoubleDist: 10});
        this.entityRegistry.RegisterEntity(node3);
    }
    ///-----------------------------------------------------------------------///



    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        while (!this.input.Empty())
        {
            const PACKET = this.input.Pop().msg;
            const SOURCE = PACKET.source;
            const MESSAGE = PACKET.message;
            const TYPE = MESSAGE.type;
            const DATA = MESSAGE.msg;

            switch (TYPE)
            {
                case "PLAYER_COMMAND":
                    const ID = this.clientConnectionHandler.GetClientPlayerEntity(SOURCE);
                    this.simulation.SetPlayerCommand(ID, PlayerCommand.Deserialize(DATA));
                break;
                case "REQUEST_PLAYER_ID":
                    //Player entity added BEFORE patches are sent.
                    //Client gets PLAYER_ID packet same frame as the PATCH packet.
                    const PLAYER_ID = this.clientConnectionHandler.GetClientPlayerEntity(SOURCE);
                    this.output.Write("PLAYER_ID", new ClientMessage(SOURCE, PLAYER_ID));
                break;
            }
        }

        this.simulation.FixedUpdate(dt);

        for (const PLAYER of this.simulation.gameState.players)
        {
            let patch = GameStatePatcher.GeneratePatch(PLAYER);
            for (const RECIPIENT of this.simulation.gameState.players)
            {
                this.output.Write("PATCH", new ClientMessage(RECIPIENT.id, patch));
            }
            
        }
        for (const NODE of this.simulation.gameState.nodes)
        {
            let patch = GameStatePatcher.GeneratePatch(NODE);
            for (const RECIPIENT of this.simulation.gameState.players)
            {
                this.output.Write("PATCH", new ClientMessage(RECIPIENT.id, patch));
            }
        }
        


        
    }
    ///-----------------------------------------------------------------------///
}
//End of Server class
///-----------------------------------------------------------------------///