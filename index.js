const canvas = document.getElementById("logo_canvas");
const ctx = canvas.getContext("2d");


a = window.innerHeight;
b = window.innerWidth;
let headerHeight = 100

/*
Stolen from the first answer from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
which took it from http://detectmobilebrowsers.com/
*/
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };


if(a>b){headerHeight = Math.max(a,b)/8;}else{headerHeight = Math.max(a,b)/15;}
ctx.canvas.width  = headerHeight
ctx.canvas.height = headerHeight

document.getElementById("bar").style.height = headerHeight
heads  = document.getElementsByClassName("header")
heads[0].style.fontSize = headerHeight/5;
heads[1].style.fontSize = headerHeight/7;

offset = headerHeight / 2;
scaleFactor = headerHeight/5
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
let g = (1 + 5**0.5)/2
icos = {
    points : [[0,-1,g],[0,1,g],[g,0,1],[-g,0,1],[-1,-g,0],[-1,g,0],[1,g,0],[1,-g,0],[g,0,-1],[-g,0,-1],[0,-1,-g],[0,1,-g] 
                ], 

    edges : [[0,1],[0,2],[0,3],[0,4],[0,7],[1,2],[1,3],[1,5],[1,6],[2,6],
    [2,7],[2,8],[3,4],[3,5],[3,9],[4,9],[4,7],[4,10],[5,9],[5,6],
    [5,11],[6,11],[6,8],[7,8],[7,10],[8,10],[8,11],[9,10],[9,11],[10,11]
                
            ]
}

model = icos
model = rotateAllPoints(model,30,30,45)

function drawModel(mod){
    ctx.canvas.width = ctx.canvas.width;
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
    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
    zAngle  = (alpha + 360)%360
    xAngle   = (beta + 360)%360 //-90 inside
    yAngle   = (gamma + 360)%360
    modelCopy = JSON.parse(JSON.stringify(model));
    drawModel(rotateAllPoints(modelCopy,zAngle,yAngle,xAngle))
}

// GENERATING TABLE
projectNumber = 20//projectInformation.length;
columnNumber = Math.floor(window.innerWidth/400);
rowNumber = Math.ceil(projectNumber/columnNumber);
//

const projecttable = document.createElement("table");
for(let row = 0; row<rowNumber;row++){
    const tr = projecttable.insertRow()
    for(let col = 0; col < columnNumber; col++){
        currProject = (row*columnNumber)+col + 1;
        if(currProject <= projectNumber){
            const td = tr.insertCell()
            const cellDiv = document.createElement("a");
            cellDiv.className = "cellDiv"
            cellDiv.setAttribute("href","https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg/1200px-Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg")

            const thumb =  document.createElement("img");
            thumb.setAttribute("src","assets/"+projectInformation[currProject-1]["image"])

            let head3 = document.createElement("h3");
            let head4 = document.createElement("h4");
            head4.className = "header cell"
            head3.className = "header cell" 

            const projectName = document.createTextNode(projectInformation[currProject-1]["name"]);
            const projectDescription = document.createTextNode(projectInformation[currProject-1]["description"]);
            head3.appendChild(projectName)
            head4.appendChild(projectDescription)
            cellDiv.appendChild(thumb)
            cellDiv.appendChild(head3)
            cellDiv.appendChild(head4)
            
            td.appendChild(cellDiv);
        }
    }
}
document.body.appendChild(projecttable)

if(window.mobileAndTabletCheck()){
    document.getElementsByTagName("h4")[0].textContent = "just some physics and graphics-y things";
    document.getElementsByTagName("table")[0].style.marginTop = "25%"
}