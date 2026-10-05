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
    //constructor(camera, client)
    //@param camera the camera
    //@param client the client
    constructor(camera, client)
    {
        this.camera = camera;
        this.client = client;
        this.x = 0;
        this.y = 0;
        window.addEventListener('mousemove', (event) => {
            this.x = (event.clientX / Math.min(window.innerWidth, window.innerHeight)) * 2 - 1;
            this.y = -((event.clientY / Math.min(window.innerWidth, window.innerHeight)) * 2 - 1);
        });
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FixedUpdate(dt)
    //@param dt the timestep or delta time
    FixedUpdate(dt)
    {
        if (this.client.playerID != null)
        {
            const PLAYER_ENTITY = this.client.gameState.GetEntity(this.client.playerID);
            if (PLAYER_ENTITY)
            {
                const OFFSET = new Vec2(this.x * 8, this.y * 8);
                let newPos = Vec2.Lerp(this.camera.pos, PLAYER_ENTITY.pos.Add(OFFSET), Clamp01(4 * dt));
                this.camera.pos = newPos;
                
                this.camera.zoom = 2 / (OFFSET.Length() / 5 + 1);

            }
        }
    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerCamera class
///-----------------------------------------------------------------------///