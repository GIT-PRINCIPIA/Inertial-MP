///-----------------------------------------------------------------------///
//server.mjs
//The game server, authoritative over game state
///-----------------------------------------------------------------------///

import { Simulation } from "./simulation/simulation.mjs";

///-----------------------------------------------------------------------///
//Server class
export class Server
{
    #simulation;

    ///-----------------------------------------------------------------------///
    //constructor(input, output)
    //@param input the queue reader the server will use for receiving messages
    //@param output the queue writer the server will use for submitting messages
    constructor(input, output)
    {
        this.input = input;
        this.output = output;
        this.#simulation = new Simulation();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt delta time
    FixedUpdate(dt)
    {
        this.#simulation.FixedUpdate(dt);
    }
    ///-----------------------------------------------------------------------///
}
//End of Server class
///-----------------------------------------------------------------------///