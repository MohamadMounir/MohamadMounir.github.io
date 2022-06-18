
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
