

/////Make Menu Functionable
let MyMenuButton = document.getElementById("myMenu");

MyMenuButton.onclick = function (){
    document.querySelector("nav").classList.toggle("MenuEnable");
    document.querySelector("nav .Container .Search").classList.toggle("MenuEnable");
    document.querySelectorAll("nav .Menu span")[0].classList.toggle("MenuEnable");
    document.querySelectorAll("nav .Menu span")[1].classList.toggle("MenuEnable");
    document.querySelectorAll("nav .Menu span")[2].classList.toggle("MenuEnable");
    document.querySelector("nav .Logo").classList.toggle("MenuLogoEnable");
    document.querySelector("nav .Search i").classList.toggle("MenuIconEnable");
    document.querySelector("nav .Container").classList.toggle("MenuContainerEnable");
    document.querySelector(".Navigation").classList.toggle("Show");
}





///////////////////Helping Functions

////Check if all pages are block or not 
function checkDisplayBlock(arr){
    for(i=0; i<arr.length; i++){
        if(getComputedStyle(arr[i]).display === "block"){
            return arr[i];
        }else if(arr[i].style.display === "block"){
            return arr[i];
        }
    }
}

////get number from string 
function getNumber(string){
    return string.split("").map(function (e){
        if(isNaN(e)){
            return "";
        } else if(!isNaN(e)){
            return e;
        }
    }).join("");


}
/////take a number, return has refrrence. 
function getNumberCycle(number){
    switch(number){
        case "1":
            return 2;
        case "2":
            return 0;
        case "3":
            return 1;
    }
}
/////make display none on inline 
function displayNone(arr){
    arr.style.display = "none";
}


////////////////////Make the Arrow in main div work

////Declare 
let myPages = document.querySelectorAll("main .Container > div");
let myArrows = document.querySelectorAll(".Arrow > span");
let myCycles = document.querySelectorAll("main .Cycle > span");


/////Make clickable
myArrows.forEach(function (e){
    e.addEventListener("click", arrowButton);
});

myCycles.forEach(function (e){
    e.addEventListener("click", cycleButton );
});

/////Event Functions
function arrowButton(){
    ////Declare
    let currnetPage = checkDisplayBlock(myPages);
    /////Nested Function
    function markNewCycle(){
        myCycles.forEach(function (e){
            e.style = "";
        });
        let curCycle = getNumberCycle(getNumber(currnetPage.getAttribute("id")));
        myCycles[curCycle].style.backgroundColor = "var(--mainColor)";
    }
    /////Main Function
    if(this.classList.item(0) === "right"){ ///For Right Arrow
        if(currnetPage.nextElementSibling === null){ ////if reach to end of the index
            myPages.forEach(displayNone);
            myPages[0].style.display = "block";
        }else if(currnetPage.nextElementSibling !== null){ ////if there's adition index left
            myPages.forEach(displayNone);
            currnetPage.nextElementSibling.style.display = "block";
        }
    }else if(this.classList.item(0) === "left"){ ///For Left Arrow
        if(currnetPage.previousElementSibling === null){////if reach to end of the index
            myPages.forEach(displayNone);
            myPages[2].style.display = "block";
        }else if(currnetPage.previousElementSibling !== null){ ////if there's adition index left
            myPages.forEach(displayNone);
            currnetPage.previousElementSibling.style.display = "block";
        }
    }
    /////Outside Fun
    markNewCycle();
}

function cycleButton(event){
    ////clear all cycles background 
    myCycles.forEach(function (e){
        e.style = "";
    });
    ////Mark the selected one
    event.target.style.backgroundColor = "var(--mainColor)";
    /////clear all. Then, appear the selected one
    myPages.forEach(displayNone);
    myPages[getNumberCycle(getNumber(event.target.getAttribute("id")))].style.display = "block";
}



//// Mark the page inside the cycles
///[Default]

window.addEventListener("load", function(){
    myCycles[1].style.backgroundColor = "var(--mainColor)";
} )







//////////////////Hide NAV by scrolling down
let myNav = document.querySelector("nav");
let currnetScroll = window.scrollY;
window.addEventListener("scroll", function (){
    let movedScorll = this.window.scrollY;
    if(movedScorll > currnetScroll){
        myNav.classList.add("NavHidden");
    }else{
        myNav.classList.remove("NavHidden");
    }
    currnetScroll = this.window.scrollY;
})



////////////////ArrowUp button

let myArrowup = document.querySelector(".ArrowUpButton");
myArrowup.style.display = "none";
myArrowup.addEventListener("click", function (){
    window.scrollTo(0,0);
});

window.addEventListener("scroll",function (){
    if(window.scrollY > 400){
        myArrowup.style.display = "block";
    }else if(window.scrollY < 300){
        myArrowup.style.display = "none";
    }
})


///////////Hover for Menu

let myMenuSpans = document.querySelectorAll("nav .Menu .MenuBar");



MyMenuButton.addEventListener("mouseenter", function (){
    myMenuSpans.forEach(function (e){
        e.classList.add("HoverColorToMenu");
    })
})

MyMenuButton.addEventListener("mouseleave", function (){
    myMenuSpans.forEach(function (e){
        e.classList.remove("HoverColorToMenu");
    })
})