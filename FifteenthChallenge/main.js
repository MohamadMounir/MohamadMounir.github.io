// localStorage.clear();


////[1] style the document

/////-------------for Input Task Styling
let myInputTask = document.querySelector(".inputTask");
myInputTask.style.cssText = "display: flex; justify-content: center; margin: 30px 10%; padding: 30px 0px; background-color: #eeeeee; border-radius: 20px;"

let myInputText = document.querySelector(".inputText");
myInputText.style.cssText = " height: 54px;width: 85%; border: none; margin: 0px 15px;border-radius: 20px;font-size: 18px;";

let mySubmit = document.querySelector("[type=submit]");
mySubmit.style.cssText = "width: 80px;height: 60px;font-weight: bold;background-color: rgb(255, 75, 39);border: none;border-radius: 15%; color: white;border-radius: 20px;";


////---------for Task Shower styling 


let TaskShower = document.createElement("div");
TaskShower.className = "taskShower";
document.body.appendChild(TaskShower);
let myTaskShower = document.querySelector(".taskShower");
myTaskShower.style.cssText = "display: flex; flex-direction: column; justify-content: center; margin: 30px 10%; padding: 30px 0px; background-color: #eeeeee;border-radius: 20px;"


/////TextContent








//////----------------Functions--------------------------------------

///-----function for build tasks and had all Styling inside it.
///+it has a deletetool() inside it.
function createTextContent(Str , ID){
    ////Div 
    let taskContent = document.createElement("div");
    taskContent.className = "taskContent";
    taskContent.setAttribute("id", `${ID}`);
    myTaskShower.appendChild(taskContent);
    let myTaskContent = document.querySelector(".taskContent");
    myTaskContent.style.cssText = "display: flex; flex-direction: row; justify-content: space-between; width: 88%; background-color: white; padding: 10px 20px; align-items: center; margin: 20px 30px 0;border-radius: 20px;";
    let myTaskContentLastChild = document.querySelector(".taskContent:last-child")
    myTaskContentLastChild.style.cssText = "display: flex; flex-direction: row; justify-content: space-between; width: 88%; background-color: white; padding: 10px 20px; align-items: center; margin: 20px 30px 0;border-radius: 20px;";
    
    
    ////Text
    
    let taskText = document.createElement("h2");
    taskText.textContent = `${Str}`;
    myTaskContentLastChild.appendChild(taskText);
    
    /////button
    let Btn = document.createElement("button");
    Btn.textContent = "Delete";
    myTaskContentLastChild.appendChild(Btn);
    let myButtonDelete = document.querySelector(".taskContent:last-child button");
    myButtonDelete.style.cssText = "height: 50px; width: 60px; font-weight: bold; background-color: rgb(255, 75, 39);border: none;border-radius: 15%; color: white;border-radius: 15px;";
    
    
    deleteTool();
    }

////---------To re-write Task from storage
////I could make it anonymous function, which make able to decrease coding rows.
function printFromStorage(){
for(index=0; index<localStorage.length;index++){
    if(localStorage.getItem(`Task${index}`)){
        createTextContent(localStorage.getItem(`Task${index}`), `Task${index}`);

    }

}
}
printFromStorage();


///------Add new Task - this for make button clickable, make value save inside the localStorage in the same time ^_^
var IT = 0;
var IT = localStorage.getItem("myITNumber");
mySubmit.onclick = function (){
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
                // localStorage.removeItem(e.parentElement.getAttribute("id"));
                localStorage.removeItem(`${e.target.parentElement.getAttribute("id")}`);
                // window.localStorage.removeItem(`Task${i}`);
                e.target.parentElement.remove();
            }
        }
    }  
}



// /////last function, if the local storage empty; it'll clear the myITNumber variable.
// window.onload = function (){
//     for(i=0; i<localStorage.length; i++){
//         if(localStorage.getItem(`Task${i}`)){
//             break;
//         }else if(i = (localStorage.length - 1)){
//             localStorage.removeItem("myITNumber");
//             localStorage.setItem("myITNumber", 0);
//         }

//     }
// }