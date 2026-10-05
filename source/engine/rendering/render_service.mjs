///-----------------------------------------------------------------------///
//render_service.mjs
//Engine facing abstraction layer over the backend
///-----------------------------------------------------------------------///

///-----------------------------------------------------------------------///
//RenderService class
export class RenderService
{
    #backend;

    ///-----------------------------------------------------------------------///
    //constructor(canvas, backend)
    //@param canvas the canvas to bind the render service to
    //@param backend the render backend to use
    constructor(canvas, backend)
    {
        this.canvas = canvas;
        this.#backend = backend;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateShader(type, source)
    //@param type the WebGL shader type
    //@param source the shader source
    //@return the compiled WebGL shader handle
    CreateShader(type, source)
    {
        return this.#backend.CreateShader(type, source);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateProgram(vertexSource, fragmentSource)
    //@param vertexSource the vertex shader source
    //@param fragmentSource the fragment shader source
    //@return the linked WebGL program handle
    CreateProgram(vertexSource, fragmentSource)
    {
        return this.#backend.CreateProgram(vertexSource, fragmentSource);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateMesh(vertices, options)
    //@param vertices interleaved vertex data
    //@param options mesh layout and primitive mode
    //@return a mesh descriptor containing its buffer and vertex layout
    CreateMesh(vertices, options)
    {
        return this.#backend.CreateMesh(vertices, options);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateTexture(source, options)
    //@param source an image, canvas, video, or ImageData source
    //@param options texture upload and sampling options
    //@return the WebGL texture handle
    CreateTexture(source, options)
    {
        return this.#backend.CreateTexture(source, options);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SetProgram(program)
    //@param program the WebGL program to use
    SetProgram(program)
    {
        this.#backend.SetProgram(program);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SetUniform(name, value)
    //@param name the uniform name
    //@param value a number, boolean, vector, or matrix value
    //@return true if the uniform exists and was set, otherwise false
    SetUniform(name, value)
    {
        return this.#backend.SetUniform(name, value);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //BindTexture(name, texture, unit)
    //@param name the sampler uniform name
    //@param texture the WebGL texture
    //@param unit the texture unit index
    //@return true if the sampler exists and was bound, otherwise false
    BindTexture(name, texture, unit = 0)
    {
        return this.#backend.BindTexture(name, texture, unit);
    }
    ///-----------------------------------------------------------------------///



    ///-----------------------------------------------------------------------///
    //DrawMesh(mesh)
    //@param mesh a vertex-only mesh created by CreateMesh
    DrawMesh(mesh)
    {
        this.#backend.DrawMesh(mesh);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ClearScreen(clearColour)
    //@param clearColour RGBA clear colour
    ClearScreen(clearColour)
    {
        this.#backend.ClearScreen(clearColour.ToArray());
    }
    ///-----------------------------------------------------------------------///
}
//End of RenderService class
///-----------------------------------------------------------------------///