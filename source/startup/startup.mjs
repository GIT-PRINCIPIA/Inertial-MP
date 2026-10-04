///-----------------------------------------------------------------------///
//startup.mjs
//Handles starting the game loop, and registering services
///-----------------------------------------------------------------------///

import { StartGameLoop } from "../engine/core/game_loop.mjs";
import { Core } from "../engine/core/core.mjs";
import { ConsoleLogger, Logger } from "../engine/debug/logging.mjs";
import { Server } from "../inertial/game/server.mjs";
import { WebGLbackend } from "../engine/rendering/render_backend.mjs";
import { RenderService } from "../engine/rendering/render_service.mjs";
import { Canvas } from "../engine/rendering/canvas.mjs";
import { Renderer } from "../inertial/rendering/renderer.mjs";
import { Client } from "../inertial/game/client.mjs";
import { Camera } from "../engine/rendering/camera.mjs";
import { Vec2 } from "../utility/vector.mjs";
import { InputFeeder } from "../engine/interface/input.mjs";

///-----------------------------------------------------------------------///
//StartInertial()
async function StartInertial()
{
    //First, initialize the logger service
    Logger.logger = new ConsoleLogger();

    let core = new Core(null); //Replace null with config

    let client = new Client(core.inputQueue.Reader(), core.outputQueue.Writer());

    core.onFixedUpdate.Subscribe(client.FixedUpdate.bind(client));

    let inputFeeder = new InputFeeder(core.inputQueue.Writer());

    //Couple server to core
    //For now, we are using a local server, so it accesses Core's input and output queues directly
    let server = new Server(core.outputQueue.Reader(), core.inputQueue.Writer()); //Client output is server input, client input is server output

    core.onFixedUpdate.Subscribe(server.FixedUpdate.bind(server));



    //Camera
    let camera = new Camera(new Vec2(10, 10), server.simulation.gameState.players[0].pos, 1);


    //Renderer
    let canvas = new Canvas(document.getElementById("game-window"));
    let backend = new WebGLbackend(canvas);
    let renderService = new RenderService(canvas, backend);
    console.dir(renderService);
    let renderer = new Renderer(canvas, renderService);
    await renderer.Initialize();
    console.dir(renderer);

    core.onRender.Subscribe(()=>{renderer.DrawScene(camera, client.gameState);});
    window.addEventListener('resize', canvas.Resize.bind(canvas));
    StartGameLoop(core);
}
///-----------------------------------------------------------------------///

StartInertial();