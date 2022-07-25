let stars = document.getElementById("stars");
let mountains = document.getElementById("mountains");
let mountains2 = document.getElementById("mountains2");
let mountains3 = document.getElementById("mountains3");
let boat = document.getElementById("boat");
let moon = document.getElementById("moon");
let ground = document.getElementById("ground");
let text = document.getElementById("text");


let darkBackground = `linear-gradient(#1a0718, #653c7c)`;
document.body.style.background = `${darkBackground}`;

window.onscroll = function (){
    let scroll = window.scrollY;
    if(window.innerWidth < 600){
        scroll = scroll/2
    }
    boat.style.transform = `translate(${scroll*1.3}px,${scroll*0.55}px)`
    mountains.style.transform = `translateY(${scroll*0.8}px)`
    mountains2.style.transform = `translateY(${scroll*0.45}px)`
    ground.style.transform = `translateY(${scroll*0.55}px)`
    moon.style.transform = `translateY(${scroll*2}px)`
    stars.style.transform = `translate(${scroll*0.17}px,-${scroll*0.12}px)`
    if(scroll*0.01 <1.25){

        text.style.transform = `translate(-50%,50%) scale(${scroll* 0.01})`;
    }
    else if(scroll* 0.01> 1.25){
        text.style.transform = `translate(-50%,${-50+(scroll* 1.2 )}%) scale(1.25)`;
        // text.style.transform = `translate(-50%,${161}%) scale(1.25)`;
    }


    if(scroll > 370 && window.innerWidth < 800){
        hideItems(`none`);////none

    }else{
        hideItems(`block`)////block
    }
    if(scroll > 650 && window.innerWidth > 800){
        hideItems(`none`);////none

    }else{
        hideItems(`block`)////block
    }
    

    if(scroll * 2 > 290){
        document.body.style.background = "linear-gradient(#0b1833, #4b5097)";

    }else{
        document.body.style.background = `${darkBackground}`;

    }


}


function hideItems(value){
    let hideOrNot = `${value}`;
    boat.style.display = `${hideOrNot}`;
    mountains.style.display = `${hideOrNot}`;
    mountains2.style.display = `${hideOrNot}`;
    ground.style.display = `${hideOrNot}`;
    moon.style.display = `${hideOrNot}`;
    text.style.display = `${hideOrNot}`;
}