///-----------------------------------------------------------------------///
//core.mjs
//the core of the engine - handles orchestration
///-----------------------------------------------------------------------///

import { EventBroadcast } from "../events/broadcast.mjs";
import { MessageQueue } from "../events/queue.mjs";


///-----------------------------------------------------------------------///
//Core class
export class Core
{
    ///-----------------------------------------------------------------------///
    //constructor(config)
    constructor(config)
    {
        this.config = config;
        this.onStart = new EventBroadcast();
        this.onFixedUpdate = new EventBroadcast();
        this.onRender = new EventBroadcast();
        this.onPollInputs = new EventBroadcast();
        this.onDispatchOutputs = new EventBroadcast();
        this.onStop = new EventBroadcast();

        this.onTickLifetimes = new EventBroadcast(); //E.g message queue packet lifetimes

        this.inputQueue = new MessageQueue(); //E.g keyboard input, incoming packets
        this.outputQueue = new MessageQueue(); //E.g sending packets to the server
    }
    ///-----------------------------------------------------------------------///
}
//End of Core class
///-----------------------------------------------------------------------///