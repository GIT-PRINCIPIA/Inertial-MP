///-----------------------------------------------------------------------///
//server_output_packet.mjs
//A wrapper around a basic message object, for use on the server side's output only
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ServerOutputPacket class
export class ServerOutputPacket
{
    ///-----------------------------------------------------------------------///
    //constructor(target, type, message)
    //@param target the target recipient
    //@param type the packet type
    //@param message the message data
    constructor(target, type, message)
    {
        this.target = target;
        this.type = type;
        this.message = message;
    }
    ///-----------------------------------------------------------------------///
}
//End of ServerOutputPacket class
///-----------------------------------------------------------------------///