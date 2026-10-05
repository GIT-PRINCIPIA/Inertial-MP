///-----------------------------------------------------------------------///
//player_command.mjs
//A simple one-frame command, for movement, weapons, etc
///-----------------------------------------------------------------------///

import { Clamp } from "../../utility/scalar.mjs";


///-----------------------------------------------------------------------///
//PlayerCommand class
export class PlayerCommand
{
    ///-----------------------------------------------------------------------///
    //constructor(thrust, turn)
    //@param thrust the amount to thrust by [-1 - 1]
    //@param turn the amount to turn by [-1 - 1]
    constructor(thrust, turn)
    {
        this.thrust = thrust;
        this.turn = turn;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Thrust(val)
    //@param val how much to thrust by
    Thrust(val)
    {
        this.thrust += val;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Turn(val)
    //@param val how much to turn by
    Turn(val)
    {
        this.turn += val;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Absorb(other)
    //@param other the other command to absorb into this one
    Absorb(other)
    {
        this.thrust += other.thrust;
        this.turn += other.turn;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Clamp()
    //Avoid hacked clients giving 5 thrust, or 3 turn, etc
    Clamp()
    {
        this.thrust = Clamp(this.thrust, -1, 1);
        this.turn = Clamp(this.turn, -1, 1);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Serialize()
    //@return the serialized player command
    Serialize()
    {
        return {
            thrust: this.thrust,
            turn: this.turn
        };
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Deserialize(serialized)
    //@param serialized the serialized player command
    //@return the new player command
    static Deserialize({thrust, turn})
    {
        return new PlayerCommand(thrust, turn);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Meaningful()
    //@return true if this command actually describes a modification to player state
    Meaningful()
    {
        return (
            (this.thrust != 0) ||
            (this.turn != 0) 
        );
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Settle()
    //Settles the command to a state where data such as weapon firing does not persist
    Settle()
    {

    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerCommand
///-----------------------------------------------------------------------///