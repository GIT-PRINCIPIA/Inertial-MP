///-----------------------------------------------------------------------///
//queue_reader.mjs
//A wrapper around a queue, for reading from it
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//MessageQueueReader class
export class MessageQueueReader
{
    ///-----------------------------------------------------------------------///
    //constructor(queue)
    //@param queue the message queue to read from
    constructor(queue)
    {
        this.queue = queue;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Size()
    //@return the current size of the message queue
    Size()
    {
        return this.queue.Size();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Empty()
    //@return true if empty, false otherwise
    Empty()
    {
        return this.Size() == 0;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Read(type)
    //@param type the type of message to read
    //@return an array of all messages with that type
    Read(type)
    {
        let arr = [];
        for (const ITEM of this.queue.queue)
        {
            if (ITEM.type == type) arr.push(structuredClone(ITEM.msg));
        }
        return arr;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Drain(type)
    //@param type the type of message to drain from the queue
    //@return all items removed
    Drain(type)
    {
        
        return this.queue.Drain(type);
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueueReader class
///-----------------------------------------------------------------------///