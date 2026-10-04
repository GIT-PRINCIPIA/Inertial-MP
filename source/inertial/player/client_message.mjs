///-----------------------------------------------------------------------///
//client_message.mjs
//A wrapper around a basic message object, for use on the server side's output only
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ClientMessage class
export class ClientMessage
{
    ///-----------------------------------------------------------------------///
    //constructor(target, type, message)
    //@param target the target recipient
    //@param type the type of packet
    //@param message the message data
    constructor(target, type, message)
    {
        this.target = target;
        this.type = type;
        this.message = message;
    }
    ///-----------------------------------------------------------------------///
}
//End of ClientMessage class
///-----------------------------------------------------------------------///