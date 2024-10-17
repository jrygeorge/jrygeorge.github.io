class Cuboid {
    constructor(x,y,z){
        this.shapeColour = randomHSLString()
        this.shapeColour2 = this.shapeColour

        // Each vertex is [xyzw]
        this.v = [
            [-x/2,-y/2,-z/2,1],
            [x/2,-y/2,-z/2,1],
            [x/2,y/2,-z/2,1],
            [-x/2,y/2,-z/2,1],

            [-x/2,-y/2,z/2,1],
            [x/2,-y/2,z/2,1],
            [x/2,y/2,z/2,1],
            [-x/2,y/2,z/2,1],
        ]

        // Each element is a pair
        // 0 : Array of 3 vertices [xyzw] that make up the triangle
        // 1 : Colour (Each one can be set individiually)

        this.faces = [
            [ [this.v[0],this.v[3],this.v[1]], this.shapeColour ],
            [ [this.v[1],this.v[3],this.v[2]], this.shapeColour2 ],
            [ [this.v[4],this.v[5],this.v[6]], this.shapeColour ],
            [ [this.v[4],this.v[6],this.v[7]], this.shapeColour2 ],

            [ [this.v[0],this.v[4],this.v[7]], this.shapeColour ],
            [ [this.v[0],this.v[7],this.v[3]], this.shapeColour2 ],
            [ [this.v[5],this.v[1],this.v[2]], this.shapeColour ],
            [ [this.v[5],this.v[2],this.v[6]], this.shapeColour2 ],

            [ [this.v[0],this.v[1],this.v[5]], this.shapeColour ],
            [ [this.v[0],this.v[5],this.v[4]], this.shapeColour2 ],
            [ [this.v[7],this.v[6],this.v[2]], this.shapeColour ],
            [ [this.v[7],this.v[2],this.v[3]], this.shapeColour2 ],
        ]
    }
}

class UVSphere {
    constructor(r,angle=Math.PI/8){
        // DONT MAKE THE ANGLE TOO SMALL, IT WILL LAG
        // THIS IS NOT THE RIGHT WAY TO DO THIS, THIS Will create overlaps
        // I just can't be bothered to do it properly with caps right now
        this.faces = []
        this.shapeColour = randomHSLString()
        for(let theta = 0; theta <  2* Math.PI ; theta+= angle){
            for(let phi = 0; phi <  Math.PI ; phi+= angle){
                let v0 = [r*Math.sin(phi)*Math.cos(theta),              r*Math.sin(phi)*Math.sin(theta),            r*Math.cos(phi)         ,1]
                let v1 = [r*Math.sin(phi+angle)*Math.cos(theta),        r*Math.sin(phi+angle)*Math.sin(theta),      r*Math.cos(phi+angle)   ,1]
                let v2 = [r*Math.sin(phi+angle)*Math.cos(theta+angle),  r*Math.sin(phi+angle)*Math.sin(theta+angle),r*Math.cos(phi+angle)   ,1]
                let v3 = [r*Math.sin(phi)*Math.cos(theta+angle),        r*Math.sin(phi)*Math.sin(theta+angle),      r*Math.cos(phi)         ,1]
                
                // Each element is a pair
                // 0 : Array of 3 vertices [xyzw] that make up the triangle
                // 1 : Colour

                this.faces.push([ [v0,v1,v2], this.shapeColour ])
                this.faces.push([ [v0,v2,v3], this.shapeColour ])
            }
        }
        //this.colours = [...Array(this.faces.length)].fill(randomHSLString())
    }
}

class Plane {
    // creates an XY plane, rotate as necessary
    constructor(x,y,step){
        this.faces = []
        this.shapeColour = randomHSLString()//"RGB(132, 242, 36)"
        for(let i=0;i<x;i+=step){
            for(let j=0;j<y;j+=step){
                let v0 = [i,       j,     0,  1]
                let v1 = [(i+step),   j,     0,  1]
                let v2 = [(i+step),   (j+step), 0,  1]
                let v3 = [i,       (j+step), 0,  1]

                this.faces.push([[v0,v1,v2,v3],this.shapeColour])
            }
        }

    }

}

