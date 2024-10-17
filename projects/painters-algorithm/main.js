// INITIALISING
const canvas = document.getElementById("canvas")
canvas.height = document.body.offsetHeight * 0.95
canvas.width = document.body.offsetWidth

const ctx = canvas.getContext("2d");
const inst = document.getElementById("inst")

let shapeList = []
shapeList.push(new UVSphere(250))
shapeList.push(new UVSphere(70,Math.PI/6))
shapeList.push(new UVSphere(40,Math.PI/4))
shapeList.push(new Cuboid(150,1000,150))
shapeList.push(new Cuboid(100,200,150))
shapeList.push(new Cuboid(100,200,150))
shapeList.push(new Cuboid(200,100,150))
shapeList.push(new Cuboid(100,200,450))
shapeList.push(new Plane(5000,5000,250))
shapeList.push(new Plane(5000,5000,250))
shapeList.push(new Cow(2))
shapeList.push(new Torus(150,2))

const Camera = {
    LOCATION : {X:0,Y:0,Z:0},
    ANGLE : {X:0,Y:0,Z:0},
    FOV: Math.PI/2.5,
    movementStep : 30,
    angleStep : 0.01
}

function moveAroundCamera(face){
    // How much a body should be rotated + translated when moving the camera
    return rotateXYZ(translate(face,Camera.LOCATION.X,Camera.LOCATION.Y,-Camera.LOCATION.Z),Camera.ANGLE.X,Camera.ANGLE.Y,Camera.ANGLE.Z)
}


function step(time){
    // this clears the screen
    canvas.width = canvas.width

    //deepcopying
    shapeCopy =  JSON.parse(JSON.stringify(shapeList));

    // super ugly, will change the structure later
    // This part is transformations relating to where I want the shapes to be
    // Transforming each shape list and returning it in the same format :
    // faces = [ transformed(faces[0]) , faces[1]]
    shapeCopy[0].faces = shapeCopy[0].faces.map((face) => [translate(rotateX(face[0],time/500),1100,-1000,4000),face[1]])
    shapeCopy[1].faces = shapeCopy[1].faces.map((face) => [translate(rotateX(face[0],time/500),1100+250*Math.sin(time/500),-1000+300*Math.sin(time/1000),4000+400*Math.cos(time/500)),face[1]])
    shapeCopy[2].faces = shapeCopy[2].faces.map((face) => [translate(rotateX(face[0],time/500),1100+250*Math.sin(2+time/500),-1000+200*Math.sin(1+time/1000),4000+400*Math.cos(2+time/500)),face[1]])
    shapeCopy[3].faces = shapeCopy[3].faces.map((face) => [translate(rotateY(face[0],time/1000),-1000,-300,2000),face[1]])

    shapeCopy[4].faces = shapeCopy[4].faces.map((face) => [translate(rotateX(face[0],time/1000),0,-300,1000),face[1]])
    shapeCopy[5].faces = shapeCopy[5].faces.map((face) => [translate(rotateY(face[0],time/500),0,-300,2000),face[1]])
    shapeCopy[6].faces = shapeCopy[6].faces.map((face) => [translate(rotateZ(face[0],time/1000),0,-300,3000),face[1]])

    shapeCopy[7].faces = shapeCopy[7].faces.map((face) => [translate(rotateXYZ(face[0],time/2000,time/1000,1),0,50,4500),face[1]])

    shapeCopy[8].faces = shapeCopy[8].faces.map((face) => [translate(rotateX(face[0],Math.PI/2),-2500,300,5000),face[1]])
    shapeCopy[9].faces = shapeCopy[9].faces.map((face) => [translate(face[0],-2500,-4700,5000),face[1]])
    shapeCopy[10].faces = shapeCopy[10].faces.map((face) => [translate(rotateXYZ(face[0],0,-time/1500+Math.PI,0),1500 +400*Math.sin(time/1500),100+20*Math.sin(time/100),4000+400*Math.cos(time/1500)),face[1]])
    shapeCopy[11].faces = shapeCopy[11].faces.map((face) => [translate(rotateXYZ(face[0],time/500,time/500,0),0,-200,4000),face[1]])
    
    // This part is transformations from camera movement
    for(shape of shapeCopy){
        shape.faces = shape.faces.map((face) => [moveAroundCamera(face[0]) , face[1]])
    }

    // compiling faces
    let faceList = new FaceList(shapeCopy)
    // and culling faces that arent needed
    faceList.faces = faceList.faces.filter(
            function(face){
                            for(vertex of face[0]){
                                // if atleast one vertex is behind us (Z < 0),
                                // dont render the face
                                if(vertex[2]<0){return false} 
                            }
                            return true
                        }
                    )

    // finding mean z-values for each face
    zMeans = []
    for(face of faceList.faces){
        current_zsum = 0
        faceVertices = face[0]
        for(vertex of faceVertices){
            current_zsum += vertex[2]
        }
        zMeans.push(current_zsum/faceVertices.length)
    }
    
    // sorting faceList by the zMean values
    faceList.faces.sort(function(a,b) { return zMeans[faceList.faces.indexOf(b)] - zMeans[faceList.faces.indexOf(a)] })
    


    
    // drawing faces
    for(face of faceList.faces){
        ctx.beginPath()
        faceVertices = perspectiveMultiplication(face[0])
        for(vertex of faceVertices){
            ctx.lineTo(vertex[0],vertex[1]) // chopping off Z to project
        }
        // colour from object
        ctx.fillStyle = face[1]
        // colour from Normal
        // ctx.fillStyle = normalColour(face[0])
        ctx.stroke()
        ctx.fill()
    }
    requestAnimationFrame(step)

}
requestAnimationFrame(step)

