///-----------------------------------------------------------------------///
//render_backend.mjs
//The rendering backend - swappable! (Maybe)
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//WebGLbackend class
export class WebGLbackend
{
    ///-----------------------------------------------------------------------///
    //constructor(canvas)
    //@param canvas the Canvas to render to
    constructor(canvas)
    {
        this.canvas = canvas;
    }
    ///-----------------------------------------------------------------------///




    ///-----------------------------------------------------------------------///
    //DrawVertices(vertices)
    //@param vertices the vertices that make up the mesh to draw
    DrawVertices(vertices)
    {
        let ctx = this.canvas.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        // 1. Move to the first vertex
        ctx.moveTo(vertices[0], vertices[1]);

        // 2. Loop through the remaining vertices and draw lines between them
        for (let i = 2; i < vertices.length; i+= 2) 
        {
            ctx.lineTo(vertices[i], vertices[i + 1]);
        }

        // 3. Connect the last vertex back to the first one
        ctx.closePath();

        // 4. Render the outline and/or fill the shape
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "rgba(0, 150, 255, 0.5)";
        ctx.fill();
    }
    ///-----------------------------------------------------------------------///
}
//End of WebGLbackend class
///-----------------------------------------------------------------------///