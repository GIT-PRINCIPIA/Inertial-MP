///-----------------------------------------------------------------------///
//window.mjs
//Things like window size, etc
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Canvas class
export class Canvas
{
    ///-----------------------------------------------------------------------///
    //constructor(html)
    //@param html the html canvas element
    constructor(html) 
    {
        this.html = html;
        this.gl = html.getContext("webgl2");
        if (!this.gl)
        {
            throw new Error("WebGL 2 is not available for this canvas.");
        }
        this.dpr = window.devicePixelRatio || 1;
        this.Resize();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Resize()
    Resize() 
    {
        const cssW = this.html.clientWidth;
        const cssH = this.html.clientHeight;

        if (this.html.width !== cssW || this.html.height !== cssH) 
        {
            this.html.width = cssW;
            this.html.height = cssH;
        }

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

        // expose CSS dims for camera/world mapping
        this.width = cssW;
        this.height = cssH;
    }
    ///-----------------------------------------------------------------------///
}
//End of Window class
///-----------------------------------------------------------------------///