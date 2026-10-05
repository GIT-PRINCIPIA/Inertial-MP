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
        this.reader = new MessageQueueReader(this);
        this.writer = new MessageQueueWriter(this);
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


    ///-----------------------------------------------------------------------///
    //Drain(type)
    //@param type the type of message to drain from the queue
    //@return all items removed
    Drain(type)
    {
        let arr = [];
        let drained = [];
        for (const ITEM of this.queue)
        {
            if (ITEM.type != type) 
            {
                arr.push(ITEM); //No need for structured clone
            }
            else
            {
                drained.push(ITEM.msg); //No need for structured clone
            }
        }
        this.queue = arr;
        return drained;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //TickLifetimes()
    TickLifetimes()
    {
        let arr = [];
        for (const ITEM of this.queue)
        {
            ITEM.lifetime--;
            if (ITEM.lifetime >= 0) 
            {
                //Keep the item
                arr.push(ITEM); //No need for structured clone
            }
        }
        this.queue = arr;
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueue class
///-----------------------------------------------------------------------///