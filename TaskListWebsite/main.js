// localStorage.clear();


////[1] style the document

/////-------------Declare some input
let myInputText = document.querySelector(".inputText");

let mySubmit = document.querySelector("[type=submit]");


////---------for declare Task Shower 


let TaskShower = document.createElement("div");
TaskShower.className = "taskShower";
document.body.appendChild(TaskShower);
let myTaskShower = document.querySelector(".taskShower");










//////----------------[2]Functions--------------------------------------

///-----function for build tasks and had all Styling inside it.
///+it has a deletetool() inside it.
function createTextContent(Str , ID){
    ////Div 
    let taskContent = document.createElement("div");
    taskContent.className = "taskContent";
    taskContent.setAttribute("id", `${ID}`);
    myTaskShower.appendChild(taskContent);
    let myTaskContentLastChild = document.querySelector(".taskContent:last-child")    
    
    ////Text
    
    let taskText = document.createElement("h2");
    taskText.textContent = `${Str}`;
    myTaskContentLastChild.appendChild(taskText);
    
    /////button
    let Btn = document.createElement("button");
    Btn.textContent = "Delete";
    myTaskContentLastChild.appendChild(Btn);    
    
    deleteTool();
}


///// Delete Null task value 

window.onload = function (){
    for(index=0; index<localStorage.length;index++){
        if(localStorage.getItem(`Task${index}`) === "" || localStorage.getItem(`Task${index}`) === null){
            localStorage.removeItem(`Task${index}`);
        }
    }
}


////---------To re-write Task from storage
window.onload = function (){
    for(index=0; index<localStorage.getItem("myITNumber") + 1;index++){
        if(localStorage.getItem(`Task${index}`) !== "" && localStorage.getItem(`Task${index}`) !== null){
            createTextContent(localStorage.getItem(`Task${index}`), `Task${index}`);
        }else{
            continue;
        }
    }
}





///------Add new Task - this for make button clickable, make value save inside the localStorage in the same time ^_^
var IT = 0;
var IT = localStorage.getItem("myITNumber");
mySubmit.onclick = function (e){    
    if(myInputText.value === ""){
            e.preventDefault();
        }else{
        if(localStorage.length === 0){
            localStorage.setItem(`Task${0}`,myInputText.value)
            createTextContent(localStorage.getItem(`Task${0}`), `Task${0}`);
            IT++;
            myInputText.value = "";
        }else if(localStorage.key(loopLocalStorage()) !== `Task${IT}`){
                localStorage.setItem(`Task${IT}`,myInputText.value)
                createTextContent(localStorage.getItem(`Task${IT}`), `Task${IT}`);
                IT++;
                myInputText.value = "";
        }else if(localStorage.key(loopLocalStorage()) === `Task${IT}`){
            IT++;
        }
        localStorage.setItem(`myITNumber`, IT);
    }
}

function loopLocalStorage(){
for(i=0;i<localStorage.length;i++){
    return i;
}

}

/////End to Add new Task (I think iI need some improvment for it (-_-),
/// like make all this codes inside one function and add createTextContent inside it, too.)



/////Function that remove Task from localStorage and remove its parent
////it's used inside createTextContent(), without it; the programme couldn't update the news values.
function deleteTool(){
    var myButtonDelete = document.querySelectorAll(".taskContent button");
    for(i=0;i<myButtonDelete.length; i++){
        if(myButtonDelete[i] !== null){
            myButtonDelete[i].onclick = function (e){
                localStorage.removeItem(`${e.target.parentElement.getAttribute("id")}`);
                e.target.parentElement.remove();
            }
        }
    }  
}
