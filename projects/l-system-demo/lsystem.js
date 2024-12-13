const canvasWidth = 1500
const canvasHeight = 1500

canv = document.getElementById("canv")
ctx = canv.getContext("2d")
canv.width = canvasWidth
canv.height = canvasHeight
// putting the origin in the center
//ctx.transform(1,0,0,1,canvasWidth/2,canvasHeight/2)
ctx.transform(1,0,0,1,200,600)
ctx.fillRect(-8,-8,16,16)

const Axiom = "XF"
const IterationNumber = 5
let FinalString = Axiom

// REMBEMBER TO CREATE RULES FOR EVERYTHING
// EVEN THINGS THAT ARE NOT MODIFIED
const Rules = {
    "X":"X+YF++YF-FX--FXFX-YF+",
    "Y":"-FX+YFYF++YF+FX--FX-Y",
    "-":"-",
    "+":"+",
    "F":"F"
}

ANGLE = Math.PI/3

for(i=0;i<IterationNumber;i++){
    let news = ""
    for(letter of FinalString){
        news = news + Rules[letter]
    }
    FinalString = news
}

console.log(FinalString)

document.getElementsByTagName("title")[0].textContent = `L-System Demo (${FinalString.length})`


let H = 50
ctx.lineWidth=2

for(letter of FinalString){    
    if(["F","X","Y"].includes(letter)){
        ctx.strokeStyle = `HSL(${H},100%,50%)`;
        H = (H+0.05) %360
        ctx.beginPath()
        ctx.moveTo(0,0);
        ctx.lineTo(0,5);
        ctx.stroke();
        ctx.transform(1,0,0,1,0,5)
        //ctx.rotate(Math.PI / 2);
        //ctx.fillRect(20,20,40,40)
    }
    if(letter=="-"){
        ctx.rotate(ANGLE);
    }
    if(letter=="+"){
        ctx.rotate(-ANGLE);
    }
}
