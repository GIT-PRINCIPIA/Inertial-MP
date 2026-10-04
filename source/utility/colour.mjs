///-----------------------------------------------------------------------///
//colour.mjs
//Handles colours
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Colour class
export class Colour
{
    ///-----------------------------------------------------------------------///
    //constructor(r, g, b, a)
    //@param r the red channel
    //@param g the green channel
    //@param b the blue channel
    //@param a the alpha channel
    constructor(r, g, b, a)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //RGB(r, g, b)
    //@param r the red channel
    //@param g the green channel
    //@param b the blue channel
    //@return a new Colour, with r = r, g = g, b = b, and a = 1
    static RGB(r, g, b)
    {
        return new Colour(r, g, b, 1);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //RGBA(r, g, b, a)
    //@param r the red channel
    //@param g the green channel
    //@param b the blue channel
    //@param a the alpha channel
    //@return a new Colour, with r = r, g = g, b = b, a = a 
    static RGBA(r, g, b, a)
    {
        return new Colour (r, g, b, a);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ToArray()
    //@return an array of numbers, representing [r, g, b, a]
    ToArray()
    {
        return [this.r, this.g, this.b, this.a];
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ToString()
    //@return the string representation of this colour
    ToString()
    {
        return "rgba(r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a + ")";
    }
    ///-----------------------------------------------------------------------///
}
//End of Colour class
///-----------------------------------------------------------------------///