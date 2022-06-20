

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





////Help Functions
function checkDisplayBlock(arr){
    for(i=0; i<arr.length; i++){
        if(getComputedStyle(arr[i]).display === "block"){
            return arr[i];
        }else if(arr[i].style.display === "block"){
            return arr[i];
        }
    }
}

function getNumber(string){
    return string.split("").map(function (e){
        if(isNaN(e)){
            return "";
        } else if(!isNaN(e)){
            return e;
        }
    }).join("");


}

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

function displayNone(arr){
    arr.style.display = "none";
}


/////Make the Arrow im main div work
let myPages = document.querySelectorAll("main .Container > div");
let myArrows = document.querySelectorAll(".Arrow > span");
let myCycles = document.querySelectorAll("main .Cycle > span");

myArrows.forEach(function (e){
    e.addEventListener("click", arrowButton);
});

myCycles.forEach(function (e){
    e.addEventListener("click", cycleButton );
});


function arrowButton(){

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

    if(this.classList.item(0) === "right"){
        if(currnetPage.nextElementSibling === null){
            
            myPages.forEach(displayNone);
            myPages[0].style.display = "block";
        }else if(currnetPage.nextElementSibling !== null){
            myPages.forEach(displayNone);
            currnetPage.nextElementSibling.style.display = "block";
        }
    }else if(this.classList.item(0) === "left"){
        if(currnetPage.previousElementSibling === null){
            
            myPages.forEach(displayNone);
            myPages[2].style.display = "block";
        }else if(currnetPage.previousElementSibling !== null){
            myPages.forEach(displayNone);
            currnetPage.previousElementSibling.style.display = "block";
        }
    }

    markNewCycle();
}

function cycleButton(event){
    console.log(event.target);
    myCycles.forEach(function (e){
        e.style = "";
    });
    event.target.style.backgroundColor = "var(--mainColor)";

    myPages.forEach(displayNone);

    
    myPages[getNumberCycle(getNumber(event.target.getAttribute("id")))].style.display = "block";

}

////Mark the page inside the cycles

////Default

window.addEventListener("load", function(){
    myCycles[1].style.backgroundColor = "var(--mainColor)";
    
} )




