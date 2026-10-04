///-----------------------------------------------------------------------///
//game_loop.mjs
//Handles dispatching core events
///-----------------------------------------------------------------------///

///-----------------------------------------------------------------------///
//GameLoop config
const MAX_FRAME_DELTA_TIME = 0.25; //Seconds
const FIXED_DELTA_TIME = 1 / 60; //Seconds
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GameLoop state
let animationFrameID = null;
let lastTime = null;
let accumulator = 0;
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//StartGameLoop(core)
//@param core the engine core
export function StartGameLoop(core)
{
    lastTime = null;
    accumulator = 0;

    core.onStart.Fire();

    animationFrameID = requestAnimationFrame((time) =>
    {
        Frame(core, time);
    });
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//StopGameLoop(core)
//@param core the engine core
export function StopGameLoop(core)
{
    if (animationFrameID !== null)
    {
        cancelAnimationFrame(animationFrameID);
        animationFrameID = null;
    }

    core.onStop.Fire();
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Frame(core, time)
//@param core the engine core
//@param time current animation frame time in milliseconds
function Frame(core, time)
{
    if (lastTime === null)
    {
        lastTime = time;
    }

    let deltaTime = (time - lastTime) / 1000;

    lastTime = time;

    //Prevent a long pause from producing an enormous simulation step.
    deltaTime = Math.min(deltaTime, MAX_FRAME_DELTA_TIME);

    accumulator += deltaTime;

    while (accumulator >= FIXED_DELTA_TIME)
    {
        core.onFixedUpdate.Fire(FIXED_DELTA_TIME);

        accumulator -= FIXED_DELTA_TIME;
    }

    core.onRender.Fire(deltaTime);
    core.onPollInputs.Fire();
    core.onDispatchOutputs.Fire();

    animationFrameID = requestAnimationFrame((nextTime) =>
    {
        Frame(core, nextTime);
    });
}
///-----------------------------------------------------------------------///