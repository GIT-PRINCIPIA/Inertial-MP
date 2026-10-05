///-----------------------------------------------------------------------///
//queue_writer.mjs
//A wrapper around a queue, for writing to it
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//MessageQueueWriter class
export class MessageQueueWriter
{
    ///-----------------------------------------------------------------------///
    //constructor(queue)
    //@param queue the message queue to write to
    constructor(queue)
    {
        this.queue = queue;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Write(type, message)
    //@param type the message type, used for parsing
    //@param message the message to add to the MessageQueue
    Write(type, message)
    {
        this.queue.queue.push({type: type, msg: message, id: this.queue.queue.length});
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueueWriter class
///-----------------------------------------------------------------------///