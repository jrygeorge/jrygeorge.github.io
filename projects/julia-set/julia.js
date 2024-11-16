const canvas = document.getElementById("julia");
const gl = canvas.getContext("webgl2");

canvas.height = document.body.offsetHeight - 60
canvas.width = document.body.offsetWidth

gl.viewport(0, 0, canvas.width, canvas.height);

let imSlider = document.getElementById("imaginary");
let reSlider = document.getElementById("real");
let complexNumber = document.getElementById("complex");


function updateComplexNumber(){
    let operator = "+"
    if(imSlider.value<0){operator="-"}
    complexNumber.innerText = `Drag to move and Scroll to zoom ✧ C = ${reSlider.value/100000} ${operator} ${Math.abs(imSlider.value)/100000}i`
}

const Controller =
        {   X:0,
            Y:0,
            scaleX : 1.0,
            scaleY : 1.0 * (canvas.height/canvas.width),
            A:reSlider.value/100000,
            B:imSlider.value/100000,
            isPanning:false
        }

imSlider.oninput = function() {
    updateComplexNumber()
    Controller.B = this.value/100000
  }
  
  reSlider.oninput = function() {
    updateComplexNumber()
    Controller.A = this.value/100000
    }

vertexShaderSource = 
    `#version 300 es
    precision mediump float;

    in vec2 vertPosition;
    out vec2 fragPosition;

    uniform vec3 vertColour;
    
    void main()
    {
        fragPosition = vertPosition;
        gl_Position = vec4( vertPosition, 0, 1.0 );
    }
`

fragmentShaderSource = 
    `#version 300 es
    precision mediump float;

    in vec2 fragPosition;
    out vec4 outColour;

    uniform vec2 u_scale;
    uniform vec2 u_origin;
    uniform vec2 u_cValues;

    void main()
    {
        float maxIter = 175.0;

        float posX = u_scale.x * fragPosition.x * 2.0 + u_origin.x;
        float posY = u_scale.y * fragPosition.y * 2.0 + u_origin.y;

        float zX = posX;
        float zY = posY;
        float n = 0.0;

        while (n < maxIter) {
            float z2Real = zX * zX - zY * zY + u_cValues.x;
            float z2Img = 2.0 * zX * zY + u_cValues.y;

            zX = z2Real;
            zY = z2Img;

            // Escape condition
            if (zX * zX + zY * zY > 20.0) {
                break;
            }
            
            n++;
    }
        
        // Converting HSL to RGB
        // https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae
        // n will be scaled and used as H
        
        // This just cycles the colours around
        float colourOffset = 250.0;

        // This says how many times you'll go through
        // the whole spectrum in a certain length
        // increasing this a lot makes it go crazy obviously
        float colourStacking = 2.0;

        float H = mod(colourStacking*n/maxIter * 360.0 + colourOffset,360.0);
        float S = 0.8;// -n/maxIter;
        float L = 0.5;//-n/maxIter;

        float C = (1.0 - abs(2.0*L -1.0)) * S;
        float Hprime = H / 60.0;
        float X = C * (1.0 - abs(mod(Hprime ,2.0)-1.0));

        float Rone = 0.0;
        float Gone = 0.0;
        float Bone = 0.0;

        if((0.0<=Hprime) && (Hprime<1.0))
        {
        Rone = C;
        Gone = X;
        }
        else if((1.0<=Hprime) && (Hprime<2.0))
        {
        Rone = X;
        Gone = C;
        }
        else if((2.0<=Hprime) && (Hprime<3.0))
        {
        Gone = C;
        Bone = X;
        }
        else if((3.0<=Hprime) && (Hprime<4.0))
        {
        Gone = X;
        Bone = C;
        }
        else if((4.0<=Hprime) && (Hprime<5.0))
        {
        Rone = X;
        Bone = C;
        }
        else if((5.0<=Hprime) && (Hprime<6.0))
        {
        Rone = C;
        Bone = X;
        }

        float m = L - C/2.0;

        vec3 RGB = vec3(Rone + m, Gone+m, Bone+m);


        outColour = vec4( RGB ,1.0);
        if(n==maxIter){
        outColour = vec4( 0,0,0 ,1.0);
        }
    }
`

