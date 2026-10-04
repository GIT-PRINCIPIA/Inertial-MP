///-----------------------------------------------------------------------///
//local_transport.mjs
//A transport layer which connects a local client and local server
///-----------------------------------------------------------------------///

import { ServerMessage } from "./server_message.mjs";


///-----------------------------------------------------------------------///
//LocalTransport class
export class LocalTransport
{
    ///-----------------------------------------------------------------------///
    //constructor(clientOutput, serverInput, serverOutput, clientInput)
    //@param clientOutput the reader representing the client's output queue
    //@param serverInput the writer representing the server's input queue
    //@param serverOutput the reader representing the server's output queue
    //@param clientInput the writer representing the client's input queue
    constructor(clientOutput, serverInput, serverOutput, clientInput)
    {
        this.clientOutput = clientOutput;
        this.serverInput = serverInput;
        this.serverOutput = serverOutput;
        this.clientInput = clientInput;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Tick()
    Tick()
    {
        while (!this.clientOutput.Empty())
        {
            const PACKET = this.clientOutput.Pop();
            const SERVER_MSG = new ServerMessage(PACKET, 0);
            this.serverInput.Write("PACKET", SERVER_MSG);
        }
        while (!this.serverOutput.Empty())
        {
            const PACKET = this.serverOutput.Pop().msg;
            const CLIENT_MSG = PACKET.message;
            const TYPE = PACKET.type;
            this.clientInput.Write(TYPE, CLIENT_MSG);
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of LocalTransport class
///-----------------------------------------------------------------------///