///-----------------------------------------------------------------------///
//player_simulation.mjs
//Handles simulating players. Stateless!
///-----------------------------------------------------------------------///

import { Clamp01, Lerp, SmoothStep } from "../../../utility/scalar.mjs";
import { Vec2 } from "../../../utility/vector.mjs";
import { GetAcceleration } from "../../physics/fundamentals.mjs";
import { PlayerCommand } from "../../player/player_command.mjs";
import { GravitySimulation } from "./gravity_simulation.mjs";


///-----------------------------------------------------------------------///
//PlayerSimulation class
export class PlayerSimulation
{
    ///-----------------------------------------------------------------------///
    //UpdatePlayer(player, command, dt, gameState)
    //@param player the player to update
    //@param command the player command to use to handle input, etc
    //@param dt the timestep, delta time
    //@param gameState the current GameState
    static UpdatePlayer(player, command, dt, gameState)
    {
        
        player.pos.AddInPlace(player.vel.MultiplyScalar(dt));
        player.rot += player.angVel * dt;

        PlayerSimulation.ApplyPlayerInput(player, command, dt);
        
        {
            let error = player.targetAngVel - player.angVel;

            let impulse = Math.sign(error) * Math.min(Math.abs(error), player.shipConfig.turnAccel * dt);

            player.angVel += impulse;
        }

        for (const NODE of gameState.nodes)
        {
            const DELTA = NODE.pos.Subtract(player.pos);
            const SQR_DIST = DELTA.SqrLength();
            const DELTA_NORM = DELTA.Normalize();
            const ACCELERATIION = GravitySimulation.CalculateAcceleration(SQR_DIST, NODE.mass) * dt;


            const ACCELERATIION_VEC = DELTA_NORM.MultiplyScalar(ACCELERATIION);

            player.vel.AddInPlace(ACCELERATIION_VEC);
        }
        
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ApplyPlayerInput(player, input, dt)
    //@param player the player to apply input to
    //@param input the input
    //@param dt delta time
    static ApplyPlayerInput(player, input, dt)
    {
        if (!input) input = new PlayerCommand(0,0);
        input.Clamp(); //Avoid cheating with 'normalized' inputs higher than one

        let dirVec = Vec2.FromAngle(player.rot);
        let accel = GetAcceleration(player.shipConfig.mass, player.shipConfig.forwardThrustForce, dt);
        dirVec.MultiplyScalarInPlace(accel * input.thrust);
        player.vel.AddInPlace(dirVec);

        player.targetAngVel = player.shipConfig.turnSpeed * input.turn;

        input.Settle();
    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerSimulation class
///-----------------------------------------------------------------------///