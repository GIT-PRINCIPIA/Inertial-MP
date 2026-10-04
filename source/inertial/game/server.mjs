///-----------------------------------------------------------------------///
//server.mjs
//The game server, authoritative over game state
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { GravityNode } from "../entities/gravity_node.mjs";
import { Player } from "../player/player.mjs";
import { ShipConfig } from "../player/ship_config.mjs";
import { GameStatePatcher } from "./simulation/game_state_patcher.mjs";
import { Simulation } from "./simulation/simulation.mjs";

///-----------------------------------------------------------------------///
//Server class
export class Server
{
    simulation;

    ///-----------------------------------------------------------------------///
    //constructor(input, output)
    //@param input the queue reader the server will use for receiving messages
    //@param output the queue writer the server will use for submitting messages
    constructor(input, output)
    {
        this.input = input;
        this.output = output;
        this.simulation = new Simulation();

        this.simulation.gameState.AddEntity(new GravityNode(0, {pos: new Vec2(0, 3), mass: 1, regenMult: 1, regenDoubleDist: 10}));
        this.simulation.gameState.AddEntity(new Player(1, {pos: new Vec2(0, 0), vel: new Vec2(1.75, 0), rot: 0, angVel: 2, shipConfig: new ShipConfig(1, 0.1)}));
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        this.simulation.FixedUpdate(dt);
        this.output.Write("PATCH", GameStatePatcher.GeneratePatch(this.simulation.gameState.players[0]));
        this.output.Write("PATCH", GameStatePatcher.GeneratePatch(this.simulation.gameState.nodes[0]));
    }
    ///-----------------------------------------------------------------------///
}
//End of Server class
///-----------------------------------------------------------------------///