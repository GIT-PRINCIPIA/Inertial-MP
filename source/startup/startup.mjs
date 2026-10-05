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
import { MessageQueue } from "../engine/events/queue.mjs";
import { LocalTransport } from "../inertial/networking/local_transport.mjs";
import { PlayerCamera } from "../inertial/player/player_camera.mjs";

///-----------------------------------------------------------------------///
//StartInertial()
async function StartInertial()
{
    //First, initialize the logger service
    Logger.logger = new ConsoleLogger();

    let core = new Core(null); //Replace null with config

    core.onTickLifetimes.Subscribe(core.inputQueue.TickLifetimes.bind(core.inputQueue));

    let client = new Client(core.inputQueue.Reader(), core.outputQueue.Writer());

    core.onFixedUpdate.Subscribe(client.FixedUpdate.bind(client));

    let inputFeeder = new InputFeeder(core.inputQueue.Writer());

    core.onFixedUpdate.Subscribe(inputFeeder.Tick.bind(inputFeeder));

    //Couple server to core
    //For now, we are using a local server, so it accesses Core's input and output queues directly
    let serverInput = new MessageQueue();
    let serverOutput = new MessageQueue();
    let server = new Server(serverInput.Reader(), serverOutput.Writer()); 

    let transport = new LocalTransport(core.outputQueue.Reader(), serverInput.Writer(), serverOutput.Reader(), core.inputQueue.Writer());

    core.onFixedUpdate.Subscribe(transport.Tick.bind(transport));

    core.onFixedUpdate.Subscribe(server.FixedUpdate.bind(server));

    core.onTickLifetimes.Subscribe(serverInput.TickLifetimes.bind(serverInput));



    client.onPlayerIDreceived.Subscribe(async (PLAYER_ID)=>{

        let player = client.gameState.GetEntity(PLAYER_ID);
        if (!player) return;
        //Camera
        let camera = new Camera(new Vec2(10, 10), new Vec2(0,0), 1);
    
        let playerCamera = new PlayerCamera(camera, player, client.input);
    
        
        
        //Renderer
        let canvas = new Canvas(document.getElementById("game-window"));
        core.onFixedUpdate.Subscribe((dt)=>{playerCamera.FixedUpdate(dt);});
        let backend = new WebGLbackend(canvas);
        let renderService = new RenderService(canvas, backend);
        console.dir(renderService);
        let renderer = new Renderer(canvas, renderService);
        await renderer.Initialize();
        console.dir(renderer);
    
        core.onRender.Subscribe(()=>{renderer.DrawScene(camera, client.gameState);});
        window.addEventListener('resize', canvas.Resize.bind(canvas));
    });
    StartGameLoop(core);
}
///-----------------------------------------------------------------------///

StartInertial();