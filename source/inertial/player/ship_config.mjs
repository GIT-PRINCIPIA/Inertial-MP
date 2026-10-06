///-----------------------------------------------------------------------///
//ship_config.mjs
//Handles configuring a ship
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ShipConfig class
export class ShipConfig
{
    mass;
    size;
    

    forwardThrustForce; //units/s^2
    backwardThrustForce; //units/s^2

    thrustEnergyEfficiency; //energy/s

    turnSpeed; //rads/s

    turnAccel; //rads/s/s

    rcsThrustForce; //units/s^2 requires no energy, but very little thrust



    ///-----------------------------------------------------------------------///
    //Default()
    //@return the default ship config
    static Default()
    {
        let c = new ShipConfig();
        c.mass = 1;
        c.size = 0.1;
        c.forwardThrustForce = 6;
        c.backwardThrustForce = 6;
        c.thrustEnergyEfficiency = 1;
        c.turnSpeed = 4;
        c.turnAccel = 32;
        c.rcsThrustForce = 0.5;
        return c;
    }
    ///-----------------------------------------------------------------------///
}
//End of ShipConfig class
///-----------------------------------------------------------------------///