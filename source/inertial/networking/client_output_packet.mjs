///-----------------------------------------------------------------------///
//client_output_packet.mjs
//A CLIENT SIDE packet, OWNED BY THE CLIENT
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ClientOutputPacket class
export class ClientOutputPacket
{
    ///-----------------------------------------------------------------------///
    //constructor(type, payload)
    //@param type the type of payload the packet carries
    //@param payload the packet's payload
    constructor(type, payload)
    {
        this.type = type;
        this.payload = payload;
    }
    ///-----------------------------------------------------------------------///
}
//End of ClientOutputPacket class
///-----------------------------------------------------------------------///