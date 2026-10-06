///-----------------------------------------------------------------------///
//polygon_collider.mjs
//A polygonal collider
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { Collider } from "./collider.mjs";


///-----------------------------------------------------------------------///
//PolygonCollider class
export class PolygonCollider extends Collider
{
    ///-----------------------------------------------------------------------///
    //constructor(points)
    //@param points the vertices of the polygon collider
    constructor(points)
    {
        super();

        this.points = points;

        //Calculate the signed area.
        //
        //Positive area means counter-clockwise winding.
        //Negative area means clockwise winding.
        this.area = 0;

        for (let i = 0; i < points.length; ++i)
        {
            const A = points[i];
            const B = points[(i + 1) % points.length];

            this.area += A.x * B.y - B.x * A.y;
        }

        this.area *= 0.5;

        //A negative-area polygon is treated as a boundary rather than
        //a solid polygon. Its interior is the valid region.
        this.isBounds = this.area < 0;

        //Cache the inward-facing normal of every edge.
        //
        //For a positive-area polygon the interior is to the left of
        //each edge, so the inward normal is (-dy, dx).
        //
        //For a negative-area polygon the interior is to the right of
        //each edge, so the inward normal is (dy, -dx).
        this.normals = [];

        const NORMAL_DIRECTION = this.area >= 0 ? 1 : -1;

        for (let i = 0; i < points.length; ++i)
        {
            const A = points[i];
            const B = points[(i + 1) % points.length];

            const DX = B.x - A.x;
            const DY = B.y - A.y;

            let normal;

            if (NORMAL_DIRECTION > 0)
            {
                normal = new Vec2(-DY, DX);
            }
            else
            {
                normal = new Vec2(DY, -DX);
            }

            const LENGTH = Math.sqrt(
                normal.x * normal.x +
                normal.y * normal.y
            );

            if (LENGTH > 0)
            {
                normal = normal.DivideScalar(LENGTH);
            }

            this.normals.push(normal);
        }

        //Cache the polygon centroid.
        //
        //This is useful for orienting collision normals consistently
        //when the polygon is transformed into world space.
        this.centroid = PolygonCollider.CalculateCentroid(points);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CalculateCentroid(points)
    //@param points the polygon vertices
    //@return the polygon centroid
    static CalculateCentroid(points)
    {
        let areaTwice = 0;
        let x = 0;
        let y = 0;

        for (let i = 0; i < points.length; ++i)
        {
            const A = points[i];
            const B = points[(i + 1) % points.length];

            const CROSS = A.x * B.y - B.x * A.y;

            areaTwice += CROSS;
            x += (A.x + B.x) * CROSS;
            y += (A.y + B.y) * CROSS;
        }

        //Degenerate polygons do not have a meaningful area-weighted
        //centroid. Fall back to the average of the vertices.
        if (Math.abs(areaTwice) < 0.000001)
        {
            x = 0;
            y = 0;

            for (const POINT of points)
            {
                x += POINT.x;
                y += POINT.y;
            }

            if (points.length > 0)
            {
                return new Vec2(
                    x / points.length,
                    y / points.length
                );
            }

            return new Vec2(0, 0);
        }

        return new Vec2(
            x / (3 * areaTwice),
            y / (3 * areaTwice)
        );
    }
    ///-----------------------------------------------------------------------///
}
//End of PolygonCollider class
///-----------------------------------------------------------------------///