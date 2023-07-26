////Sets for canvas + Declare
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let maxCircle;
let minCircle;
let circleNum;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

circleNumAdj();


function getVelocity1(m1,m2, u1,u2){
    // using One-dimensional Newtonian formula; for veloctiy of the second projectile.
    return ((m1-m2)/(m1+m2)) * u1 + ((2*m2)/(m1+m2)) * u2;
}

function getVelocity2(m1,m2, u1,u2){
    // using One-dimensional Newtonian formula; for veloctiy of the second projectile. 
    return ((2*m1)/(m1+m2)) * u1 + ((m2-m1)/(m1+m2)) * u2;
}
function DegtoRad(angle){
    return angle * (Math.PI/180);
}

function  RadtoDeg(angle){
    return angle * (180/Math.PI);
}


///give random number 
function createRandomRangeNum(max,min){
    return Math.floor(Math.random() * (max-min+1) + min);
}


////End for sets


////make the window dynamic for changes
window.addEventListener("resize", function (){
    if(canvas.width > window.innerWidth || canvas.height > window.innerHeight){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        iniat();////re-set
    }else{////if canvas was smaller then window, just make bigger without any re set to objects
        ////this due to make more cooler 
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    circleNumAdj();// declare the static varible , contain number of the circles in space, maximum, and minimun size.

    
})


/////re-create the objects
function iniat(){
    circleArray = []
    CreateCircle(circleNum,maxCircle,minCircle);
}

function circleNumAdj(){
        circleNum = 15;
        maxCircle = 45;
        minCircle = 15;
}


/////Array for circles + color
let circleArray = [];
let colorArr = [
`#747F7F`,
`#72F2EB`,
`#00CCC0`,
`#1B7F79`,
`#FF4858`,
];
// Old
// `#9cbdc9`,
// "#ff4f2c",
// `#262f31`,

//// <------helping object and funtion Section

////
function gP(obj1,obj2){
    let color1 = obj1.color;
    let totalRadius = obj1.radius + obj2.radius;
    let betX = obj1.x-obj2.x;//spcae X between two objects 
    let betY = obj1.y-obj2.y;//spcae Y between two objects 
    let vectorDis = Math.sqrt((Math.pow(betX,2) + Math.pow(betY,2)));//conver two space vector into R space by using Cosine Rule

    if((vectorDis < totalRadius&& vectorDis > 0)){

        // storage the velocity taken from every function; to ensure don't make any mistake.
        let v1x = getVelocity1(obj1.mass,obj2.mass,obj1.dx,obj2.dx);
        let v1y = getVelocity1(obj1.mass,obj2.mass,obj1.dy,obj2.dy);
        let v2x = getVelocity2(obj1.mass,obj2.mass,obj1.dx,obj2.dx);
        let v2y = getVelocity2(obj1.mass,obj2.mass,obj1.dy,obj2.dy);
        // update the velocity
        obj1.dx = v1x;
        obj1.dy = v1y;
        obj2.dx = v2x;
        obj2.dy = v2y;
        // reverse angle between objects to give realistic effect. 
        obj1.angle = DegtoRad(obj2.mAngle);
        obj2.angle = DegtoRad(obj1.mAngle);

        // important
        // move the objects by their new velocity. that's way we prevent errors; because we don't wait to obj.update to move them.
        obj1.x = obj1.x + v1x;
        obj1.y = obj1.y + v1y;
        obj2.x = obj2.x + v2x;
        obj2.y = obj2.y + v2y;

        // obj2.color = color1;
    }
}

///Make Circles
function CreateCircle(cont,max,min){
    for (i=0; i<cont; i++){////cont for number element wanted for produce
        let radius = createRandomRangeNum(max,min); 
        let x = (Math.random() * (innerWidth  - radius * 2 )) + (radius); 
        let y = (Math.random() * (innerHeight - radius * 2 )) + (radius);
        let angle =  Math.random() * 50 + 15;///this way I can give minimum speed and little diffrent in angle of movement.
        for(i=0;i<circleArray.length;i++){
            //some prosses to ensure the new circle place is diffrent form previous circles.
            let totalRadius = circleArray[i].radius + radius;
            let betX = Math.abs(circleArray[i].x - x);
            let betY = Math.abs(circleArray[i].y - y);
            let vectorDis = Math.sqrt((Math.pow(betX,2) + Math.pow(betY,2)));
            
            if(vectorDis < totalRadius&& vectorDis > 0){//if this condition happen; re-genarate a new location
                x = (Math.random() * (innerWidth  - radius * 2 )) + (radius); 
                y = (Math.random() * (innerHeight - radius * 2 )) + (radius); 
                //this for make the loop again until their no overlaping 
                i = 0;
            }
        };
        let v = Math.random();
        // let v = 0.75;
        let color = colorArr[Math.floor(Math.random() * colorArr.length)];
        let circle = new CirclesObj(x,y,radius,color,v,angle);
        circleArray.push(circle);
    }
}


//////the object that use in animation
function CirclesObj(circleX,circleY,radius,color,v,angle){
    this.x = circleX;
    this.y = circleY;
    this.mass = radius/2;
    this.v = v;
    this.angle = DegtoRad(angle);
    this.dy = this.v / Math.sin(this.angle);
    this.dx = this.v / Math.cos(this.angle);
    this.mAngle = RadtoDeg(Math.atan2(this.dy,this.dx)); // Angle of the movement vector
    

    this.radius = radius;
    this.color = color;

    this.drawCircle = function (){///draw the circle only, give it's color and the position where it will draw.
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle = `${this.color}`;
        c.fill();
        c.strokeStyle = "#222"
        c.stroke();
        c.closePath();
    }

    this.update = function (){////this for animtion section, update the position according to attribute of this object

            /////Y-axis Update
        this.y += this.dy;////increase number of this.y to make down fall simulation
        // if hit wall up and down 
        if(((this.y - (canvas.height-this.radius-this.dy/2))>0) || ((this.y - this.radius) < 0) ){////when this.[cirlce] reach level that bigger then ground + radius + velocity; will reserve
            this.dy = -this.dy;
            this.y = this.y + this.dy;
        }
        
            /////X-axis Update
            this.x += this.dx;
            // if hit the wall in left and right
            if((this.x+this.radius+this.dx > canvas.width || this.x < this.radius)){
                this.dx = -this.dx;
                this.x = this.x + this.dx;
            }

            ///// Update the movement angle with new velocity 
            this.mAngle = RadtoDeg(Math.atan(this.dy/this.dx));
            
            ///// <-------IMPORTANT PART------>
            ///// loop for call gP() function, that allow to collioed with each circle in the space 
            for(let i=0;i<circleArray.length; i++){
                gP(this,circleArray[i]);
            }
            
            
        }
}


////// End helping function section ------>

/////-----------------------Animation Section and creating ball

function Animtion(){
    requestAnimationFrame(Animtion);
    c.clearRect(0,0,innerWidth,innerHeight);
    for( let i=0;i<circleArray.length; i++){
        circleArray[i].drawCircle();
        circleArray[i].update();
    }
}

////Make Circle
iniat();
circleArray[0].dx = -circleArray[0].dx;

Animtion();



/////Event Functions
canvas.addEventListener("click",iniat);
