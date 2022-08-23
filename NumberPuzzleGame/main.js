let  divsBox = document.querySelectorAll("#box > div");
let cards = document.querySelectorAll("#box .card");
let shadowCard = document.getElementById("shadowCard")
let box = document.getElementById("box");
let nav = document.querySelector("nav .Container");
let menuKeyOpen = document.getElementById("menuKeyOpen");
let menuKeyClose = document.getElementById("menuKeyClose")
let megaMenu = document.getElementById("megaMenu");
let winScreen = document.getElementById("winScreen");
let winScreenClose = document.querySelectorAll(".winScreenKeyClose")
let clickedEffect = document.getElementById("clickedSound")
let winingMusic = document.getElementById("succesSound");

let winingTime;

let winingTimePlace = document.getElementById("winingTime")

let inputUserName = document.getElementById("userName");

let gamebuttons = document.querySelectorAll("button");
let startAgainButton = document.querySelectorAll("#startAgain")
let continueButton = document.querySelectorAll("#continue")

let userNamePlace = document.querySelector("span.userName");
let timerPlace = document.querySelector("span.timer");

let gridColumns = 4;
let cardAspect = 125;


let timerStart = 0;

menuKeyOpen.addEventListener("click", MenuKeys);
menuKeyClose.addEventListener("click", MenuKeys);


window.addEventListener("load",init);

gamebuttons.forEach(function (ele){/////if press Any button [User Name]
    ele.addEventListener("click", function (){
        if(inputUserName.value.trim() !== ""){
            let name = inputUserName.value.trim();
            inputUserName.value = "";
            userNamePlace.textContent = name;
            localStorage.setItem("userName", name)
        }
    })
})


cards.forEach(function (ele){
    ele.addEventListener("click", function (e){
        clickedEffect.play()
        let clickedOrder = e.target.style.order;
        let shadowOrder = shadowCard.style.order;

        if(deteced(clickedOrder,shadowOrder) !== "unable"){
            e.target.style.order = `${shadowOrder}`;
            shadowCard.style.order = `${clickedOrder}`
        }
        check();
    });
})


continueButton.forEach((ele) => ele.addEventListener("click", function (){
    init();
    MenuKeys();
}));
startAgainButton.forEach((ele) => ele.addEventListener("click", function (){
    timerStart = new Date();
    init();
    MenuKeys();
    setInterval(Timer, 1000)
}));

winScreenClose.forEach((ele) => ele.addEventListener("click",function(){
    winScreen.classList.add("hide");
    MenuKeys();
}));




////Helping Main Function
function deteced(clicked,shadow){ 
    clicked = parseInt(clicked);
    shadow = parseInt(shadow);
    if(clicked == shadow - 1){
        return "left"
    }else if(clicked == shadow + 1){
        return "right"
    }else if(clicked == shadow -gridColumns){
        return "top"
    }else if(clicked == shadow + gridColumns){
        return "bottom"
    }else{
        return "unable"
    }
}
/////Main function
function check(){////if all cards in the right order
    let checking = true;

    for(let i=0; i<cards.length+1 ;i++ ){
        if(i<cards.length){
            if(+cards[i].style.order !== i){
                checking = false;
                i = 20;
            }  
        }
        if(i === cards.length && checking === true){
            winingTime = calcTime(timerStart);
        WinScreen();
        winingMusic.play();
        }
    }
}

function init(){
    makeOrder();
    if(window.width > 580){
        box.style.gridTemplateColumns = `repeat(${gridColumns}, ${cardAspect}px)`;
    }else{
        box.style.gridTemplateColumns =  `repeat(4, 80px)`;
    }
    getName();
}
function initPlusMenuKeys(){
    init();
    MenuKeys();
}

function MenuKeys(){
    menuKeyOpen.classList.toggle("hide");
    megaMenu.classList.toggle("hide");
    menuKeyClose.classList.toggle("hide");
}
function makeOrder(){
    let cardArray = [];
    for(let i=0;i<cards.length; i++){
        cardArray.push(i+1);
    }
    let i=0;
    while(cardArray.length !== 0){
        let orderNum = Math.floor(Math.random()*cardArray.length);
        divsBox[i].style.order = `${cardArray[orderNum]}`;
        cardArray.splice(orderNum,1);
        ++i;
    }
    shadowCard.style.order = 0;
}

function WinScreen(){
    winScreen.classList.remove("hide");
    winingTimePlace.textContent = winingTime
}

function getName(){
    if(localStorage.getItem("userName") !== null){
        userNamePlace.textContent = localStorage.getItem("userName");
    }
}


function calcTime(startPoint){//

    let time =  (new Date()) - startPoint ;
    time = Math.floor(time/1000);
    let second = Math.floor(time%60);
    let min = Math.floor(time/60);
    let hour = Math.floor(min/60)
    if(min < 10){
        min = "0" + min
    }
    if(second < 10){
        second = "0" + second
    }

    if(hour>=1){
        return `${hour}:${min%60}:${second}`;
    }else if(hour < 1){
        return `${min}:${second}`;
    }

}

function Timer(){
    // let time =  (new Date()) - timerStart ;
    // time = Math.floor(time/1000);
    // let second = Math.floor(time%60);
    // let min = Math.floor(time/60);
    // let hour = Math.floor(min/60)
    // if(min < 10){
    //     min = "0" + min
    // }
    // if(second < 10){
    //     second = "0" + second
    // }
    // if(hour>=1){
    //     timerPlace.textContent = `${hour}:${min%60}:${second}`;
    // }else if(hour < 1){
        //     timerPlace.textContent = `${min}:${second}`;
        // }




    timerPlace.textContent = calcTime(timerStart);
}

