const title = document.getElementById("frontEnv");
const actions = document.getElementById("backEnv");
const hidden = document.getElementById("hiddenDiv");
const text = document.getElementById("textDisappear");

title.addEventListener("click", ()=>{
    HundleMenu();

})

function HundleMenu(){

    title.classList.toggle("is-active");
    actions.classList.toggle("is-active");
    hidden.classList.toggle("is-active");
    text.classList.toggle("is-active");


}