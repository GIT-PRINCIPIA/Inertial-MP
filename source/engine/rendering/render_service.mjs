///-----------------------------------------------------------------------///
//render_service.mjs
//Engine facing abstraction layer over the backend
///-----------------------------------------------------------------------///

import { WebGLbackend } from "./render_backend.mjs";


///-----------------------------------------------------------------------///
//RenderService class
export class RenderService
{
    #backend;

    ///-----------------------------------------------------------------------///
    //constructor(canvas, backend)
    //@param canvas the canvas to bind the render service to
    //@param backend the render backend to use
    constructor(canvas, backend)
    {
        this.canvas = canvas;
        this.#backend = backend;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DrawVertices(camera, vertices)
    //@param vertices the vertices that make up the mesh to draw
    DrawVertices(vertices)
    {
        this.#backend.DrawVertices(vertices);
    }
    ///-----------------------------------------------------------------------///
}
//End of RenderService class
///-----------------------------------------------------------------------///