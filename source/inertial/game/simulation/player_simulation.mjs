///-----------------------------------------------------------------------///
//player_simulation.mjs
//Handles simulating players. Stateless!
///-----------------------------------------------------------------------///

import { GravitySimulation } from "./gravity_simulation.mjs";


///-----------------------------------------------------------------------///
//PlayerSimulation class
export class PlayerSimulation
{
    ///-----------------------------------------------------------------------///
    //UpdatePlayer(player, dt, gameState)
    //@param player the player to update
    //@param dt the timestep, delta time
    //@param gameState the current GameState
    static UpdatePlayer(player, dt, gameState)
    {
        player.pos.AddInPlace(player.vel.MultiplyScalar(dt));

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
}
//End of PlayerSimulation class
///-----------------------------------------------------------------------///