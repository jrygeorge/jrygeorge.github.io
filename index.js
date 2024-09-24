const canvas = document.getElementById("logo_canvas");
const ctx = canvas.getContext("2d");

a = window.innerHeight;
b = window.innerWidth;
headerHeight = 100
if(a>b){headerHeight = Math.max(a,b)/7;}else{headerHeight = Math.max(a,b)/15;}

ctx.canvas.width  = headerHeight
ctx.canvas.height = headerHeight

document.getElementById("bar").style.height = headerHeight
heads  = document.getElementsByClassName("header")
heads[0].style.fontSize = headerHeight/5;
heads[1].style.fontSize = headerHeight/7;

offset = headerHeight / 2;
scaleFactor = headerHeight/10
lineWidth = 1

ball = {
    points : [
                [0,0,4], //+4 (TOP)
                [0,2.646,3],[-2.2915,1.323,3],[-2.2915,-1.323,3],[0,-2.646,3],[2.2915,-1.323,3],[2.2915,1.323,3], //+3
                [-1.732,2.99991,2],[-3.464,0,2],[-1.732,-2.99991,2],[1.732,-2.99991,2],[3.464,0,2],[1.732,2.99991,2], //+2
                [0,3.837,1],[-3.35412,1.9365,1],[-3.35412,-1.9365,1],[0,-3.837,1],[3.35412,-1.9365,1],[3.35412,1.9365,1],//+1
                [-2,3.4641,0],[-4,0,0],[-2,-3.4641,0],[2,-3.4641,0],[4,0,0],[2,3.4641,0], // ZERO
                [0,3.837,-1],[-3.35412,1.9365,-1],[-3.35412,-1.9365,-1],[0,-3.837,-1],[3.35412,-1.9365,-1],[3.35412,1.9365,-1], //-1
                [-1.732,2.99991,-2],[-3.464,0,-2],[-1.732,-2.99991,-2],[1.732,-2.99991,-2],[3.464,0,-2],[1.732,2.99991,-2], //-2
                [0,2.646,-3],[-2.2915,1.323,-3],[-2.2915,-1.323,-3],[0,-2.646,-3],[2.2915,-1.323,-3],[2.2915,1.323,-3],//-3
                [0,0,-4] // -4 (BOTTOM)
                ], 

    edges : [
                [0,1],[0,2],[0,3],[0,4],[0,5],[0,6], // +4 to +3
                [1,7],[7,2],[2,8],[8,3],[3,9],[9,4],[4,10],[10,5],[5,11],[11,6],[6,12],[12,1], // +3 to +2
                [13,7],[7,14],[14,8],[8,15],[15,9],[9,16],[16,10],[10,17],[17,11],[11,18],[18,12],[12,13], // +2 to +1
                [13,19],[19,14],[14,20],[20,15],[15,21],[21,16],[16,22],[22,17],[17,23],[23,18],[18,24],[24,13], // +1 to 0
                [25,19],[19,26],[26,20],[20,27],[27,21],[21,28],[28,22],[22,29],[29,23],[23,30],[30,24],[24,25], // 0 to -1
                [25,31],[31,26],[26,32],[32,27],[27,33],[33,28],[28,34],[34,29],[29,35],[35,30],[30,36],[36,25], // -1 to -2
                [37,31],[31,38],[38,32],[32,39],[39,33],[33,40],[40,34],[34,41],[41,35],[35,42],[42,36],[36,37], // -2 to -3
                [37,43],[38,43],[39,43],[40,43],[41,43],[42,43], //-3 to -4
                [1,2],[2,3],[3,4],[4,5],[5,6],[6,1], // +3 ring
                [7,8],[8,9],[9,10],[10,11],[11,12],[12,7], // +2 ring
                [13,14],[14,15],[15,16],[16,17],[17,18],[18,13], //+1 ring
                [19,20],[20,21],[21,22],[22,23],[23,24],[24,19], // 0 ring
                [25,26],[26,27],[27,28],[28,29],[29,30],[30,25], // -1 ring
                [31,32],[32,33],[33,34],[34,35],[35,36],[36,31], // -2 ring
                [37,38],[38,39],[39,40],[40,41],[41,42],[42,37] // -3 ring
            ]
}

model = ball

