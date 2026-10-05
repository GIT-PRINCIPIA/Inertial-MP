///-----------------------------------------------------------------------///
//local_transport.mjs
//A transport layer which connects a local client and local server
///-----------------------------------------------------------------------///

import { ServerInputPacket } from "./server_input_packet.mjs";


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
        const CLIENT_OUTPUTS = this.clientOutput.Drain("CLIENT_TO_SERVER_PACKET");
        for (const CLIENT_OUTPUT of CLIENT_OUTPUTS)
        {
            const SERVER_MSG = new ServerInputPacket(CLIENT_OUTPUT, 0);
            this.serverInput.Write("CLIENT_TO_SERVER_PACKET", structuredClone(SERVER_MSG), 20);
        }

        const SERVER_OUTPUTS = this.serverOutput.Drain("SERVER_TO_CLIENT_PACKET");
        for (const SERVER_OUTPUT of SERVER_OUTPUTS)
        {
            this.clientInput.Write("SERVER_TO_CLIENT_PACKET", structuredClone({type: SERVER_OUTPUT.type, msg: SERVER_OUTPUT.message}), 20);
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of LocalTransport class
///-----------------------------------------------------------------------///