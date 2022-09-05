const {noise} = require("./HelpingFunforPerlinNoise.js"); 


let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let c = canvas.getContext("2d") as CanvasRenderingContext2D ;

let circleArray: circle[];
let circleCount: number= 50;
let circlesBetween: number = 30;
setNewCount();
setHWCanvas();

window.addEventListener("resize", function (){

    if(canvas.width < this.window.innerWidth || canvas.height < this.window.innerHeight){
        setHWCanvas();
    }else if(canvas.width > this.window.innerWidth || canvas.height > this.window.innerHeight){
        init();
    }
});



class circle {
    draw: () => void;
    update: () => void;
    color: string;
    dirctionX: number;
    dirctionY: number;
    ADX: number | undefined;
    ADY: number | undefined;
    indexOffX: number;
    indexOffY: number;
    indexCircle: number;
    distance: number;
    constructor(private X: number, private Y: number, private radius: number,private dx:number, private dy:number, indexCircle: number){
        this.radius = radius;
        this.indexCircle = indexCircle;
        this.dx = 0;
        this.dy = 0;
        this.color = `hsl(${this.indexCircle/(circleCount/ 3) *  220}, 80%, 50%)`;///220
        this.dirctionX = 1;
        this.dirctionY = 1;
        this.indexOffX = 0;
        this.indexOffY = 0;
        this.distance = 20;
        this.draw = function (){
            c.beginPath();
            c.arc(this.X,this.Y,this.radius,0,Math.PI *2,false); 
            c.fillStyle = `${this.color}`;
            c.fill();
            c.closePath();
        }
        this.update = function (){ 
            this.indexOffX += 0.003;///to keep snake Moving
            this.indexOffY += 0.005;///to keep snake Moving
            this.distance = this.indexCircle/circlesBetween; /// to give distance between all circles
            let randomNoiseX: number = noise(this.indexOffX+ 40+this.distance) * canvas.width;
            let randomNoiseY: number = noise(this.indexOffY +this.distance) * canvas.height;
            this.ADX = randomNoiseX;
            this.ADY = randomNoiseY;
            if(typeof this.ADX === "number"){
                this.dx = this.dirctionX* this.ADX;
            }        
            if(typeof this.ADY === "number"){
                this.dy = this.dirctionY * this.ADY;
            }
            this.X = this.dx;
            this.Y = this.dy;
            this.draw();
        }
    }
}

function Animtion(): void {
    requestAnimationFrame(Animtion);
    c.fillStyle = "rgba(11,11,11,0.05)"
    c.fillRect(0,0,window.innerWidth,window.innerHeight);
    circleArray.forEach((circle) => circle.update());
}



//////Helping Functions
function init(): void{
    circleArray = [];
    createCircle(circleCount);
    setNewCount();
}
function setHWCanvas(): void{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function GenreateRandomNum(max: number, min: number, aboveZero: boolean = false): number{
    if(aboveZero){
        return Math.floor((Math.random() * (max - min + 1 ) + min))+1;
    }else{
        return Math.random() * (max - min + 1 ) + min;
    }
}
function NegativeOrPositive():number{
    let randomNum: number = Math.floor(Math.random() - 0.5);
    if(randomNum >= 0){
        return 1;
    }else if(randomNum <= -1){
        return -1;
    }
    return 1;/////For make sure this Fun will return a value in the end
}
function createCircle(Count: number): void{
    for(let i=0; i<Count; i++){
        let radius:number = 20;////25,5
        let x:number = GenreateRandomNum(window.innerWidth-radius*4, radius)
        let dx:number = GenreateRandomNum(1,0, true) * NegativeOrPositive();
        let y:number = GenreateRandomNum(window.innerHeight - radius*4, radius)
        let dy:number = GenreateRandomNum(1,0, true) * NegativeOrPositive();
        let Circle: circle = new circle(x,y,radius,dx,dy,i);
        if(typeof circleArray == "undefined"){////to solve error in typescript
            circleArray = [Circle]
        }else{
            circleArray.push(Circle);
        }
    }
}
function setNewCount(): void{
    circleCount = Math.floor(window.innerWidth/7);////7
    circlesBetween = Math.floor(window.innerWidth/ 22);////22
    if(window.innerWidth < 700){
        circlesBetween = Math.floor(window.innerWidth/ 11);////11
    }
}

createCircle(circleCount);
Animtion();