function drawModel(mod){
    ctx.canvas.width = ctx.canvas.width;
    ctx.fillStyle = "red"
    ctx.fillRect(offset-2,offset-2,4,4)
    for(let i=0;i<mod.edges.length;i++){
        
        side = mod.edges[i];
        point0 = mod.points[side[0]]; point1 = mod.points[side[1]];
        
        x0=point0[0]*scaleFactor;y0=point0[1]*scaleFactor;
        x1=point1[0]*scaleFactor;y1=point1[1]*scaleFactor;
        
        ctx.moveTo(x0+offset,y0+offset);
        ctx.lineTo(x1+offset,y1+offset);
        ctx.lineWidth = lineWidth;

        ctx.stroke();
    }
}

function rotateAllPoints(obj,x,y,z){
    /*
    x *= Math.PI/180;
    y *= Math.PI/180;
    z *= Math.PI/180;*/

    for(let i=0;i<obj.points.length;i++){
        obj.points[i] = quaternionRotation(obj.points[i],y,x,z)
        /*
        pointT = [[obj.points[i][0]],[obj.points[i][1]],[obj.points[i][2]]]
        resultT = matrixMultiplication(generateRotationMatrix(x,y,z),pointT);
        obj.points[i] = [resultT[0][0],resultT[1][0],resultT[2][0]];*/

    }
    return obj
}


function quaternionMultiplication(A,B){
    if ((A.length != 4 )||(B.length != 4)){throw new Error("Invalid quaternions :(");}
    let t0 = A[0]*B[0] - A[1]*B[1] - A[2]*B[2] - A[3]*B[3];
    let t1 = A[0]*B[1] + A[1]*B[0] - A[2]*B[3] + A[3]*B[2];
    let t2 = A[0]*B[2] + A[1]*B[3] + A[2]*B[0] - A[3]*B[1];
    let t3 = A[0]*B[3] - A[1]*B[2] + A[2]*B[1] + A[3]*B[0];
    return [t0,t1,t2,t3];
}

function quaternionInversion(A){
    if (A.length != 4 ){throw new Error("Invalid quaternion :(");}
    return [A[0],-A[1],-A[2],-A[3]];
}

function quaternionRotation(point,alpha,beta,gamma){
    let uby2 = gamma * (Math.PI/180)/ 2 ;
    let vby2 = beta * (Math.PI/180)/ 2 ;
    let wby2 = alpha * (Math.PI/180)/ 2 ;

    let q0 = Math.cos(uby2)*Math.cos(vby2)*Math.cos(wby2) + Math.sin(uby2)*Math.sin(vby2)*Math.sin(wby2)
    let q1 = Math.sin(uby2)*Math.cos(vby2)*Math.cos(wby2) - Math.cos(uby2)*Math.sin(vby2)*Math.sin(wby2)
    let q2 = Math.cos(uby2)*Math.sin(vby2)*Math.cos(wby2) + Math.sin(uby2)*Math.cos(vby2)*Math.sin(wby2)
    let q3 = Math.cos(uby2)*Math.cos(vby2)*Math.sin(wby2) - Math.sin(uby2)*Math.sin(vby2)*Math.cos(wby2)

    rotationQuaternion = [q0,q1,q2,q3];
    p = [0,point[0],point[1],point[2]];

    ansQ = quaternionMultiplication(quaternionMultiplication(quaternionInversion(rotationQuaternion),p),rotationQuaternion);

    return [ansQ[1],ansQ[2],ansQ[3]];

}


window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(event) {
    //let absolute = event.absolute;
    // alpha SPINNING ON TABLE goes 0 - 360 -> 0
    // beta LIFTING TOWARDS YOUR FACE goes flat: 0 - 90 (portrait) - 180 (upside down) -> -180 - 0
    // gamma FLIPPING SIDEWAYS goes leftfacing: -90 - 0 - 90 -> -90 - 0 (upside down) - 90 -> -90 (left facing again)
    //alpha/yaw/y
    //beta/pitch/x
    //gamma/roll/z
    console.log("oof")
    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
    //if(beta < 180){beta = 180+180+beta;} // actually dont think this is needed coz of the mod later
    //if(gamma<0){alpha +=180;beta+=180;}

    zAngle  = (alpha + 360)%360
    xAngle   = (beta + 360)%360 //-90 inside
    yAngle   = (gamma + 360)%360

    console.log(alpha,beta,gamma)

    modelCopy = JSON.parse(JSON.stringify(model));
    drawModel(rotateAllPoints(modelCopy,xAngle,yAngle,zAngle))
}

window.addEventListener('load', function(event){
    // flip it around to start
    // Honestly no clue why the thing is rotating 90 by itself in the first place
    // i must be projecting it wrong? anyway this is a small fix LOL
    //model = rotateAllPoints(model,90,0,0)
    console.log("LOADED")
    drawModel(model);
    }
  );