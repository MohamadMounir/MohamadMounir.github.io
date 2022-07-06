let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


////object for mouse position
let mouse = {
    x: undefined,
    y: undefined,
}

/////Array for cycles
let cycleArray = [];

function CreateCircle(cont,randomNum){
    for (i=0; i<cont; i++){
        let radius = Math.random() * randomNum +1; 
        let x = Math.random() * (innerWidth-radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let y = Math.random() * (innerHeight-radius * 2) + radius;
        let dy = (Math.random() - 0.5) * 5;
        let color;
        if(i<(cont/3)){
            color = "#ff4f2c"; ///orange
        }else if(i>0 && i<(cont * 2/3)){
            color = `#9cbdc9`; ///gray
        }else if(i>(cont/3) && i<cont){
            color = `#262f31` ///black
        }
        let circle = new CircleObj(x,y,dx,dy,radius,color);
        cycleArray.push(circle);
    }
}
function CircleObj(x,y,dx,dy, radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.Draw = function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius, 0, Math.PI*2,false);
        c.strokeStyle = `${this.color}`;
        c.stroke();
        ////styling
        c.fillStyle = `${this.color}`
        c.fill();
    }

    this.Update = function (){
        this.x += this.dx; ///x += dx
        if(this.x+this.radius > window.innerWidth || this.x < this.radius){
            this.dx = -this.dx;
        }
        this.y += this.dy; /// y += dy
        if(this.y + this.radius > window.innerHeight || this.y <this.radius){
            this.dy = -this.dy;
        }


        ////Intractive
        if(mouse.x - this.x < 50 && mouse.x -this.x> -50
            && mouse.y -this.y < 30 && mouse.y -this.y > -30
            ){
                if(this.radius <60){
                    this.radius += 3;
                }
        }else{
            if(this.radius !== this.minRadius && this.radius > this.minRadius){
                this.radius -= 1;
            }
        }
    }
}

function animtion(){
    requestAnimationFrame(animtion)
    c.clearRect(0,0,innerWidth,innerHeight);
    for(i=0;i<cycleArray.length;i++){
        cycleArray[i].Draw();
        cycleArray[i].Update();
    }
}

function iniat(){
    cycleArray = [];
    circleNumber();
}
function circleNumber(){
    CreateCircle(150,5);
    CreateCircle(90,7);
    CreateCircle(60,15);
    CreateCircle(24,22);
    CreateCircle(6,40);
}

window.addEventListener("resize", function (){
    if(canvas.width > window.innerWidth || canvas.height > window.innerHeight){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        iniat();
    }else{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
})


canvas.addEventListener("mousemove", function (e){
    mouse.x = e.x;
    mouse.y = e.y;
});
// canvas.addEventListener("touchmove",function (e){////Later

//     mouse.x = e.x;
//     mouse.y = e.y;
// });


///Function happen


circleNumber()



animtion();