document.addEventListener("keydown",function(event){
    fov =  Math.round(Camera.FOV * 180 / Math.PI * 100) / 100 ;
    switch(event.key){
        case "w":   Camera.LOCATION.Z += Camera.movementStep * Math.cos(Camera.ANGLE.Y) * Math.cos(Camera.ANGLE.X);
                    Camera.LOCATION.X -= Camera.movementStep * Math.sin(Camera.ANGLE.Y) * Math.cos(Camera.ANGLE.X);
                    Camera.LOCATION.Y += Camera.movementStep * Math.sin(Camera.ANGLE.X)
                    break;     
        case "s":   Camera.LOCATION.Z -= Camera.movementStep * Math.cos(Camera.ANGLE.Y) * Math.cos(Camera.ANGLE.X);
                    Camera.LOCATION.X += Camera.movementStep * Math.sin(Camera.ANGLE.Y) * Math.cos(Camera.ANGLE.X);
                    Camera.LOCATION.Y -= Camera.movementStep * Math.sin(Camera.ANGLE.X)
                    break;
        case "a":   Camera.LOCATION.Z += Camera.movementStep * Math.cos(Math.PI/2 + Camera.ANGLE.Y);
                    Camera.LOCATION.X -= Camera.movementStep * Math.sin(Math.PI/2 + Camera.ANGLE.Y);
                    break;
        case "d":   Camera.LOCATION.Z -= Camera.movementStep * Math.cos(Math.PI/2 + Camera.ANGLE.Y);
                    Camera.LOCATION.X += Camera.movementStep * Math.sin(Math.PI/2 + Camera.ANGLE.Y);
                    break;
        case "r":   Camera.LOCATION.Y += Camera.movementStep ; break;
        case "f":   Camera.LOCATION.Y -= Camera.movementStep ; break;

        case "q":   Camera.ANGLE.Y = (Camera.ANGLE.Y + Camera.angleStep)%(2*Math.PI); break;
        case "e":   Camera.ANGLE.Y = (Camera.ANGLE.Y - Camera.angleStep)%(2*Math.PI); break;

        case "t":   Camera.FOV += 0.01; inst.textContent = `WS - AD - RF to move | QE to turn head | TG to change FOV (${fov} deg)`; break;
        case "g":   Camera.FOV -= 0.01; inst.textContent = `WS - AD - RF to move | QE to turn head | TG to change FOV (${fov} deg)`; break;
          
    }
})