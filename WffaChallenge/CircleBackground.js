"use strict";
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let circleArray;
// let colorArr = ["#B9FFF8", "#6FEDD6", "#FF9551", "#FF4A4A"];
let colorArr = ["rgba(155, 223, 230, 0.138)"];
let circleCount = 30;

window.addEventListener("load",function (){
    if(window.innerWidth > 700){
        setHWCanvas(1);
    }else if(window.innerWidth < 700){
        setHWCanvas(2)
    }
});
window.addEventListener("resize", function () {
    if (canvas.width < this.window.innerWidth || canvas.height < this.window.innerHeight) {
        setHWCanvas(1);
    }
    else if (canvas.width > this.window.innerWidth || canvas.height > this.window.innerHeight) {
        init();
    }
});
// setcircleNum();
class circle {
    constructor(X, Y, radius, dx, dy) {
        this.X = X;
        this.Y = Y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
        this.draw = function () {
            c.beginPath();
            c.arc(this.X, this.Y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = `${this.color}`;
            c.fill();
            c.closePath();
        };
        this.update = function () {
            this.draw();
            if (this.X + this.radius > window.innerWidth || this.X - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.Y + this.radius > canvas.height || this.Y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.X += this.dx/5;
            this.Y += this.dy/5;
        };
    }
}
function Animtion() {
    requestAnimationFrame(Animtion);
    c.clearRect(0, 0, window.innerWidth, canvas.height);
    circleArray.forEach((e) => e.update());
}
createCircle(circleCount);
Animtion();
//////Helping Functions
function init() {
    circleArray = [];
    createCircle(circleCount);
}
function setHWCanvas(f) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * f;
}
function GenreateRandomNum(max, min, aboveZero = false) {
    if (aboveZero) {
        return Math.floor((Math.random() * (max - min + 1) + min)) + 1;
    }
    else {
        return Math.random() * (max - min + 1) + min;
    }
}
function NegativeOrPositive() {
    let randomNum = Math.floor(Math.random() - 0.5);
    if (randomNum >= 0) {
        return 1;
    }
    else if (randomNum <= -1) {
        return -1;
    }
    return 1; /////For make sure this Fun will return a value in the end
}
function setcircleNum(){
    circleCount = window.innerWidth/50; 
}
function createCircle(Count) {
    for (let i = 0; i < Count; i++) {
        let radius = GenreateRandomNum(45, 25);
        let x = GenreateRandomNum(window.innerWidth - radius * 4, radius);
        let dx = GenreateRandomNum(1, 1, true) * NegativeOrPositive();
        let y = GenreateRandomNum(window.innerHeight - radius * 4, radius);
        let dy = GenreateRandomNum(1, 1, true) * NegativeOrPositive();
        let Circle = new circle(x, y, radius, dx, dy);
        if (typeof circleArray == "undefined") { ////to solve error in typescript
            circleArray = [Circle];
        }
        else {
            circleArray.push(Circle);
        }
    }
}
//# sourceMappingURL=CircleProject.js.map