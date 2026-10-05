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
    //Write(type, message, lifetime)
    //@param type the message type, used for parsing
    //@param message the message to add to the MessageQueue
    //@param lifetime the message's lifetime in ticks
    Write(type, message, lifetime = 1)
    {
        console.log("Write");
        let packet = {type: type, msg: message, lifetime: lifetime};
        console.dir(packet);
        this.queue.queue.push(packet);
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueueWriter class
///-----------------------------------------------------------------------///