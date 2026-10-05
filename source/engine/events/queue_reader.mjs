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
        return this.queue.queue.length == 0;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Pop()
    //@return the first item in the message queue, removing it in the process
    Pop()
    {
        if (this.Size() <= 0)
        {
            return undefined; //No more messages
        }
        return this.queue.queue.shift(); //First in, first out - first sent, first received
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //PeekAll()
    //@return the types of all messages in the queue
    PeekAll()
    {
        let view = [];
        for (const ITEM of this.queue.queue)
        {
            view.push({type: ITEM.type, id: ITEM.id});
        }
        return view;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CommitTo(id)
    //@param id the id of the message to commmit to receiving
    CommitTo(id)
    {
        for (var i = 0; i < this.queue.queue.length; i++)
        {
            const ITEM = this.queue.queue[i];
            if (ITEM.id == id)
            {
                this.queue.queue.splice(i, 1);
                return ITEM;
            }
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Drain()
    //destroys the message queue's contents
    Drain()
    {
        this.queue.queue = [];
    }
    ///-----------------------------------------------------------------------///
}
//End of MessageQueueReader class
///-----------------------------------------------------------------------///