///-----------------------------------------------------------------------///
//vector.mjs
//Contains vector math utilities
///-----------------------------------------------------------------------///

import { Lerp } from "./scalar.mjs";

///-----------------------------------------------------------------------///
//Vec2 class
export class Vec2
{
    
    ///-----------------------------------------------------------------------///
    //constructor(x, y)
    //@param x the x component of the vector
    //@param y the y component of the vector
    //@return a new Vec2 object
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    ///-----------------------------------------------------------------------///


    static ZERO = Object.freeze(new Vec2(0, 0));
    static ONE = Object.freeze(new Vec2(1, 1));
    static RIGHT = Object.freeze(new Vec2(1, 0));
    static LEFT = Object.freeze(new Vec2(-1, 0));
    static UP = Object.freeze(new Vec2(0, 1));
    static DOWN = Object.freeze(new Vec2(0, -1));


    ///-----------------------------------------------------------------------///
    //Copy()
    //@return a new vector that is a copy of this vector
    Copy()
    {
        return new Vec2(this.x, this.y);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Add(other)
    //@param other the other vector to add to this
    //@return a new vector that is the sum of this and other
    Add(other)
    {
        return this.Copy().AddInPlace(other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //AddInPlace(other)
    //@param other the other vector to add to this
    //@return this vector after adding other to it
    AddInPlace(other)
    {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Subtract(other)
    //@param other the other vector to subtract from this
    //@return a new vector that is the difference of this and other
    Subtract(other)
    {
        return this.Copy().SubtractInPlace(other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SubtractInPlace(other)
    //@param other the other vector to subtract from this
    //@return this vector after subtracting other from it
    SubtractInPlace(other)
    {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //MultiplyScalar(scalar)
    //@param scalar the scalar to multiply this vector by
    //@return a new vector that is this vector multiplied by scalar
    MultiplyScalar(scalar)
    {
        return this.Copy().MultiplyScalarInPlace(scalar);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //MultiplyScalarInPlace(scalar)
    //@param scalar the scalar to multiply this vector by
    //@return this vector after multiplying it by scalar
    MultiplyScalarInPlace(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Multiply(other)
    //@param other the other vector to multiply this vector by
    //@return a new vector that is the component-wise product of this and other
    Multiply(other)
    {
        return this.Copy().MultiplyInPlace(other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //MultiplyInPlace(other)
    //@param other the other vector to multiply this vector by
    //@return this vector after multiplying it by other
    MultiplyInPlace(other)
    {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DivideScalar(scalar)
    //@param scalar the scalar to divide this vector by
    //@return a new vector that is this vector divided by scalar
    DivideScalar(scalar)
    {
        return this.Copy().DivideScalarInPlace(scalar);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DivideScalarInPlace(scalar)
    //@param scalar the scalar to divide this vector by
    //@return this vector after dividing it by scalar
    DivideScalarInPlace(scalar)
    {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Divide(other)
    //@param other the other vector to divide this vector by
    //@return a new vector that is the component-wise quotient of this and other
    Divide(other)
    {
        return this.Copy().DivideInPlace(other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DivideInPlace(other)
    //@param other the other vector to divide this vector by
    //@return this vector after dividing it by other
    DivideInPlace(other)
    {
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Negate()
    //@return a new vector, the negated 'this'
    Negate()
    {
        return this.Copy().NegateInPlace();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //FromAngle(angle)
    //@param angle the clockwise-positive angle in radians
    //@return a unit vector pointing along 'angle'
    static FromAngle(angle)
    {
        return new Vec2(Math.cos(angle - Math.PI / 2), -Math.sin(angle - Math.PI / 2));
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //NegateInPlace()
    //@return this vector after negation
    NegateInPlace()
    {
        return this.MultiplyScalarInPlace(-1);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Dot(a, b)
    //@param a the first vector
    //@param b the second vector
    //@return the dot product of a and b
    static Dot(a, b)
    {
        return a.x * b.x + a.y * b.y;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Cross(a, b)
    //@param a the first vector
    //@param b the second vector
    //@return the cross product of a and b (a scalar in 2D)
    static Cross(a, b)
    {
        return a.x * b.y - a.y * b.x;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Perpendicular()
    //@return a new vector that is perpendicular to this vector (rotated 90 degrees counter-clockwise)
    Perpendicular()
    {
        return this.Copy().PerpendicularInPlace();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //PerpendicularInPlace()
    //@return this vector after making it perpendicular (rotated 90 degrees counter-clockwise)
    PerpendicularInPlace()
    {
        let newX = -this.y;
        this.y = this.x;
        this.x = newX;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SqrLength()
    //@return the squared length of this vector
    SqrLength()
    {
        return Vec2.Dot(this, this);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Length()
    //@return the length of this vector
    Length()
    {
        return Math.sqrt(this.SqrLength());
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SqrDistance(a, b)
    //@param a the first vector
    //@param b the second vector
    //@return the squared distance between a and b
    static SqrDistance(a, b)
    {
        return (a.Subtract(b)).SqrLength();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SqrDistanceTo(other)
    //@param other the other vector
    //@return the squared distance between this vector and other
    SqrDistanceTo(other)
    {
        return Vec2.SqrDistance(this, other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Distance(a, b)
    //@param a the first vector
    //@param b the second vector
    //@return the distance between a and b
    static Distance(a, b)
    {
        return Math.sqrt(Vec2.SqrDistance(a, b));
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DistanceTo(other)
    //@param other the other vector
    //@return the distance between this vector and other
    DistanceTo(other)
    {
        return Vec2.Distance(this, other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Normalize()
    //@return a new vector that is the normalized version of this vector
    Normalize()
    {
        return this.Copy().NormalizeInPlace();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //NormalizeInPlace()
    //@return this vector after normalizing it
    NormalizeInPlace()
    {
        let length = this.Length();
        if (length === 0)
        {
            this.x = 0;
            this.y = 0;
        }
        else
        {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ToString()
    //@return a string representation of this vector
    ToString()
    {
        return "Vec2(" + this.x + ", " + this.y + ")";
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ToArray()
    //@return an array representation of this vector
    ToArray()
    {
        return [this.x, this.y];
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Equals(other)
    //@param other the other vector to compare to this
    //@return true if this vector is equal to other, false otherwise
    Equals(other)
    {
        return this.x === other.x && this.y === other.y;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //EpsEquals(other, epsilon)
    //@param other the other vector to compare to this
    //@param epsilon the tolerance for equality
    //@return true if this vector is approximately equal to other, false otherwise
    EpsEquals(other, epsilon = 1e-6)
    {
        return Math.abs(this.x - other.x) < epsilon && Math.abs(this.y - other.y) < epsilon;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Rotate(angle)
    //@param angle the angle in radians to rotate this vector by
    //@return a new vector that is this vector rotated by angle
    Rotate(angle)
    {
        return this.Copy().RotateInPlace(angle); 
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //RotateInPlace(angle)
    //@param angle the angle in radians to rotate this vector by
    //@return this vector after rotating it by angle
    RotateInPlace(angle)
    {
        angle = -angle; //Rotate clockwise with positive angle, not counter clockwise
        //Using complex numbers:
        //this = x + iy
        //new = x(cos(angle) + isin(angle)) + iy(cos(angle) + isin(angle))
        //new = xcos(angle) + ixsine(angle) + iycos(angle) - ysine(angle)
        //new = (xcos(angle) - ysine(angle)) + i(xsine(angle) + ycos(angle))
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        //new = xcos - ysin + i(xsin + ycos)
        //new.x = xcos - ysin
        //new.y = xsin + ycos
        let newX = this.x * cos - this.y * sin;
        let newY = this.x * sin + this.y * cos;
        this.x = newX;
        this.y = newY;
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Angle(a, b)
    //@param a the first vector
    //@param b the second vector
    //@return the clockwise-positive angle in radians FROM a TO b, in the range [-PI, PI]
    static Angle(a, b)
    {
        let angle = Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x);

        if (angle > Math.PI)
        {
            angle -= 2 * Math.PI;
        }
        else if (angle < -Math.PI)
        {
            angle += 2 * Math.PI;
        }

        return angle;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //AngleFromX()
    //@return the clockwise-positive angle in radians FROM the positive x-axis TO this vector, in the range [-PI, PI]
    AngleFromX()
    {
        return Vec2.Angle(Vec2.RIGHT, this);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ProjectOnto(other)
    //@param other the other vector to project this vector onto
    //@return a new vector that is the projection of this vector onto other
    ProjectOnto(other)
    {
        return this.Copy().ProjectOntoInPlace(other);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ProjectOntoInPlace(other)
    //@param other the other vector to project this vector onto
    //@return this vector after projecting it onto other
    ProjectOntoInPlace(other)
    {
        let otherLengthSquared = other.SqrLength();
        if (otherLengthSquared === 0)
        {
            this.x = 0;
            this.y = 0;
        }
        else
        {
            let dot = Vec2.Dot(this, other);
            let scalar = dot / otherLengthSquared;
            this.x = scalar * other.x;
            this.y = scalar * other.y;
        }
        return this;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Lerp(a, b, t)
    //@param a the first vector
    //@param b the second vector
    //@param t the interpolation factor (0 <= t <= 1)
    //@return a new vector that is the linear interpolation between a and b
    static Lerp(a, b, t)
    {
        return a.Copy().LerpInPlace(b, t);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //LerpInPlace(a, b, t)
    //@param a the first vector
    //@param b the second vector
    //@param t the interpolation factor (0 <= t <= 1)
    //@return this, after being linearly interpolated between a and b by t
    static LerpInPlace(a, b, t)
    {
        this.x = Lerp(a.x, b.x, t);
        this.y = Lerp(a.y, b.y, t);
        return this;
    }
    ///-----------------------------------------------------------------------///
}
//End of Vec2 class
///-----------------------------------------------------------------------///