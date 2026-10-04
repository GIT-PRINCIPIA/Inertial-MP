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
    //Write(message)
    //@param message the message to add to the MessageQueue
    Write(message)
    {
        this.queue.queue.push(message);
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueueWriter class
///-----------------------------------------------------------------------///