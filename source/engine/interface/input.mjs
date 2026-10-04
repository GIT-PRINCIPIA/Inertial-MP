///-----------------------------------------------------------------------///
//input.mjs
//Feeds inputs into a queue
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//InputFeeder class
export class InputFeeder
{
    ///-----------------------------------------------------------------------///
    //constructor(output)
    //@param output the queue writer to feed inputs into
    constructor(output)
    {
        this.output = output;
        this.listeners = new Map();

        this.Register("keydown", (event) =>
        {
            this.output.Write(
                "keyDown",
                {
                key: event.key,
                code: event.code,
                repeat: event.repeat
            });
        });

        this.Register("keyup", (event) =>
        {
            this.output.Write(
                "keyUp",
                {
                key: event.key,
                code: event.code
            });
        });

        this.Register("click", (event) =>
        {
            this.output.Write(
                "mouseClick",
                {
                button: event.button,
                clientX: event.clientX,
                clientY: event.clientY,
                detail: event.detail
            });
        });

        this.Register("wheel", (event) =>
        {
            this.output.Write(
                "scroll",
                {
                deltaX: event.deltaX,
                deltaY: event.deltaY,
                deltaZ: event.deltaZ,
                deltaMode: event.deltaMode,
                clientX: event.clientX,
                clientY: event.clientY
            });
        }, { passive: true });
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Register(eventName, callback, options)
    //@param eventName the browser event name
    //@param callback the listener to register
    //@param options listener options
    Register(eventName, callback, options)
    {
        window.addEventListener(eventName, callback, options);
        this.listeners.set(eventName, callback);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Dispose()
    //Unregisters the browser event listeners
    Dispose()
    {
        for (const [eventName, callback] of this.listeners)
        {
            window.removeEventListener(eventName, callback);
        }
        this.listeners.clear();
    }
    ///-----------------------------------------------------------------------///
}
//End of InputFeeder class
///-----------------------------------------------------------------------///