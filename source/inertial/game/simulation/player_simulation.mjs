///-----------------------------------------------------------------------///
//player_simulation.mjs
//Handles simulating players. Stateless!
///-----------------------------------------------------------------------///

import { Clamp01, Lerp, SmoothStep } from "../../../utility/scalar.mjs";
import { Vec2 } from "../../../utility/vector.mjs";
import { CircleCollider } from "../../physics/circle_collider.mjs";
import { Collision } from "../../physics/collision.mjs";
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
        
        

        PlayerSimulation.ApplyPlayerInput(player, command, dt);
        
        {
            let error = player.targetAngVel - player.angVel;

            let impulse = Math.sign(error) * Math.min(Math.abs(error), player.shipConfig.turnAccel * dt);

            player.angVel += impulse;
        }

        player.vel.AddInPlace(GravitySimulation.CalculateNodesAcceleration(player.pos, gameState.nodes).MultiplyScalarInPlace(dt));
        
        player.pos.AddInPlace(player.vel.MultiplyScalar(dt));
        player.rot += player.angVel * dt;

        let collider = new CircleCollider(player.shipConfig.size);

        let collision = Collision.CheckCollision(collider, gameState.bounds, player.pos, new Vec2(0,0), player.rot, 0);

        if (collision)
        {
            player.pos.AddInPlace(
                collision.normal.MultiplyScalar(collision.depth)
            );

            const NORMAL_VELOCITY = Vec2.Dot(
                player.vel,
                collision.normal
            );

            player.vel.SubtractInPlace(
                collision.normal.MultiplyScalar(NORMAL_VELOCITY)
            );
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
        let accel = GetAcceleration(player.shipConfig.mass, player.shipConfig.forwardThrustForce);
        dirVec.MultiplyScalarInPlace(accel * input.thrust * dt);
        player.vel.AddInPlace(dirVec);

        player.targetAngVel = player.shipConfig.turnSpeed * input.turn;

        input.Settle();
    }
    ///-----------------------------------------------------------------------///
}
//End of PlayerSimulation class
///-----------------------------------------------------------------------///