class Cow {
    // MY MAGNUS OPUS
    // its incomplete but oh well
    constructor(scale){
        this.shapeColour = randomHSLString()
        let vc = [
            [-65,90,-35,1],[-55,90,-35,1],[-55,90,-25,1],[-65,90,-25,1], //foot1
            [75,90,-35,1],[85,90,-35,1],[85,90,-25,1],[75,90,-25,1], //foot2
            [-65,40,-35,1],[-45,40,-35,1],[-45,40,-15,1],[-65,40,-15,1], //thighring1
            [65,40,-35,1],[85,40,-35,1],[85,40,-15,1],[65,40,-15,1],//thighring2
            [-65,90,35,1],[-55,90,35,1],[-55,90,25,1],[-65,90,25,1],// foot3
            [75,90,35,1],[85,90,35,1],[85,90,25,1],[75,90,25,1],// foot4
            [-65,40,35,1],[-45,40,35,1],[-45,40,15,1],[-65,40,15,1], //thighring3
            [65,40,35,1],[85,40,35,1],[85,40,15,1],[65,40,15,1],//thighring4
            [-95,-20,-20,1],[-95,-20,20,1], // neckline
            [-125,-15,-10,1],[-125,-15,10,1],[-130,-25,10,1],[-130,-25,-10,1], // nose
            [-90,-45,20,1],[-90,-45,-20,1], // top of head -line
            [-60,-15,35,1],[-60,-15,-35,1], //ontop-front-line
            [85,-15,35,1],[85,-15,-35,1], //ontop-back-line
            [85,-4,-4,1],[85,4,4,1], // buttline1
            [85,-4,4,1],[85,4,-4,1] // buttline2
            ]

        for(let i = 0;i<vc.length;i++){
            vc[i] = [vc[i][0]*scale,vc[i][1]*scale,vc[i][2]*scale,vc[i][3]]
        }
        this.faces = [
            [[vc[0],vc[1],vc[2],vc[3]],this.shapeColour], // foot1
            [[vc[4],vc[5],vc[6],vc[7]],this.shapeColour], // foot2
            //[[vc[8],vc[9],vc[10],vc[11]],this.shapeColour], //thighring1
            [[vc[0],vc[8],vc[9],vc[1]],this.shapeColour],//foot1 to thighring 1
            [[vc[1],vc[9],vc[10],vc[2]],this.shapeColour],
            [[vc[2],vc[10],vc[11],vc[3]],this.shapeColour],
            [[vc[3],vc[11],vc[8],vc[0]],this.shapeColour],
            //[0,8],[1,9],[2,10],[3,11], 
            //[12,13],[13,14],[14,15],[15,12], // thighring 2
            [[vc[4],vc[12],vc[13],vc[5]],this.shapeColour],
            [[vc[5],vc[13],vc[14],vc[6]],this.shapeColour],
            [[vc[6],vc[14],vc[15],vc[7]],this.shapeColour],
            [[vc[7],vc[15],vc[12],vc[4]],this.shapeColour],
            //[4,12],[5,13],[6,14],[7,15], // foot2 to thighring2
            [[vc[16],vc[17],vc[18],vc[19]],this.shapeColour], // foot3
            [[vc[20],vc[21],vc[22],vc[23]],this.shapeColour], // foot4
            //[24,25],[25,26],[26,27],[27,24], // thighring3
            //[28,29],[29,30],[30,31],[31,28], //thighring4
            [[vc[16],vc[24],vc[25],vc[17]],this.shapeColour],
            [[vc[17],vc[25],vc[26],vc[18]],this.shapeColour],
            [[vc[18],vc[26],vc[27],vc[19]],this.shapeColour],
            [[vc[19],vc[27],vc[24],vc[16]],this.shapeColour],
            //[16,24],[17,25],[18,26],[19,27], // foot3 to thighring3
            [[vc[20],vc[28],vc[29],vc[21]],this.shapeColour],
            [[vc[21],vc[29],vc[30],vc[22]],this.shapeColour],
            [[vc[22],vc[30],vc[31],vc[23]],this.shapeColour],
            [[vc[23],vc[31],vc[28],vc[20]],this.shapeColour],
            //[20,28],[21,29],[22,30],[23,31], // foot4 to thighring4
            [[vc[9],vc[12],vc[14],vc[30],vc[28],vc[25],vc[27],vc[11]],this.shapeColour],
            //[9,12],[14,30],[28,25],[27,11], // undercarriage rectangle (linking thighrings) XXXX
            
            //[24,33],[8,32], //front of undercarriage to neckline
            [[vc[32],vc[33],vc[24],vc[8]],this.shapeColour],
            [[vc[34],vc[35],vc[36],vc[37]],this.shapeColour],
            //[34,35],[35,36],[36,37],[37,34], // nose
            [[vc[34],vc[32],vc[32],vc[35]],this.shapeColour],
            //[32,33], // neckline XXXX
            //[32,34],[33,35], // neckline to bottom of nose
            [[vc[36],vc[38],vc[39],vc[37]],this.shapeColour],
            //[38,39],// top of head 
            //[36,38],[37,39],// top of head to top of nose
            [[vc[38],vc[40],vc[41],vc[39]],this.shapeColour],
            //[40,41], //ontop-front-line
            //[38,40],[39,41], // top of head to ontop-front-line
            [[vc[40],vc[41],vc[43],vc[42]],this.shapeColour],//ontop
            //[42,43], //ontop-back-line
            //[40,42],[41,43], // ontop-front line to ontop-back line
            [[vc[13],vc[43],vc[42],vc[29]],this.shapeColour], //back
            [[vc[8],vc[41],vc[40],vc[24]],this.shapeColour], //front
            //sides
            [[vc[13],vc[43],vc[41],vc[8]],this.shapeColour],
            [[vc[29],vc[42],vc[40],vc[24]],this.shapeColour],
            //[13,43],[29,42], // ontop-back line to thighring2 and 4
            //[8,41],[24,40],// ontop-front line to thighring1 and 3
            //44,45],[46,47]// butt
            [[vc[40],vc[38],vc[36],vc[35],vc[33], vc[24]],this.shapeColour],//necksides
            [[vc[41],vc[39],vc[37],vc[34],vc[32], vc[8]],this.shapeColour]
        ]
}
}


