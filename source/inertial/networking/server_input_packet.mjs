///-----------------------------------------------------------------------///
//server_input_packet.mjs
//A wrapper around a basic message object, for use on the server side's input only
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ServerInputPacket class
export class ServerInputPacket
{
    ///-----------------------------------------------------------------------///
    //constructor(message, source)
    //@param message the message
    //@param source the identifying source of the message
    constructor(message, source)
    {
        this.message = message;
        this.source = source;
    }
    ///-----------------------------------------------------------------------///
}
//End of ServerInputPacket class
///-----------------------------------------------------------------------///