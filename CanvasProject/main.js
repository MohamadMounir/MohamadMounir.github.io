////
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
// c.stroke();

c.beginPath();
c.arc(150,150,60,0,Math.PI*2,false);
c.strokeStyle = "black";
c.stroke();

// c.fillStyle = "red";
// c.fill();

c.closePath();
// c.stroke();
