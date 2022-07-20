////Sets for canvas + Declare
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let maxCircle;
let minCircle;
let circleNum;
let circleArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

circleNumAdj();

let mouse = {
    y: undefined,
    x: undefined,
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
    circleNumAdj();
})

/////re-create the objects
function iniat(){
    circleArray = [];
    CreateCircle(circleNum,maxCircle,minCircle);
}

function circleNumAdj(){    
    circleNum = 100;
    maxCircle = 30;
    minCircle = 30;
}

/////Array for circles + color

let colorArr = [
`#747F7F`,
`#72F2EB`,
`#00CCC0`,
`#1B7F79`,
`#FF4858`,
];

////------helping object and funtion

function giveNegativeNum(){
    let NegNum =(Math.random()-0.5);
    if(NegNum > 0){
        return 1;
    }else if(NegNum < 0){
        return -1;
    }
}

function giveDist(obj1,obj2){
    let XVol = (obj1.x - obj2.x)**2
    let YVol = (obj1.y - obj2.y)**2
    return (XVol + YVol)**0.5;
}

///give random number 
function createRandomRangeNum(max,min){
    return Math.floor(Math.random() * (max-min+1) + min);
}

///Make Circles
function CreateCircle(cont,max,min){
    for (i=0; i<cont; i++){////cont for number element wanted for produce
        let radius = createRandomRangeNum(max,min); 
        let x = Math.random() * (innerWidth-radius * 2) + radius; 
        let y = Math.random() * (innerHeight-radius * 2) + radius; ///
        if(i !== 0){
            for (let j = 0; j < circleArray.length; j++) {
                if(giveDist({x: x, y:y},circleArray[j]) - (radius+circleArray[j].radius)< 0){
                    x = Math.random() * (innerWidth-radius * 2) + radius; 
                    y = Math.random() * (innerHeight-radius * 2) + radius; ///
                    j = -1;
                }
            }
            }   
        let dy = createRandomRangeNum(5,1)/3 * giveNegativeNum();
        let dx = createRandomRangeNum(3,1)/3 * giveNegativeNum();
        let color = colorArr[Math.floor(Math.random() * colorArr.length)];
        circleArray.push(new CirclesObj(x,y,radius,color,dx,dy));
    }
}

//////the object that use in animation
function CirclesObj(circleX,circleY,radius,color,dx,dy){
    this.x = circleX;
    this.y = circleY;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.opacity = 0
    this.drawCircle = function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.save();
        c.globalAlpha = `${this.opacity}`
        c.fillStyle = `${this.color}`;
        // c.fillStyle = `transparent`;
        c.fill();
        // c.strokeStyle = `${this.color}`;
        c.restore();
        c.strokeStyle = `${this.color}`;
        c.stroke();
        c.closePath();
    }

    this.update = function (partivles){////this for animtion section 
        this.drawCircle();
        for (let i = 0; i < partivles.length; i++) {
            if(this === partivles[i]) continue;
            if(giveDist(this, partivles[i])-(this.radius+partivles[i].radius) < 0){
                oldVal = {dx1: this.dx, dx2: partivles[i].dx, dy1: this.dy, dy2: partivles[i].dy }
                this.dx = oldVal.dx2 * 0.9999;
                this.dy = oldVal.dy2 * 0.9999;
                partivles[i].dx = oldVal.dx1 * 0.9999;
                partivles[i].dy = oldVal.dy1 * 0.9999;
            }
        }

        this.y += this.dy;////increase number of this.y to make down fall simulation
        if((this.y - (canvas.height -this.radius-this.dy))>0 || this.y+this.dy <this.radius ){////when this.[cirlce] reach level that bigger then ground + radius + velocity; will reserve
            this.dy = -(this.dy + this.dy *0.01);
        }
        /////X-axi Update
        this.x += this.dx;
        if((this.x+this.radius+this.dx > canvas.width || this.x + this.dx < this.radius )){
            this.dx = -(this.dx + this.dx *0.01);
        }

        if(giveDist(mouse, this) < 140 && this.opacity < 0.5){
            this.opacity += 0.04;
        }else if(giveDist(mouse, this) > 60 && this.opacity > 0){

                this.opacity -= 0.02;
            this.opacity = Math.max(0,this.opacity)
        }

    }
}

/////-----------------------Animation Section and creating ball
function Animtion(){
    requestAnimationFrame(Animtion);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (i=0;i<circleArray.length;i++){
        circleArray[i].update(circleArray);
    }
}

window.addEventListener("mousemove", function(E){
    mouse.x = E.x;
    mouse.y = E.y
})


////Make Circle

iniat();
Animtion();

/////Event Functions
canvas.addEventListener("click",iniat);
