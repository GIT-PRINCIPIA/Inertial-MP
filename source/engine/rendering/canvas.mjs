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
        this.ctx = html.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;
        this.Resize();
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //Resize()
    Resize() 
    {
        const cssW = this.html.clientWidth || this.html.offsetWidth || 300;
        const cssH = this.html.clientHeight || this.html.offsetHeight || 150;

        const pixelW = Math.max(1, Math.floor(cssW * this.dpr));
        const pixelH = Math.max(1, Math.floor(cssH * this.dpr));

        if (this.html.width !== pixelW || this.html.height !== pixelH) {
            this.html.width = pixelW;
            this.html.height = pixelH;
        }

        // make the ctx use CSS pixels as coordinates
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);

        // expose CSS dims for camera/world mapping
        this.width = cssW;
        this.height = cssH;
    }
    ///-----------------------------------------------------------------------///
}
//End of Window class
///-----------------------------------------------------------------------///