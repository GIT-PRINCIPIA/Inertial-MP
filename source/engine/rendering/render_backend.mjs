///-----------------------------------------------------------------------///
//render_backend.mjs
//The rendering backend - swappable! (Maybe)
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//WebGLbackend class
export class WebGLbackend
{
    #defaultProgram;
    #currentProgram = null;

    ///-----------------------------------------------------------------------///
    //constructor(canvas)
    //@param canvas the Canvas to render to
    constructor(canvas)
    {
        this.canvas = canvas;
        this.gl = canvas.gl;
        if (!this.gl)
        {
            throw new Error("WebGLbackend requires a Canvas with a WebGL2 context.");
        }
    }
    ///-----------------------------------------------------------------------///




    ///-----------------------------------------------------------------------///
    //CreateShader(type, source)
    //@param type the WebGL shader type
    //@param source the shader source
    //@return the handle
    CreateShader(type, source)
    {
        const shader = this.gl.createShader(type);
        if (!shader)
        {
            throw new Error("Unable to create WebGL shader.");
        }
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            const message = this.gl.getShaderInfoLog(shader) || "Unknown shader compile error.";
            this.gl.deleteShader(shader);
            throw new Error(message);
        }
        return shader;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateProgram(vertexSource, fragmentSource)
    //@param vertexSource the vertex shader source
    //@param fragmentSource the fragment shader source
    //@return the handle
    CreateProgram(vertexSource, fragmentSource)
    {
        const vertexShader = this.CreateShader(this.gl.VERTEX_SHADER, vertexSource);
        let fragmentShader;
        let program;
        try
        {
            fragmentShader = this.CreateShader(this.gl.FRAGMENT_SHADER, fragmentSource);
            program = this.gl.createProgram();
            if (!program)
            {
                throw new Error("Unable to create WebGL program.");
            }
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);
            if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
            {
                throw new Error(this.gl.getProgramInfoLog(program) || "Unknown program link error.");
            }
            return program;
        }
        catch (error)
        {
            if (program)
            {
                this.gl.deleteProgram(program);
            }
            throw error;
        }
        finally
        {
            this.gl.deleteShader(vertexShader);
            if (fragmentShader)
            {
                this.gl.deleteShader(fragmentShader);
            }
        }
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateMesh(vertices, options)
    //@param vertices interleaved vertex data
    //@param options mesh layout and primitive mode
    //@return a mesh descriptor containing its buffer and vertex layout
    CreateMesh(vertices, options = {})
    {
        const data = vertices instanceof Float32Array ? vertices : new Float32Array(vertices);
        const componentsPerVertex = options.componentsPerVertex || 2;
        if (data.length === 0 || data.length % componentsPerVertex !== 0)
        {
            throw new Error("Vertex data must contain complete, non-empty vertices.");
        }

        const buffer = this.gl.createBuffer();
        if (!buffer)
        {
            throw new Error("Unable to create WebGL vertex buffer.");
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, options.usage || this.gl.STATIC_DRAW);
        return {
            buffer,
            vertexCount: data.length / componentsPerVertex,
            componentsPerVertex,
            attributes: options.attributes || [{ name: "vertex", size: 2, offset: 0 }],
            mode: options.mode || this.gl.TRIANGLES
        };
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SetProgram(program)
    //@param program the WebGL program to use
    SetProgram(program)
    {
        this.gl.useProgram(program);
        this.#currentProgram = program;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //SetUniform(name, value)
    //@param name the uniform name
    //@param value a number, boolean, vector, or matrix value
    //@return true if the uniform exists and was set, otherwise false
    SetUniform(name, value)
    {
        if (!this.#currentProgram)
        {
            throw new Error("Set a WebGL program before setting uniforms.");
        }
        const location = this.gl.getUniformLocation(this.#currentProgram, name);
        if (location === null)
        {
            return false;
        }
        if (typeof value === "boolean")
        {
            this.gl.uniform1i(location, value ? 1 : 0);
            return true;
        }
        if (typeof value === "number")
        {
            this.gl.uniform1f(location, value);
            return true;
        }

        const values = value instanceof Float32Array ? value : new Float32Array(value);
        switch (values.length)
        {
            case 1: this.gl.uniform1fv(location, values); break;
            case 2: this.gl.uniform2fv(location, values); break;
            case 3: this.gl.uniform3fv(location, values); break;
            case 4: this.gl.uniform4fv(location, values); break;
            case 9: this.gl.uniformMatrix3fv(location, false, values); break;
            case 16: this.gl.uniformMatrix4fv(location, false, values); break;
            default: throw new Error(`Unsupported uniform value size for '${name}'.`);
        }
        return true;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //CreateTexture(source, options)
    //@param source an image, canvas, video, or ImageData source
    //@param options texture upload and sampling options
    //@return the WebGL texture handle
    CreateTexture(source, options = {})
    {
        const texture = this.gl.createTexture();
        if (!texture)
        {
            throw new Error("Unable to create WebGL texture.");
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, options.flipY === undefined ? true : options.flipY);
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            options.internalFormat || this.gl.RGBA,
            options.format || this.gl.RGBA,
            options.type || this.gl.UNSIGNED_BYTE,
            source
        );
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, options.minFilter || this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, options.magFilter || this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, options.wrapS || this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, options.wrapT || this.gl.CLAMP_TO_EDGE);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        return texture;
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
        if (!this.#currentProgram)
        {
            throw new Error("Set a WebGL program before binding sampler uniforms.");
        }
        const location = this.gl.getUniformLocation(this.#currentProgram, name);
        if (location === null)
        {
            return false;
        }
        this.gl.activeTexture(this.gl.TEXTURE0 + unit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.uniform1i(location, unit);
        return true;
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //DrawMesh(mesh)
    //@param mesh a vertex-only mesh created by CreateMesh
    DrawMesh(mesh)
    {
        const gl = this.gl;
        if (!this.#currentProgram)
        {
            throw new Error("Set a WebGL program before drawing a mesh.");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
        const stride = mesh.componentsPerVertex * Float32Array.BYTES_PER_ELEMENT;
        for (const attribute of mesh.attributes)
        {
            const location = gl.getAttribLocation(this.#currentProgram, attribute.name);
            if (location < 0)
            {
                throw new Error(`Program has no active attribute '${attribute.name}'.`);
            }
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(
                location,
                attribute.size,
                gl.FLOAT,
                false,
                stride,
                attribute.offset * Float32Array.BYTES_PER_ELEMENT
            );
        }
        gl.drawArrays(mesh.mode, 0, mesh.vertexCount);
    }
    ///-----------------------------------------------------------------------///


    ///-----------------------------------------------------------------------///
    //ClearScreen(clearColour)
    //@param clearColour RGBA clear colour
    ClearScreen(clearColour = [0, 0, 0, 1])
    {
        const gl = this.gl;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(clearColour[0], clearColour[1], clearColour[2], clearColour[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    ///-----------------------------------------------------------------------///


}
//End of WebGLbackend class
///-----------------------------------------------------------------------///