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
    console.log(window.scrollY)
    let newScroll = this.window.scrollY;
    if(newScroll > 330){
        upArrow.style.display = "flex"


        if(oldScroll > newScroll){
            console.log("Up")
            upArrow.style.bottom = "8%"
        }else{
            console.log("Down")
            upArrow.style.bottom = "-10%"
        }
        oldScroll = newScroll;
    }else{
        upArrow.style.display = "none"
    }
})