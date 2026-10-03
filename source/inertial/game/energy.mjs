///-----------------------------------------------------------------------///
//energy.mjs
//Provides useful energy-related utilities
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";

///-----------------------------------------------------------------------///
//Energy class
export class Energy
{
    static BASE_REGEN_RATE = 1;


    ///-----------------------------------------------------------------------///
    //CalculateRegeneration(entity, gravityNodes, dt)
    //@param entity the entity (derived from StaticEntity or DynamicEntity) to calculate regeneration for
    //@param gravityNodes the array of gravity nodes providing energy regeneration
    //@param dt delta time
    //@return the regeneration this tick
    static CalculateRegeneration(entity, gravityNodes, dt)
    {
        var regen = 0;

        //Loop over gravityNodes, and find the max regen effect
        for (var i = 0; i < gravityNodes.length; i++)
        {
            const NODE_REGEN = Energy.CalculateSingleNodeRegenerationRate(entity, gravityNodes[i]) * dt;
            regen = Math.max(regen, NODE_REGEN);
        }

        return regen;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CalculateRegeneration(entity, gravityNode, dt)
    //@param entity the entity (derived from StaticEntity or DynamicEntity) to calculate regeneration for
    //@param gravityNode the gravity node providing energy regeneration
    //@return regeneration / second
    static CalculateSingleNodeRegenerationRate(entity, gravityNode)
    {
        const SQR_DIST = Vec2.SqrDistance(entity.pos, gravityNode.pos);
        
        const REGEN_DOUBLE_DIST_SQUARED =
            gravityNode.regenDoubleDist * gravityNode.regenDoubleDist;

        const REGEN_INFLUENCE =
            SQR_DIST / (SQR_DIST + REGEN_DOUBLE_DIST_SQUARED);

        const ENERGY_REGENERATION_RATE =
            Energy.BASE_REGEN_RATE *
            (1 + gravityNode.regenStrength * REGEN_INFLUENCE);

        return ENERGY_REGENERATION_RATE;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CalculateThrustEnergyCost(efficiency, thrustMagnitude, dt)
    //@param efficiency the efficiency of the thruster
    //@param thrustMagnitude the thrust value
    //@param dt the timestep, seconds
    //@return the energy cost to thrust by thrustMagnitude
    CalculateThrustEnergyCost(efficiency, thrustMagnitude, dt)
    {
        
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CalculateWeaponEnergyCost(weapon, registry)
    //@param weapon the weapon name
    //@param registry the weapon registry
    //@return the energy cost to use the weapon
    CalculateWeaponEnergyCost(weapon)
    {

    }
    ///-----------------------------------------------------------------------///
}
//End of Energy class
///-----------------------------------------------------------------------///