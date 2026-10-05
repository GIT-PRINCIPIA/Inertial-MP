///-----------------------------------------------------------------------///
//client_message.mjs
//A wrapper around a basic message object, for use on the server side's output only
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ClientMessage class
export class ClientMessage
{
    ///-----------------------------------------------------------------------///
    //constructor(target, message)
    //@param target the target recipient
    //@param message the message data
    constructor(target, message)
    {
        this.target = target;
        this.message = message;
    }
    ///-----------------------------------------------------------------------///
}
//End of ClientMessage class
///-----------------------------------------------------------------------///