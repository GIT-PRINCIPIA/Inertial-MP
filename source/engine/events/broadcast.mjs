///-----------------------------------------------------------------------///
//broadcast.mjs
//Handles event subscription and dispatch
///-----------------------------------------------------------------------///

import { Logger } from "../debug/logging.mjs";


///-----------------------------------------------------------------------///
//EventBroadcast class
export class EventBroadcast
{
    ///-----------------------------------------------------------------------///
    //constructor()
    constructor()
    {
        this.subscriptions = [];
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Fire()
    Fire(...args)
    {
        for (var i = 0; i < this.subscriptions.length; i++)
        {
            this.subscriptions[i](...args);
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Subscribe(callback)
    //@param callback the callback to be run on Fire()
    Subscribe(callback)
    {
        this.subscriptions.push(callback);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Unsubscribe(callback)
    //@param callback the callback to remove from the subscriptions list
    Unsubscribe(callback)
    {
        let idx = this.subscriptions.indexOf(callback);
        if (idx >= 0)
        {
            this.subscriptions.splice(idx, 1); //Remove '1' item at 'idx'
        }
        else
        {
            Logger.Error(
                "Callback was not found in subscription list; could not remove.",
                "Unsubscribe(callback)",
                "EventBroadcast",
                "broadcast.mjs"
            );
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of EventBroadcast class
///-----------------------------------------------------------------------///