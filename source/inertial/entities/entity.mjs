///-----------------------------------------------------------------------///
//entity.mjs
//basic entity base class
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Entity class
export class Entity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, type)
    //@param id the id of the entity
    //@param type the type of entity
    constructor(id, type)
    {
        this.id = id;
        this.type = type;
    }
    ///-----------------------------------------------------------------------///
}
//End of Entity class
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//StaticEntity class
export class StaticEntity extends Entity 
{
    ///-----------------------------------------------------------------------///
    //constructor(id, type, pos)
    //@param id the id of the entity
    //@param type the type of entity
    //@param pos the position of the entity
    constructor(id, type, pos)
    {
        super(id, type);
        this.pos = pos;
    }
    ///-----------------------------------------------------------------------///
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//DynamicEntity class
export class DynamicEntity extends StaticEntity
{
    ///-----------------------------------------------------------------------///
    //constructor(id, type, pos, vel)
    //@param id the id of the entity
    //@param type the type of entity
    //@param pos the position of the entity
    //@param vel the velocity of the entity
    constructor(id, type, pos, vel)
    {
        super(id, type, pos);
        this.vel = vel;
    }
    ///-----------------------------------------------------------------------///
}
///-----------------------------------------------------------------------///