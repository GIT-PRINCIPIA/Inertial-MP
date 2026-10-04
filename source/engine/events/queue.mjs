///-----------------------------------------------------------------------///
//queue.mjs
//A generic message queue
///-----------------------------------------------------------------------///

import {MessageQueueReader} from "./queue_reader.mjs"
import {MessageQueueWriter} from "./queue_writer.mjs"

///-----------------------------------------------------------------------///
//MessageQueue class
export class MessageQueue
{
    ///-----------------------------------------------------------------------///
    //constructor()
    constructor()
    {
        this.queue = [];
        this.reader = new MessageQueueReader();
        this.writer = new MessageQueueWriter();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Size()
    //@return the current size of the message queue
    Size()
    {
        return this.queue.length;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Reader()
    //@return the MessageQueueReader for this message queue
    Reader()
    {
        return this.reader;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Writer()
    //@return the MessageQueueWriter for this message queue
    Writer()
    {
        return this.writer;
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueue class
///-----------------------------------------------------------------------///