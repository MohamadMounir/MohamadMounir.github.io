const Menu = document.getElementById("Menu");
const Actions = document.getElementById("Panl");


Menu.addEventListener("click", ()=>{
    HundleMenu();

})

function HundleMenu(){

    Menu.classList.toggle("is-active");
    Actions.classList.toggle("is-active")


}