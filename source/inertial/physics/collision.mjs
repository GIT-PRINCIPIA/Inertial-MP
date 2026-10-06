///-----------------------------------------------------------------------///
//collision.mjs
//Arbitrary collision handling
///-----------------------------------------------------------------------///

import { Vec2 } from "../../utility/vector.mjs";
import { CircleCollider } from "./circle_collider.mjs";
import { PolygonCollider } from "./polygon_collider.mjs";


///-----------------------------------------------------------------------///
//Constants

const COLLISION_EPSILON = 0.000001;


///-----------------------------------------------------------------------///
//GetWorldPolygon(polygon, position, rotation)
//@param polygon the polygon collider
//@param position the polygon's world position
//@param rotation the polygon's world rotation
//@return the polygon's transformed points and normals
function GetWorldPolygon(polygon, position, rotation)
{
    const COS = Math.cos(rotation);
    const SIN = Math.sin(rotation);

    const POINTS = [];
    const NORMALS = [];

    for (let i = 0; i < polygon.points.length; ++i)
    {
        const POINT = polygon.points[i];

        POINTS.push(new Vec2(
            POINT.x * COS - POINT.y * SIN + position.x,
            POINT.x * SIN + POINT.y * COS + position.y
        ));

        const NORMAL = polygon.normals[i];

        NORMALS.push(new Vec2(
            NORMAL.x * COS - NORMAL.y * SIN,
            NORMAL.x * SIN + NORMAL.y * COS
        ));
    }

    return {
        points: POINTS,
        normals: NORMALS
    };
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GetWorldCentroid(polygon, position, rotation)
//@param polygon the polygon collider
//@param position the polygon's world position
//@param rotation the polygon's world rotation
//@return the world-space centroid
function GetWorldCentroid(polygon, position, rotation)
{
    const COS = Math.cos(rotation);
    const SIN = Math.sin(rotation);

    const CENTROID = polygon.centroid;

    return new Vec2(
        CENTROID.x * COS - CENTROID.y * SIN + position.x,
        CENTROID.x * SIN + CENTROID.y * COS + position.y
    );
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ProjectPolygon(points, axis)
//@param points polygon points
//@param axis normalized projection axis
//@return the minimum and maximum projection
function ProjectPolygon(points, axis)
{
    let MIN = Infinity;
    let MAX = -Infinity;

    for (const POINT of points)
    {
        const PROJECTION =
            POINT.x * axis.x +
            POINT.y * axis.y;

        MIN = Math.min(MIN, PROJECTION);
        MAX = Math.max(MAX, PROJECTION);
    }

    return {
        min: MIN,
        max: MAX
    };
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//GetProjectionOverlap(a, b)
//@param a first projection
//@param b second projection
//@return the amount by which the projections overlap
function GetProjectionOverlap(a, b)
{
    return Math.min(a.max, b.max) - Math.max(a.min, b.min);
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//OrientNormal(normal, aCentre, bCentre)
//@param normal an arbitrary normal
//@param aCentre A's centre
//@param bCentre B's centre
//@return the normal pointing from A towards B
function OrientNormal(normal, aCentre, bCentre)
{
    const DX = bCentre.x - aCentre.x;
    const DY = bCentre.y - aCentre.y;

    if (DX * normal.x + DY * normal.y < 0)
    {
        return new Vec2(-normal.x, -normal.y);
    }

    return normal;
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//PointInPolygon(point, polygon)
//@param point the point to test
//@param polygon the world-space polygon
//@return true if the point is inside the polygon
function PointInPolygon(point, polygon)
{
    for (let i = 0; i < polygon.points.length; ++i)
    {
        const EDGE_POINT = polygon.points[i];
        const NORMAL = polygon.normals[i];

        const DX = point.x - EDGE_POINT.x;
        const DY = point.y - EDGE_POINT.y;

        const DISTANCE =
            DX * NORMAL.x +
            DY * NORMAL.y;

        if (DISTANCE < -COLLISION_EPSILON)
        {
            return false;
        }
    }

    return true;
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ClosestPointOnSegment(point, a, b)
//@param point the point to test
//@param a first segment endpoint
//@param b second segment endpoint
//@return the closest point on the segment
function ClosestPointOnSegment(point, a, b)
{
    const DX = b.x - a.x;
    const DY = b.y - a.y;

    const LENGTH_SQUARED =
        DX * DX +
        DY * DY;

    if (LENGTH_SQUARED <= COLLISION_EPSILON)
    {
        return new Vec2(a.x, a.y);
    }

    let T =
        ((point.x - a.x) * DX +
         (point.y - a.y) * DY) /
        LENGTH_SQUARED;

    T = Math.max(0, Math.min(1, T));

    return new Vec2(
        a.x + DX * T,
        a.y + DY * T
    );
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//FindClosestPolygonPoint(point, polygon)
//@param point the point to test
//@param polygon the world-space polygon
//@return the closest point on the polygon and its distance
function FindClosestPolygonPoint(point, polygon)
{
    let closestPoint;
    let closestDistanceSquared = Infinity;
    let closestNormal;

    for (let i = 0; i < polygon.points.length; ++i)
    {
        const A = polygon.points[i];
        const B = polygon.points[(i + 1) % polygon.points.length];

        const POINT = ClosestPointOnSegment(point, A, B);

        const DX = POINT.x - point.x;
        const DY = POINT.y - point.y;

        const DISTANCE_SQUARED =
            DX * DX +
            DY * DY;

        if (DISTANCE_SQUARED < closestDistanceSquared)
        {
            closestDistanceSquared = DISTANCE_SQUARED;
            closestPoint = POINT;
            closestNormal = polygon.normals[i];
        }
    }

    return {
        point: closestPoint,
        distance: Math.sqrt(closestDistanceSquared),
        normal: closestNormal
    };
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//FindMinimumInsideDistance(point, polygon)
//@param point the point inside the polygon
//@param polygon the world-space polygon
//@return the closest boundary distance and normal
function FindMinimumInsideDistance(point, polygon)
{
    let minimumDistance = Infinity;
    let minimumNormal;

    for (let i = 0; i < polygon.points.length; ++i)
    {
        const EDGE_POINT = polygon.points[i];
        const NORMAL = polygon.normals[i];

        const DX = point.x - EDGE_POINT.x;
        const DY = point.y - EDGE_POINT.y;

        const DISTANCE =
            DX * NORMAL.x +
            DY * NORMAL.y;

        if (DISTANCE < minimumDistance)
        {
            minimumDistance = DISTANCE;
            minimumNormal = NORMAL;
        }
    }

    return {
        distance: minimumDistance,
        normal: minimumNormal
    };
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//FindPolygonPolygonCollision(aPoints, aNormals, bPoints, bNormals, aCentre, bCentre)
//@param aPoints A's world-space points
//@param aNormals A's world-space normals
//@param bPoints B's world-space points
//@param bNormals B's world-space normals
//@param aCentre A's world-space centre
//@param bCentre B's world-space centre
//@return a Collision object if there was a collision
function FindPolygonPolygonCollision(
    aPoints,
    aNormals,
    bPoints,
    bNormals,
    aCentre,
    bCentre)
{
    let minimumOverlap = Infinity;
    let collisionNormal;

    //Every edge normal from both polygons is a potential separating axis.
    const AXES = [
        ...aNormals,
        ...bNormals
    ];

    for (const AXIS of AXES)
    {
        const A_PROJECTION = ProjectPolygon(
            aPoints,
            AXIS
        );

        const B_PROJECTION = ProjectPolygon(
            bPoints,
            AXIS
        );

        const OVERLAP = GetProjectionOverlap(
            A_PROJECTION,
            B_PROJECTION
        );

        //A separating axis means the polygons do not collide.
        if (OVERLAP < -COLLISION_EPSILON)
        {
            return undefined;
        }

        //The axis with the smallest overlap is the minimum
        //translation direction.
        if (OVERLAP < minimumOverlap)
        {
            minimumOverlap = OVERLAP;

            collisionNormal = OrientNormal(
                AXIS,
                aCentre,
                bCentre
            );
        }
    }

    return new Collision(
        collisionNormal,
        minimumOverlap,
        new Vec2(
            (aCentre.x + bCentre.x) * 0.5,
            (aCentre.y + bCentre.y) * 0.5
        )
    );
}
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//FindPolygonBoundsCollision(points, bounds)
//@param points the world-space points of the solid polygon
//@param bounds the enclosing bounds polygon
//@return a Collision object if the polygon left the valid region
function FindPolygonBoundsCollision(points, bounds)
{
    let maximumPenetration = 0;
    let collisionNormal;
    let collisionPoint;

    for (let i = 0; i < bounds.points.length; ++i)
    {
        const EDGE_POINT = bounds.points[i];
        const NORMAL = bounds.normals[i];
        let minimumDistance = Infinity;
        let minimumPoint;

        for (const POINT of points)
        {
            const DISTANCE =
                (POINT.x - EDGE_POINT.x) * NORMAL.x +
                (POINT.y - EDGE_POINT.y) * NORMAL.y;

            if (DISTANCE < minimumDistance)
            {
                minimumDistance = DISTANCE;
                minimumPoint = POINT;
            }
        }

        const PENETRATION = -minimumDistance;

        if (PENETRATION > maximumPenetration)
        {
            maximumPenetration = PENETRATION;
            collisionNormal = NORMAL;
            collisionPoint = new Vec2(
                minimumPoint.x - NORMAL.x * minimumDistance,
                minimumPoint.y - NORMAL.y * minimumDistance
            );
        }
    }

    if (maximumPenetration <= COLLISION_EPSILON)
    {
        return undefined;
    }

    return new Collision(
        collisionNormal,
        maximumPenetration,
        collisionPoint
    );
}
///-----------------------------------------------------------------------///


//Collision class
export class Collision
{
    ///-----------------------------------------------------------------------///
    //constructor(normal, depth, point)
    //@param normal the collision normal from A's collider to B's collider
    //@param depth how much overlap there is
    //@param point the point of collision
    constructor(normal, depth, point)
    {
        this.normal = normal;
        this.depth = depth;
        this.point = point;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CheckCollision(a, b, aPos, bPos, aRot, bRot)
    //@param a the first collider
    //@param b the second collider
    //@param aPos a's position
    //@param bPos b's position
    //@param aRot a's rotation
    //@param bRot b's rotation
    //@return a Collision object if there was a collision
    static CheckCollision(a, b, aPos, bPos, aRot, bRot)
    {
        if (a instanceof CircleCollider)
        {
            if (b instanceof CircleCollider)
            {
                return Collision.CircleCircle(a, b, aPos, bPos);
            }
            else if (b instanceof PolygonCollider)
            {
                return Collision.CirclePolygon(a, b, aPos, bPos, bRot);
            }
        }
        else if (a instanceof PolygonCollider)
        {
            if (b instanceof CircleCollider)
            {
                return Collision.CirclePolygon(
                    b,
                    a,
                    bPos,
                    aPos,
                    aRot
                );
            }
            else if (b instanceof PolygonCollider)
            {
                return Collision.PolygonPolygon(
                    a,
                    b,
                    aPos,
                    bPos,
                    aRot,
                    bRot
                );
            }
        }

        return undefined;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CircleCircle(a, b, aPos, bPos)
    //@param a the first circle collider
    //@param b the second circle collider
    //@param aPos a's position
    //@param bPos b's position
    //@return a Collision object if there was a collision
    static CircleCircle(a, b, aPos, bPos)
    {
        const DELTA = bPos.Subtract(aPos);
        const DISTANCE = DELTA.Length();

        const OVERLAP =
            a.radius +
            b.radius -
            DISTANCE;

        if (OVERLAP < 0)
        {
            return undefined;
        }

        //Coincident circles do not have a meaningful direction.
        //Use an arbitrary stable direction rather than dividing by zero.
        const NORMAL = DISTANCE > COLLISION_EPSILON
            ? DELTA.DivideScalar(DISTANCE)
            : new Vec2(1, 0);

        const POINT = Vec2.Lerp(
            aPos,
            bPos,
            0.5
        );

        return new Collision(
            NORMAL,
            OVERLAP,
            POINT
        );
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CirclePolygon(a, b, aPos, bPos, bRot)
    //@param a the circle collider
    //@param b the polygon collider
    //@param aPos a's position
    //@param bPos b's position
    //@param bRot b's rotation
    //@return a Collision object if there was a collision
    static CirclePolygon(a, b, aPos, bPos, bRot)
    {
        const POLYGON = GetWorldPolygon(
            b,
            bPos,
            bRot
        );

        if (b.isBounds)
        {
            const CLOSEST = FindMinimumInsideDistance(aPos, POLYGON);

            //The signed distance also detects circles that have already
            //crossed a boundary, allowing them to be moved back inside.
            if (CLOSEST.distance > a.radius + COLLISION_EPSILON)
            {
                return undefined;
            }

            const NORMAL = CLOSEST.normal;
            const POINT = new Vec2(
                aPos.x + NORMAL.x * a.radius,
                aPos.y + NORMAL.y * a.radius
            );

            return new Collision(
                NORMAL,
                a.radius - CLOSEST.distance,
                POINT
            );
        }

        const INSIDE = PointInPolygon(
            aPos,
            POLYGON
        );

        const CLOSEST = INSIDE
            ? FindMinimumInsideDistance(aPos, POLYGON)
            : FindClosestPolygonPoint(aPos, POLYGON);

        const DISTANCE = CLOSEST.distance;

        //A positive-area polygon is a solid.
        //
        //If the circle centre is inside it, the circle is already
        //penetrating the polygon even if the circle itself is tiny.
        if (INSIDE)
        {
            const NORMAL = CLOSEST.normal;

            const POINT = new Vec2(
                aPos.x + NORMAL.x * a.radius,
                aPos.y + NORMAL.y * a.radius
            );

            return new Collision(
                NORMAL,
                a.radius + DISTANCE,
                POINT
            );
        }

        //The circle is outside the solid polygon. Collision occurs
        //only when the circle reaches its boundary.
        if (DISTANCE > a.radius + COLLISION_EPSILON)
        {
            return undefined;
        }

        let NORMAL;

        const DX = CLOSEST.point.x - aPos.x;
        const DY = CLOSEST.point.y - aPos.y;

        if (DISTANCE > COLLISION_EPSILON)
        {
            NORMAL = new Vec2(
                DX / DISTANCE,
                DY / DISTANCE
            );
        }
        else
        {
            NORMAL = CLOSEST.normal;
        }

        const POINT = new Vec2(
            aPos.x + NORMAL.x * a.radius,
            aPos.y + NORMAL.y * a.radius
        );

        return new Collision(
            NORMAL,
            a.radius - DISTANCE,
            POINT
        );
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //PolygonPolygon(a, b, aPos, bPos, aRot, bRot)
    //@param a the first polygon collider
    //@param b the second polygon collider
    //@param aPos a's position
    //@param bPos b's position
    //@param aRot a's rotation
    //@param bRot b's rotation
    //@return a Collision object if there was a collision
    static PolygonPolygon(a, b, aPos, bPos, aRot, bRot)
    {
        const A = GetWorldPolygon(
            a,
            aPos,
            aRot
        );

        const B = GetWorldPolygon(
            b,
            bPos,
            bRot
        );

        //A positive polygon against a negative polygon is a solid
        //object against an enclosing boundary.
        if (!a.isBounds && b.isBounds)
        {
            return FindPolygonBoundsCollision(
                A.points,
                B
            );
        }

        //Reverse the order and invert the resulting normal.
        //
        //This lets the same bounds algorithm handle both
        //positive-vs-negative and negative-vs-positive cases.
        if (a.isBounds && !b.isBounds)
        {
            const COLLISION = FindPolygonBoundsCollision(
                B.points,
                A
            );

            if (COLLISION === undefined)
            {
                return undefined;
            }

            COLLISION.normal = new Vec2(
                -COLLISION.normal.x,
                -COLLISION.normal.y
            );

            return COLLISION;
        }

        //Two enclosing boundaries do not represent two solid bodies,
        //so there is no useful collision between them.
        if (a.isBounds && b.isBounds)
        {
            return undefined;
        }

        const A_CENTRE = GetWorldCentroid(
            a,
            aPos,
            aRot
        );

        const B_CENTRE = GetWorldCentroid(
            b,
            bPos,
            bRot
        );

        return FindPolygonPolygonCollision(
            A.points,
            A.normals,
            B.points,
            B.normals,
            A_CENTRE,
            B_CENTRE
        );
    }
    ///-----------------------------------------------------------------------///
}
//End of collision class
///-----------------------------------------------------------------------///