function clearAll(R,G,B,A){
    gl.clearColor(R,G,B,A)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

function createShaderFromSource(gl,type,source){
    let shader = gl.createShader(type)
    gl.shaderSource(shader,source)
    gl.compileShader(shader)

    if(gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        return shader
    }
    console.log(gl.getShaderInfoLog(shader))
}

function createGLProgram(gl,shaderList,validate){
    let program = gl.createProgram()

    for(let shader of shaderList){
        gl.attachShader(program,shader)
    }

    gl.linkProgram(program)
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.log(gl.getProgramInfoLog(program))
        gl.deleteProgram(program);
        return ;
    }
    if(validate){
        gl.validateProgram(program)
        if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
            console.log(gl.getProgramInfoLog(program))
            gl.deleteProgram(program);
            return ;
        }
    }
    return program
}

vertexShader = createShaderFromSource(gl,gl.VERTEX_SHADER,vertexShaderSource)
fragmentShader = createShaderFromSource(gl,gl.FRAGMENT_SHADER,fragmentShaderSource)

program = createGLProgram(gl,[vertexShader,fragmentShader],false)

let triangleVertices =
[ // X, Y
    -1.0,   -1.0,
    1.0 ,   1.0,
    -1.0,   1.0,

    1.0 ,   1.0,
    -1.0,   -1.0,
    1.0 ,   -1.0
]
    
let vao = gl.createVertexArray()
gl.bindVertexArray(vao)
// We need to make a buffer, the GPU reads from it
let vertexBufferObject = gl.createBuffer()
// calling bind here, means the next statement will be putting data to where we've just bound
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)

let positionAttribLocation = gl.getAttribLocation(program, "vertPosition")
let scaleLocation = gl.getUniformLocation(program,"u_scale")
let originLocation = gl.getUniformLocation(program,"u_origin")
let cLocation = gl.getUniformLocation(program,"u_cValues")

gl.enableVertexAttribArray(positionAttribLocation)
gl.vertexAttribPointer(
    positionAttribLocation,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT, // one vertex size
    0 )// where we are starting from in each vertex, for points we start at 0 (its 0,1)

updateComplexNumber()
gl.useProgram(program)

function draw(step){
    
    clearAll(0.5,0.0,0.9,1.0)

    gl.bindVertexArray(vao)
    gl.uniform2f(scaleLocation,Controller.scaleX,Controller.scaleY)
    gl.uniform2f(originLocation,Controller.X,Controller.Y)
    gl.uniform2f(cLocation,Controller.A,Controller.B)


    gl.drawArrays(gl.TRIANGLES, 0, 6)

    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)

document.addEventListener("keydown",function(event){
    switch(event.key){
        case "r": Controller.scaleX /= 1.1; Controller.scaleY /= 1.1; break;
        case "f": Controller.scaleX *= 1.1; Controller.scaleY *= 1.1; break;

        case "a": Controller.X -= Controller.scaleX/20;break;
        case "d": Controller.X += Controller.scaleX/20;break;
        case "w": Controller.Y += Controller.scaleY/20;break;
        case "s": Controller.Y -= Controller.scaleY/20;break;
    }
})

document.addEventListener("wheel",function(event){
    if (event.deltaY<0)
        {
            Controller.scaleX = Controller.scaleX/1.1;
            Controller.scaleY = Controller.scaleY/1.1;
        }
    else
        {   
            Controller.scaleX = Math.min(Controller.scaleX*1.1,1.6);
            Controller.scaleY = Math.min(Controller.scaleY*1.1,1.6 * (canvas.height/canvas.width));
        }
})

canvas.addEventListener("mousedown",function(event){
    Controller.isPanning = true
})

canvas.addEventListener("mouseup",function(event){
    Controller.isPanning = false
})

canvas.addEventListener("mousemove",function(event){
    if(Controller.isPanning){
        Controller.X -= event.movementX*Controller.scaleX/180 * (canvas.height/canvas.width);
        Controller.Y += event.movementY*Controller.scaleY/180;
    }
})


