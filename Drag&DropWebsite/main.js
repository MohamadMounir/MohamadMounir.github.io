///////Declare
let inputText = document.getElementById("inputText");

let addButton = document.getElementById("addButton");

let myTexts = document.querySelectorAll(".texts");

let textContainer = document.querySelectorAll(".texts > .Text-container");

let boxContainer = document.querySelectorAll(".Box");

let dragText;



    makeDrag();
/////Helping Functions


function addingItem(){
    if(inputText.value.trim() !== ""){
    let myNewEle = document.createElement("h2");
    myNewEle.classList.add("Text-container");
    myNewEle.textContent = inputText.value;
    // myNewEle.createAttribute("draggable") = "true"
    myNewEle.setAttribute("draggable", "true"); 
    inputText.value = "";
    myTexts[0].appendChild(myNewEle);
    }
    makeDrag();
}

function makeDrag(){
    textContainer = document.querySelectorAll(".texts > .Text-container");
    textContainer.forEach(function (ele){
    ele.addEventListener("dragstart", function (e){
        e.target.classList.add("Draging");
        dragText = e.target;
    })
    ele.addEventListener("dragend", function (e){
        e.stopPropagation();
        e.target.classList.remove("Draging");
        dragText = null;
    })
})
}

boxContainer.forEach(function (ele){
    ele.addEventListener("drop", function (e){
        e.preventDefault();
        ele.children[1].appendChild(dragText);
        ele.classList.remove("DragingOver");

    })
    ele.addEventListener("dragover",function (e){
        e.preventDefault();
        ele.classList.add("DragingOver");
    })
    ele.addEventListener("dragleave",function (e){
        ele.classList.remove("DragingOver");
    })
})

//////Main Functions

addButton.addEventListener("click",addingItem);
inputText.addEventListener("keyup", function (e){
    e.preventDefault();
    if(e.key === "Enter" && inputText.value != ` `){
        addingItem();
    }
});