class Torus {
    constructor(crossSectionRadius,aspectRatio){
        if(crossSectionRadius <= 0){
            throw new Error(`Inner Radius must be > 0. Value given : ${crossSectionRadius}`)
        }
        if(aspectRatio < 1){
            throw new Error(`Aspect Ratio must be >= 1. Value given : ${aspectRatio}`)
        }
        this.faces = []
        this.shapeColour = randomHSLString()
        let sweepRadius = crossSectionRadius * aspectRatio
        console.log(crossSectionRadius,sweepRadius)
        // I should probably have two step angles
        const step = Math.PI/10
        for(let phi=0;phi<Math.PI * 2; phi += step){
            for(let theta=0;theta<Math.PI *2; theta += step){
                let v0 = [(sweepRadius + crossSectionRadius*Math.cos(theta))*Math.cos(phi),(sweepRadius + crossSectionRadius*Math.cos(theta))*Math.sin(phi),crossSectionRadius*Math.sin(theta),1]
                let v1 = [(sweepRadius + crossSectionRadius*Math.cos(theta+step))*Math.cos(phi),(sweepRadius + crossSectionRadius*Math.cos(theta+step))*Math.sin(phi),crossSectionRadius*Math.sin(theta+step),1]
                let v2 = [(sweepRadius + crossSectionRadius*Math.cos(theta+step))*Math.cos(phi+step),(sweepRadius + crossSectionRadius*Math.cos(theta+step))*Math.sin(phi+step),crossSectionRadius*Math.sin(theta+step),1]
                let v3 = [(sweepRadius + crossSectionRadius*Math.cos(theta))*Math.cos(phi+step),(sweepRadius + crossSectionRadius*Math.cos(theta))*Math.sin(phi+step),crossSectionRadius*Math.sin(theta),1]

                this.faces.push([[v0,v3,v1],this.shapeColour])
                this.faces.push([[v1,v3,v2],this.shapeColour])
            }
        }
}
}