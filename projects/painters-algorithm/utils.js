function meanZ(face,index){
    // find the mean of all Z-coordinates of a face
    sumZ = 0
    for(vert of face){
        sumZ += vert[index]
    }
    return sumZ/face.length
}

function matrixMultiplication(A,B){
    if(A[0].length != B.length){throw new Error("Invalid dimensions for matrices :(")}
    /*
    Stolen from the second answer here :
    https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    Actual source is not accessible anymore.
    */
    var result = [];
    for (var i = 0; i < A.length; i++) {
        result[i] = [];
        for (var j = 0; j < B[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < A[0].length; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function perspectiveMultiplication(face){
    const FOV = Camera.FOV
    const scaleFactor = 500
    const S = 1 / Math.tan(FOV/2)
    const near = 0
    const far = 1000
    const PerspectiveProjectionMatrix = [
        [S, 0,  0,                      0   ],
        [0, S,  0,                      0   ],
        [0, 0,  far/(near-far),         -1  ],
        [0, 0,  far*near/(near-far),    0   ]
    ]
    face = matrixMultiplication(face,PerspectiveProjectionMatrix)
    // flipping Y here
    for(let i=0 ;i<face.length;i++){

        face[i][0] = (face[i][0])*scaleFactor/face[i][3] + canvas.width/2

        face[i][1] = (face[i][1])*-scaleFactor/face[i][3] + canvas.height/2

        face[i][2] = (face[i][2])*scaleFactor/face[i][3]

        face[i][3] /= face[i][3]
    }
    return face
}



class FaceList {
    constructor(bodyList){
        // returns an array of all faces in the scene
        // [ face ] -> [3 * vertices , colour] -> [3 * [x,y,z,w] , colour]

        this.faces = []
        for(let body of bodyList){
            //for(let i=0;i<body.faces.length;i++){
                this.faces.push(...(body.faces))
                //coloursToDraw.push(body.colours[i])
            //}
        }
    }
}

function rotateZ(face,angle){
        RotZ = [
            [Math.cos(angle),   Math.sin(angle),    0,  0],
            [-Math.sin(angle),  Math.cos(angle),    0,  0],
            [0,                 0,                  1,  0],
            [0,                 0,                  0,  1]
        ]
        return matrixMultiplication(face,RotZ)
    }

function rotateY(face,angle){
        RotY = [
            [Math.cos(angle),   0,  Math.sin(angle),    0],
            [0,                 1,  0               ,   0],
            [-Math.sin(angle),  0,  Math.cos(angle),    0],
            [0,                 0,  0,                  1]
        ]
        return matrixMultiplication(face,RotY)
    }

function rotateX(face,angle){
        RotX = [
            [1,     0,                  0,                  0],
            [0,     Math.cos(angle),    -Math.sin(angle),   0],
            [0,     Math.sin(angle),    Math.cos(angle),    0],
            [0,     0,                  0,                  1]
        ]
        return matrixMultiplication(face,RotX)
    }

function rotateXYZ(face,x,y,z){
    return rotateX(rotateY(rotateZ(face,z),y),x) 
}

function translate(face,x,y,z=0){
    Trans = [
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [x,y,z,1]
    ]
    return matrixMultiplication(face,Trans)
}

function randomHSLString(){
    return `HSL(${Math.floor(Math.random()*360)},100%,${Math.random()*40 + 30}%)`
}

function normalColour(face){
    norm = normal(face)

    colour = [Math.floor(180*(1+norm[0])) ,40 + 30*(1+norm[1]),10+90*(1+norm[2])]
    return `HSL(${360-colour[0]},${colour[1]}%,${colour[2]}%)`
}

function normal(face){
    A = face[0]
    B = face[1]
    C = face[2]
    BA = [ A[0]-B[0], A[1]-B[1], A[2]-B[2]]
    CA = [ A[0]-C[0], A[1]-C[1], A[2]-C[2]]

    BAxCA = [   BA[1]*CA[2] - BA[2]*CA[1],
                BA[2]*CA[0] - BA[0]*CA[2],
                BA[0]*CA[1] - BA[1]*CA[0]   ]

    magnitude = ( BAxCA[0]**2 + BAxCA[1]**2 + BAxCA[2]**2 )**0.5
    
    // if(!magnitude){throw new Error("Points in face are collinear")}
    // not throwing the error as the UVSphere isnt 100% correct right now
    if(!magnitude){magnitude = 1}

    // values are in the range [-1,1]
    return [    BAxCA[0]/magnitude,
                BAxCA[1]/magnitude,
                BAxCA[2]/magnitude
            ]


}
