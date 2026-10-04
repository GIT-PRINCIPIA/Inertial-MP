///-----------------------------------------------------------------------///
//renderer.mjs
//Inertial game facing render API
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";


///-----------------------------------------------------------------------///
//Renderer class
export class Renderer
{
    ///-----------------------------------------------------------------------///
    //constructor(canvas, renderService)
    //@param canvas the canvas to bind the render service to
    //@param renderService the render service to use
    constructor(canvas, renderService)
    {
        this.canvas = canvas;
        this.renderService = renderService;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DrawVertices(camera, vertices)
    //@param camera the camera to use to render
    //@param vertices the vertices that make up the mesh to draw
    DrawVertices(camera, vertices)
    {
        for (var vertex of vertices)
        {
            vertex = camera.WorldToScreen(vertex, this.canvas);
        }
        this.renderService.DrawVertices(vertices);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DrawScene(camera, gameState)
    //@param camera the camera to use to render
    //@param gameState the current GameState to render
    DrawScene(camera, gameState)
    {
        let vertices = 
        [
            -1, -1,
            -1, 1,
            1, 1,
            1, -1
        ];
        for (var i = 0; i < vertices.length; i+= 2)
        {
            let vertex = new Vec2(vertices[i], vertices[i+1]);
            vertex = camera.WorldToScreen(vertex, this.canvas);
            vertices[i] = vertex.x;
            vertices[i+1] = vertex.y;
        }
        this.renderService.DrawVertices(vertices);
    }
    ///-----------------------------------------------------------------------///
}
//End of Renderer class
///-----------------------------------------------------------------------///