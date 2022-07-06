////Sets for canvas + Declare
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let maxCircle = 70;
let minCircle = 20;
let circleNum = 200;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if(window.innerWidth < 450){
    circleNum = 50;
    console.log("Happen")
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


    
})


/////re-create the objects
function iniat(){
    circleArray = [];
    CreateCircle(circleNum,maxCircle,minCircle);
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

///give random number 
function createRandomRangeNum(max,min){
    return Math.floor(Math.random() * (max-min+1) + min);
}

///Make Circles
function CreateCircle(cont,max,min){
    for (i=0; i<cont; i++){////cont for number element wanted for produce
        let radius = createRandomRangeNum(max,min); 
        let x = Math.random() * (innerWidth-radius * 2) + radius; ///
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
    this.update = function (){////this for animtion section 
        
        this.y += this.dy;////increase number of this.y to make down fall simulation
        if((this.y - (canvas.height -this.rH -this.radius-this.dy))>0 ){////when this.[cirlce] reach level that bigger then reactAngle ground + radius + velocity; will reserve
            this.dy = -this.dy;///reserving
            this.dy = this.dy * 0.98;////make the velocity smaller to give feel of gravity
        }else if((this.y - (canvas.height -this.rH -this.radius - this.dy))<0){/// if wasn't reach, will counitune fall
            if(this.dy > 0){///if falling
                ////must smaller then the next one
                this.dy += 0.3;
            }else if(this.dy < 0){///if going up
                ///the bigger the less hits
                this.dy += 0.4;
            }
        }
    }
}




/////-----------------------Animation Section and creating ball

function Animtion(){
    requestAnimationFrame(Animtion);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (i=0;i<circleArray.length;i++){
        circleArray[i].update();
        circleArray[i].drawCircle();

    }    
    circleArray[0].drawRect();
    
}

////Make Circle
CreateCircle(circleNum,maxCircle,minCircle);

Animtion();