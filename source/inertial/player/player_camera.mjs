///-----------------------------------------------------------------------///
//player_camera.mjs
//A wrapper around Camera
///-----------------------------------------------------------------------///

import { Clamp01 } from "../../utility/scalar.mjs";
import { Vec2 } from "../../utility/vector.mjs";


///-----------------------------------------------------------------------///
//PlayerCamera class
export class PlayerCamera
{
    ///-----------------------------------------------------------------------///
    //constructor(camera, player, input)
    //@param camera the camera
    //@param player the player
    //@param input the input queue reader
    constructor(camera, player, input)
    {
        this.camera = camera;
        this.player = player;
        this.input = input;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt the timestep or delta time
    FixedUpdate(dt)
    {
        const INPUTS = this.input.Read("INPUT");
        let mouseX = 0;
        let mouseY = 0;

        for (const INPUT of INPUTS)
        {
            if (INPUT.type == "mousePos")
            {
                mouseX = INPUT.x;
                mouseX = INPUT.y;
            }
        }

        this.camera.pos.AddInPlace(this.player.vel.MultiplyScalar(dt));
        let newPos = Vec2.Lerp(this.camera.pos, this.player.pos, Clamp01(4 * dt));
        this.camera.pos = newPos;

    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerCamera class
///-----------------------------------------------------------------------///