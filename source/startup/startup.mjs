///-----------------------------------------------------------------------///
//startup.mjs
//Handles starting the game loop, and registering services
///-----------------------------------------------------------------------///

import { StartGameLoop } from "../engine/core/game_loop.mjs";
import { Core } from "../engine/core/core.mjs";
import { ConsoleLogger, Logger } from "../engine/debug/logging.mjs";
import { Server } from "../inertial/game/server.mjs";

///-----------------------------------------------------------------------///
//StartInertial()
function StartInertial()
{
    //First, initialize the logger service
    Logger.logger = new ConsoleLogger();

    let core = new Core(null); //Replace null with config

    //Couple server to core
    //For now, we are using a local server, so it accesses Core's input and output queues directly
    let server = new Server(core.outputQueue.Reader(), core.inputQueue.Writer()); //Client output is server input, client input is server output

    core.onFixedUpdate.Subscribe(server.FixedUpdate.bind(server));
    
    StartGameLoop(core);
}
///-----------------------------------------------------------------------///

StartInertial();