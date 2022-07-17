////Sets for canvas + Declare
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let maxCircle;
let minCircle;
let circleNum;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

circleNumAdj();



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
    circleNumAdj();

    
})


/////re-create the objects
function iniat(){
    CreateCircle(circleNum,maxCircle,minCircl,0);
    
}

function circleNumAdj(){

        circleNum = 1;
        maxCircle = 80;
        minCircle = 45;
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

////------helping object and funtion

////
function gP(obj1,obj2){
let objC1 = ((obj1.x)**2 + (obj1.y)**2)**0.5;
let objC2 = ((obj2.x)**2 + (obj2.y)**2)**0.5;
// let objC2 = (obj2.x**2 + obj2.y**2)**0.5;
let orginalCol = obj2.color


    // if(circleArray[1].x-circleArray[0].x+circleArray[0].radius+circleArray[1].dx+circleArray[1].radius>0 
    //     ||circleArray[0].x-circleArray[1].x+circleArray[1].radius+circleArray[0].dx+circleArray[0].radius<0 ){
        // (objC2-objC1>obj2.radius+obj1.radius && objC1 - objC2 > -(obj2.radius*2)) 
// if((objC1 -objC2> 0 && objC2 - objC1 >  -(obj1.radius+obj2.radius)/2)){

    // (obj2.y + obj2.radius > obj1.y + obj1.radius || obj2.y-obj2.radius>obj1.y-obj1.radius) for Y
// if((objC2 + obj2.radius > objC1 - obj1.radius && obj2.y-obj2.radius-obj1.y+obj1.radius > obj1.radius + obj2.radius)){
if(((obj1.x + obj1.radius > obj2.x - obj2.radius && obj1.x-obj2.x < 0) 
    || obj1.x-obj1.radius < obj2.x + obj2.radius && obj1.x - obj2.x > 0)
    && ((obj1.y - obj1.radius < obj2.y + obj2.radius && obj1.y-obj2.y > 0)
    || (obj1.y+obj1.radius > obj2.y - obj2.radius && obj1.y-obj2.y < 0))){


        obj2.dx = -obj2.dx;
        console.log("clash")
        obj1.color = "blue"
        obj1.dx = -obj1.dx;
        obj2.dy = -obj2.dy;
        moveVar0 = true;   

}else{
    obj1.color = orginalCol;

}



}

///give random number 
function createRandomRangeNum(max,min){
    return Math.floor(Math.random() * (max-min+1) + min);
}

///Make Circles
function CreateCircle(cont,max,min,x){
    for (i=0; i<cont; i++){////cont for number element wanted for produce
        let radius = createRandomRangeNum(max,min); 
        // let x = Math.random() * (innerWidth-radius * 2) + radius; ///
        // let x = radius + 50;
        if(x===0){
            x = Math.random() * (innerWidth-radius * 2) + radius; 
        }
        let y = Math.random() * ((innerHeight* 2/3)- radius); ///
        let color = colorArr[Math.floor(Math.random() * colorArr.length)];
        let circle = new CirclesObj(x,y,radius,color);
        circleArray.push(circle);
    }
}


//////the object that use in animation
function CirclesObj(circleX,circleY,radius,color){
    this.x = circleX;
    this.y = circleY;
    this.rH = 100;
    this.dy = 1;
    this.dx = 7;
    this.radius = radius;
    this.color = color;

    this.drawCircle = function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle = `${this.color}`;
        c.fill();
        c.strokeStyle = "#222"
        c.stroke();
        c.closePath();
    }
    this.drawRect = function (){////draw rectangle
        c.beginPath();
        c.fillStyle = "#333"
        c.fillRect(0,canvas.height-this.rH ,canvas.width,this.rH);
        c.closePath();
    }
    this.update = function (Move){////this for animtion section 
        
        this.y += this.dy;////increase number of this.y to make down fall simulation
        if((this.y - (canvas.height -this.rH -this.radius-this.dy/2))>0 ){////when this.[cirlce] reach level that bigger then reactAngle ground + radius + velocity; will reserve

            if(Move){
                this.dy = -this.dy;
            }else{
                this.dy = 0;///reserving
            }
            this.dy = this.dy * 0.99;////make the velocity smaller to give feel of gravity
        }else if((this.y - (canvas.height -this.rH -this.radius - this.dy))<0){/// if wasn't reach, will counitune fall
            if(this.dy > 0){///if falling
                ////must smaller then the next one
                this.dy += 0.3;
            }else if(this.dy < 0){///if going up
                ///the bigger the less hits
                this.dy += 0.31;
            }
        }

        if(Move){
        /////X-axi Update
        this.x += this.dx;
        if((this.x+this.radius+this.dx > canvas.width || this.x < this.radius)){
            this.dx = -this.dx;
        }
        }



    }
}




/////-----------------------Animation Section and creating ball

let = moveVar1 = true;
let = moveVar0 = false;

function Animtion(){
    requestAnimationFrame(Animtion);
    c.clearRect(0,0,innerWidth,innerHeight);
    // for (i=0;i<circleArray.length;i++){
    //     circleArray[i].update();
    //     circleArray[i].drawCircle();

    // }    

    circleArray[0].drawCircle();
    circleArray[1].drawCircle();

        circleArray[0].update(moveVar0);
        circleArray[1].update(moveVar1);

    // if(circleArray[1].x-circleArray[0].x+circleArray[0].radius+circleArray[1].dx+circleArray[1].radius>0 
    //     ||circleArray[0].x-circleArray[1].x+circleArray[1].radius+circleArray[0].dx+circleArray[0].radius<0 ){
    //     console.log("clash");
    //     circleArray[1].dx = -circleArray[1].dx;
    //     circleArray[0].dx = -circleArray[0].dx;
    //     // moveVar0 = true;
    // }
    gP(circleArray[0],circleArray[1])


    
    circleArray[0].drawRect();

    

}

////Make Circle
CreateCircle(circleNum,maxCircle,minCircle,canvas.width-300);
CreateCircle(circleNum,maxCircle,minCircle,100);
gP(circleArray[0],circleArray[1])

circleArray[0].dx = -circleArray[0].dx;

Animtion();



/////Event Functions
canvas.addEventListener("click",iniat);
