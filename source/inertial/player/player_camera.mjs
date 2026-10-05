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
    //constructor(camera, player)
    //@param camera the camera
    //@param player the player
    constructor(camera, player)
    {
        this.camera = camera;
        this.player = player;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt the timestep or delta time
    FixedUpdate(dt)
    {
        this.camera.pos.AddInPlace(this.player.vel.MultiplyScalar(dt));
        let newPos = Vec2.Lerp(this.camera.pos, this.player.pos, Clamp01(4 * dt));
        this.camera.pos = newPos;

    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerCamera class
///-----------------------------------------------------------------------///