///-----------------------------------------------------------------------///
//camera.mjs
//A camera
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";


///-----------------------------------------------------------------------///
//Camera class
export class Camera
{
    ///-----------------------------------------------------------------------///
    //constructor(size, pos, zoom)
    //@param size a vec2 for VIRTUAL camera size (kind of like a framebuffer)
    //@param pos a vec2 for camera position, world space
    //@param zoom the camera's zoom value
    constructor(size, pos, zoom)
    {
        this.size = size;
        this.pos = pos;
        this.zoom = zoom;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //WorldToScreen(pos, canvas)
    //@param pos a vec2 containing the world position
    //@param canvas the Canvas object
    //@returns a vec2 containing the screen position
    WorldToScreen(pos, canvas)
    {
        const relativeX = pos.x - this.pos.x;
        const relativeY = pos.y - this.pos.y;

        const cameraX = relativeX * this.zoom;
        const cameraY = relativeY * this.zoom;

        // virtual coords with origin at top-left of virtual viewport
        const virtualX = cameraX + this.size.x * 0.5;
        const virtualY = -cameraY + this.size.y * 0.5;

        // scale based on smallest canvas dimension so units stay square
        const canvasMin = Math.min(canvas.width, canvas.height);
        const virtualMin = Math.min(this.size.x, this.size.y);
        const scale = canvasMin / virtualMin;

        // compute letterbox offsets so virtual viewport is centered
        const scaledVirtualWidth = this.size.x * scale;
        const scaledVirtualHeight = this.size.y * scale;
        const offsetX = (canvas.width - scaledVirtualWidth) * 0.5;
        const offsetY = (canvas.height - scaledVirtualHeight) * 0.5;

        return new Vec2(virtualX * scale + offsetX, virtualY * scale + offsetY); 
    }
    ///-----------------------------------------------------------------------///
}
//End of Camera class
///-----------------------------------------------------------------------///