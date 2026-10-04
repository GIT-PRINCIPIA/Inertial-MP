///-----------------------------------------------------------------------///
//renderer.mjs
//Inertial game facing render API
///-----------------------------------------------------------------------///

import { Colour } from "../../utility/colour.mjs";
import { FileService } from "../../utility/file_reader.mjs";
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
    //Initialize()
    async Initialize()
    {
        let gravityNodeVert = await (await FileService.LoadFile("./data/shaders/gravity_node.vert")).text();
        let gravityNodeFrag = await (await FileService.LoadFile("./data/shaders/gravity_node.frag")).text();
        
        this.gravityNodeProgram = this.renderService.CreateProgram(gravityNodeVert, gravityNodeFrag);


        let playerVert = await(await FileService.LoadFile("./data/shaders/player.vert")).text();
        let playerFrag = await(await FileService.LoadFile("./data/shaders/player.frag")).text();

        this.playerProgram = this.renderService.CreateProgram(playerVert, playerFrag);

        let quadVertices = [
            -1, -1,
            -1, 1,
            1, -1,

            -1, 1,
            1, 1,
            1, -1
        ];

        this.quadMesh = this.renderService.CreateMesh(quadVertices);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DrawScene(camera, gameState)
    //@param camera the camera to use to render
    //@param gameState the current GameState to render
    DrawScene(camera, gameState)
    {

        const pixelsPerWorldUnit =
            Math.min(this.canvas.width, this.canvas.height) /
            Math.min(camera.size.x, camera.size.y);

        const worldToClip = [
            2 * camera.zoom * pixelsPerWorldUnit / this.canvas.width,
            2 * camera.zoom * pixelsPerWorldUnit / this.canvas.height
        ];

        this.renderService.ClearScreen(Colour.RGB(0,0,0));
        this.renderService.SetProgram(this.gravityNodeProgram);

        this.renderService.SetUniform("cameraPosition", camera.pos.ToArray());
        this.renderService.SetUniform("worldToClip", worldToClip);

        for (var n = 0; n < gameState.nodes.length; n++)
        {
            const NODE = gameState.nodes[n];
            this.renderService.SetUniform("nodePosition", NODE.pos.ToArray());
            this.renderService.SetUniform("nodeRadius", NODE.radius);

            this.renderService.DrawMesh(this.quadMesh);
        }


        this.renderService.SetProgram(this.playerProgram);

        this.renderService.SetUniform("cameraPosition", camera.pos.ToArray());
        this.renderService.SetUniform("worldToClip", worldToClip);

        for (var n = 0; n < gameState.players.length; n++)
        {
            const PLAYER = gameState.players[n];
            this.renderService.SetUniform("playerPosition", PLAYER.pos.ToArray());
            this.renderService.SetUniform("playerRotation", PLAYER.rot);
            this.renderService.SetUniform("playerSize", PLAYER.shipConfig.size);

            this.renderService.DrawMesh(this.quadMesh);
        }



    }
    ///-----------------------------------------------------------------------///
}
//End of Renderer class
///-----------------------------------------------------------------------///