///-----------------------------------------------------------------------///
//server.mjs
//The game server, authoritative over game state
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { GravityNode } from "../entities/gravity_node.mjs";
import { Player } from "../player/player.mjs";
import { ShipConfig } from "../player/ship_config.mjs";
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

        this.simulation.AddNode(new GravityNode(0, new Vec2(0, 10), 1, 1, 10));
        this.simulation.AddPlayer(new Player(1, new Vec2(0, 0), new Vec2(0, 0), 0, 0, new ShipConfig(1)));
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        this.simulation.FixedUpdate(dt);
    }
    ///-----------------------------------------------------------------------///
}
//End of Server class
///-----------------------------------------------------------------------///