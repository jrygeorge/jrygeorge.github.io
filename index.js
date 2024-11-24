const canvas = document.getElementById("logo_canvas");
const ctx = canvas.getContext("2d");

a = window.innerHeight;
b = window.innerWidth;

/*
Stolen from the first answer from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
which took it from http://detectmobilebrowsers.com/
*/
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

let headerHeight = 1

if(a>b){headerHeight = Math.max(a,b)/8;}else{headerHeight = Math.max(a,b)/15;}
ctx.canvas.width  = headerHeight
ctx.canvas.height = headerHeight

document.getElementById("bar").style.height = headerHeight
heads  = document.getElementsByClassName("header")
heads[0].style.fontSize = headerHeight/5;
heads[1].style.fontSize = headerHeight/3.5;

offsetX = ctx.canvas.width / 2;
offsetY = ctx.canvas.height / 2;
scaleFactor = headerHeight/5
lineWidth = 1
let angleStep = 3 // in degrees

wasdqe = false

model = icos

function updateLogo(){
    model = rotateAllPoints
                (model,
                Math.random()*angleStep,  
                Math.random()*angleStep,
                Math.random()*angleStep)
    drawModel(model,false)
    requestAnimationFrame(updateLogo)
}


// GENERATING TABLE
projectNumber = projectInformation.length;

// width of a project cell + its margins
cellWidth = 600
// padding added to the table div so the cells are centred
tablePadding = ((0.9*document.body.offsetWidth)%(cellWidth))

const projecttable = document.createElement("div")
projecttable.id = "table_div"
// there must be a better way to centre it, but this is all I know hoho
projecttable.style.paddingLeft = tablePadding/2
projecttable.style.width = (0.90*document.body.offsetWidth) - tablePadding /2

projecttable.style.marginTop = headerHeight

for(let i=0;i<projectNumber;i++){
    cellDiv = document.createElement("div")
    cellDiv.className = "table_cell"

    // putting an "a" inside the div so we can add the href
    const cell = document.createElement("a");
    cell.setAttribute("href","projects/"+projectInformation[i]["filename"])
    cell.setAttribute("target","_blank")
    const thumb =  document.createElement("img");
    thumb.setAttribute("src","assets/"+projectInformation[i]["image"])
    cell.appendChild(thumb)

    
    let head3 = document.createElement("h3");
    head3.className = "header cell"
    head3.style.textAlign = "center"
    head3.style.marginTop = "10px"

    const projecttn = document.createTextNode(projectInformation[i]["name"]);
    head3.appendChild(projecttn)

    let head4 = document.createElement("h4");
    head4.className = "header cell"
    head4.style.textAlign = "center"
    head4.style.marginTop = "2px"

    const projectDescription = document.createTextNode(projectInformation[i]["description"]);
    head4.appendChild(projectDescription)

    /*
    codelink = document.createElement("a")
    codelink.setAttribute("href",projectInformation[i]["link"])
    codelink.setAttribute("target","_blank")
    codelink.textContent = "< CODE >"
    */

    cellDiv.appendChild(cell)
    cellDiv.appendChild(head3)
    //cellDiv.appendChild(codelink)
    cellDiv.appendChild(head4)
    projecttable.appendChild(cellDiv)
}
document.body.appendChild(projecttable)

if(window.mobileAndTabletCheck()){
    //document.getElementsByTagName("h4")[0].textContent = "XXXX-TEXT FOR MOBILE-XXXX";
}
else{
    requestAnimationFrame(updateLogo)
}