let mainArrow = document.getElementById("mainArrow")

let articlesPage = document.getElementById("articles")

mainArrow.onclick = function (){
    articlesPage.scrollIntoView()
}



let progressBars = document.querySelectorAll(".progressBar")
let progressNums = document.querySelectorAll(".skills span");


window.addEventListener("load", function (){
    for(let i=0; i<progressBars.length; i++){
        progressBars[i].style.width = `${progressNums[i].textContent}`
    }
})


let upArrow = document.getElementById("upArrow");
let nav = document.getElementById("nav")
upArrow.addEventListener("click", function (){
    nav.scrollIntoView();
    upArrow.style.bottom = "-10%"
})



let oldScroll = window.scrollY;
window.addEventListener("scroll", function (){
    let newScroll = this.window.scrollY;
    if(newScroll > 330){
        upArrow.style.display = "flex"
        if(oldScroll > newScroll){
            upArrow.style.bottom = "8%"
        }else{
            upArrow.style.bottom = "-10%"
        }
        oldScroll = newScroll;
    }else{
        upArrow.style.display = "none"
    }
})

let timeSpans = document.querySelectorAll(".eventTimer span");

let fetureDate = new Date("8/18/2022");

function Timer(){
    let dateNow = new Date();
    let timerArr = calcTime(dateNow,fetureDate);
    for(let i=0; i< timeSpans.length; i++){
        timeSpans[i].textContent = `${timerArr[i]}`;
    }
}

Timer()
setInterval(Timer, 1000);

function calcTime(now, feture){
    let duration = (feture - now)/1000/60/60/24;
    let byDays = Math.floor(duration);
    duration = (duration - byDays) * 24;
    let byHours = Math.floor(duration);
    duration = (duration - byHours) * 60;
    let byMins = Math.floor(duration);
    duration = (duration - byMins) * 60;
    let bySeconds = Math.floor(duration);

    if(bySeconds == 0 && byMins == 0 && byHours ==0 && byDays ==0){
        return null;
    }
    return [byDays,byHours,byMins,bySeconds];
}