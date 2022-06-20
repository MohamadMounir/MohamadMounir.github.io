

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










/////Make the Arrow im main div work
let myPages = document.querySelectorAll("main .Container > div");
let myArrows = document.querySelectorAll(".Arrow > span");
myArrows[0].addEventListener("click", arrowButton);
myArrows[1].addEventListener("click", arrowButton);

function arrowButton(){

    /////Nested Function
    function checkDisplayBlock(arr){
        for(i=0; i<arr.length; i++){
            if(getComputedStyle(arr[i]).display === "block"){
                return arr[i];
            }else if(arr[i].style.display === "block"){
                return arr[i];
            }
        }
    }
    function displayNone(arr){
        arr.style.display = "none";
    }

    /////Main Function

    let currnetPage = checkDisplayBlock(myPages);
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


}




