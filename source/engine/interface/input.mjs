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

        this.keyStatuses = {};

        this.Register("keydown", (event) =>
        {
            this.keyStatuses[event.code] = true;
            
        });

        this.Register("keyup", (event) =>
        {
            this.keyStatuses[event.code] = false;
            
        });

        this.Register("click", (event) =>
        {
            this.output.Write(
                "INPUT",
                {
                type: "mouseClick",
                button: event.button,
                clientX: event.clientX,
                clientY: event.clientY,
                detail: event.detail
            });
        });

        this.Register("wheel", (event) =>
        {
            this.output.Write(
                "INPUT",
                {
                type: "scroll",
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
    //Tick()
    Tick()
    {
        //Feed key inputs into inputs queue
        const KEY_CODES = Object.keys(this.keyStatuses);

        for (const KEY_CODE of KEY_CODES)
        {
            const VALUE = this.keyStatuses[KEY_CODE];
            if (VALUE)
            {
                //Key pressed
                this.output.Write(
                    "INPUT",
                    {
                        type: "key",
                        code: KEY_CODE
                    }
                );
            }

        }
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