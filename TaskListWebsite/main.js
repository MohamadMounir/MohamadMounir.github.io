// localStorage.clear();


////[1] style the document

/////-------------Declare some input
let myInputText = document.querySelector(".inputText");

let mySubmit = document.querySelector("[type=submit]");


////---------for declare Task Shower 

let myTaskShower = document.querySelector(".taskShower");



myInputText.addEventListener("keyup", function (e){
    e.preventDefault();
    if(e.keyCode == "13"){
        mySubmit.click();
    }
})


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
    Btn.className = "delete box"
    myTaskContentLastChild.appendChild(Btn);    

    let buttonDiv = document.createElement("div");
    buttonDiv.className = "editDiv"
    myTaskContentLastChild.appendChild(buttonDiv);    
    

    let BtnEdit= document.createElement("button");
    BtnEdit.textContent = "edit";
    BtnEdit.className = "edit box"
    buttonDiv.appendChild(BtnEdit);    

    /////button
    
    deleteTool();
    editTool();
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
let myTaskRe = /Task\d+/;

window.onload = function (){
    for(index=0; index<localStorage.length;index++){
        if(myTaskRe.test(localStorage.key(index))){
            createTextContent(localStorage.getItem(localStorage.key(index)), `${localStorage.key(index)}`);
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
/// like make all this codes inside one function and add createTextContent inside it, too.).....Later



/////Function that remove Task from localStorage and remove its parent
////it's used inside createTextContent(), without it; the programme couldn't update the news values.
function deleteTool(){
    var myButtonDelete = document.querySelectorAll(".taskContent .delete");
    for(i=0;i<myButtonDelete.length; i++){
        if(myButtonDelete[i] !== null){
            myButtonDelete[i].onclick = function (e){
                localStorage.removeItem(`${e.target.parentElement.getAttribute("id")}`);
                e.target.parentElement.remove();
            }
        }
    }  
}
function editTool(){
    let myButtonEdit = document.querySelectorAll(".taskContent .edit");

    for( i=0; i<myButtonEdit.length; i++){
        if(myButtonEdit[i] !== null){
            myButtonEdit[i].onclick = function (e){
                let oldText = e.target.parentElement.parentElement.children[0].textContent;
                e.target.parentElement.parentElement.children[0].setAttribute("contenteditable","true");
                // console.log(e.target.parentElement.parentElement)
                // console.log(e.target.parentElement.parentElement.children[0])
                e.target.style.display = "none";

                let applyButton = document.createElement("button");
                applyButton.textContent = "apply";
                applyButton.className = "apply box";
                e.target.parentElement.appendChild(applyButton);

                let cencelButton = document.createElement("button");
                cencelButton.textContent = "cencel";
                cencelButton.className = "cencel box";
                e.target.parentElement.appendChild(cencelButton);

                applyButton.onclick = function (){
                    localStorage.setItem(`${e.target.parentElement.parentElement.getAttribute("id")}`,`${e.target.parentElement.parentElement.children[0].textContent}`);
                    e.target.parentElement.parentElement.children[0].setAttribute("contenteditable","false");
                    // console.log(e.target.parentElement.parentElement.children[0])
                    applyButton.style.display = "none"
                    cencelButton.style.display = "none"
                    e.target.style.display = "block"
                }
                cencelButton.onclick = function (){
                    e.target.parentElement.parentElement.children[0].setAttribute("contenteditable","false");
                    e.target.parentElement.parentElement.children[0].textContent = `${oldText}`;

                    applyButton.style.display = "none"
                    cencelButton.style.display = "none"
                    e.target.style.display = "block"
                }
                    ///////For make edit
                    // if(f>0){
                    //     localStorage.setItem(`${e.target.parentElement.getAttribute("id")}`,`${e.target.parentElement.children[0].textContent}`)
                    // }
                    // f++;
                // localStorage.setItem()
                // e.target.parentElement.getAttribute("id")
            }
        }
    }
}




///////-------------------------[3]ChangeColor-----------------------------------------


/////Color set

let colorArray = [
mainColorTheme = {
    ///Default Theme 
    mainColor: `#ff4b27`,
    secondColor: `#eeeeee`,
    thirdColor: `white`,
    textColor: `black`,
    buttonTextColor: `white`,
},
secondColorTheme = {
    mainColor: `#003B46`,
    secondColor: `#66A5AD`,
    thirdColor: `#C4DFE6`,
    textColor: `black`,
    buttonTextColor: `white`,
},
thirdColorTheme = {
    mainColor: `#379683`,
    secondColor: `#8ee4af`,
    thirdColor: `#edf5e1`,
    textColor: `black`,
    buttonTextColor: `white`,
},
forthColorTheme = {
    mainColor: `#66fcf1`,
    secondColor: `#45a29e`,
    thirdColor: `#1f2833`,
    textColor: `#c5c6c7`,
    buttonTextColor: `white`,
},
fivthColorTheme = {
    mainColor: `#86c232`,
    secondColor: `#61892f`,
    thirdColor: `#222629`,
    textColor: `white`,
    buttonTextColor: `white`,
},
];

///////Re-set colors from localStorage

window.addEventListener("load", function (){

    if(localStorage.getItem("selectedMainColor") !== null){
        document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${localStorage.getItem("selectedMainColor")}`);
        document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${localStorage.getItem("selectedSecondColor")}`);
        document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${localStorage.getItem("selectedThirdColor")}`);
        document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${localStorage.getItem("selectedTextColor")}`);
        document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${localStorage.getItem("selectedButtonTextColor")}`);
    }
    ////Re-write SelecetedColorI class to switch Color
    //////in clickedFun() inside the loop
    document.getElementById(localStorage.getItem("SelcetedColorI")).classList.add("SelectedColorI");
    })




//////////////Switch Theme Function//////////////

function clickedFun(){

    let myColorSwitch = document.getElementsByClassName("colorR");

    /////loop for apply all Fun in every ColorBlockSwitch
    for(i=0; i<myColorSwitch.length; i++){
        myColorSwitch.item(i).onclick = function (e){

            let clickedTheme = `mainColorTheme`;

            ////this code will check the ID of target and get the suited "theme" -by change all root color
            switch(e.target.getAttribute("id")){
                case "mainColorTheme":
                clickedTheme = colorArray[0];
                    break;
                case "secondColorTheme": 
                clickedTheme = colorArray[1];
                    break;
                case "thirdColorTheme": 
                clickedTheme = colorArray[2];
                    break;
                case "forthColorTheme": 
                clickedTheme = colorArray[3];
                    break;
                case "fivthColorTheme": 
                clickedTheme = colorArray[4];
                    break;
            }
            document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${clickedTheme.mainColor}`);
            document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${clickedTheme.secondColor}`);
            document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${clickedTheme.thirdColor}`);
            document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${clickedTheme.textColor}`);
            document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${clickedTheme.buttonTextColor}`);

            /////Make selection theme block diffrent from others.
            //////delete"selectedColorI" class from all elements, then add it for targeted element and save it inside localStorage. 
            for(i=0;i<myColorSwitch.length; i++){
                myColorSwitch[i].classList.remove("SelectedColorI");
                e.target.classList.add("SelectedColorI");
                localStorage.setItem("SelcetedColorI", e.target.getAttribute("id"));
            };

                ////set in localStorage
                //////in the end, the browser will save all this information in localStorage.
            let rootValues = getComputedStyle(document.documentElement);

            localStorage.setItem("selectedMainColor", rootValues.getPropertyValue("--mainColor"));
            localStorage.setItem("selectedSecondColor", rootValues.getPropertyValue("--secondColor"));
            localStorage.setItem("selectedThirdColor", rootValues.getPropertyValue("--thirdColor"));
            localStorage.setItem("selectedTextColor", rootValues.getPropertyValue("--textColor"));
            localStorage.setItem("selectedButtonTextColor", rootValues.getPropertyValue("--buttonTextColor"));
        
        }

        ////Add hover effect

        myColorSwitch.item(i).onmouseenter = function (e){
            e.target.classList.add("opacityClear");
        }
        myColorSwitch.item(i).onmouseleave = function (e){
            e.target.classList.remove("opacityClear")
        }

    } 
}

clickedFun();

////Function check and return colorTheme type


/////SetColor 

// document.styleSheets[0].cssRules[1].style.setProperty(`--mainColor`, `#ff4b27`);
// document.styleSheets[0].cssRules[1].style.setProperty(`--secondColor`, `#eeeeee`);
// document.styleSheets[0].cssRules[1].style.setProperty(`--thirdColor`, `white`);
// document.styleSheets[0].cssRules[1].style.setProperty(`--textColor`, `black`);
// document.styleSheets[0].cssRules[1].style.setProperty(`--buttonTextColor`, `white`);

///what I did?
// let rootValues = getComputedStyle(document.documentElement);
// console.log(rootValues.getPropertyValue("--mainColor"));



///////-------------------------[4]Clear-----------------------------------------
//////////This for Delete Button function/////////////

let clearDiv = document.getElementsByClassName("clearDiv")[0];
let clearButton = document.getElementsByClassName("clearButton")[0];
let clearArrow = document.getElementsByClassName("deleteArrow")[0];



////delete all Tasks and Themes form localStorage 

clearButton.onclick = function(){
    localStorage.clear();
    location.reload();
}

/////Make arrow functionable by move mouse in/out it or by click it


/////By control in perporty of CSS
clearDiv.addEventListener("mouseenter",function (){
    clearButton.style.display = "block";
} )
clearDiv.addEventListener("mouseleave",function (){
    clearButton.style.display = "none";
} )

////By declare a variable and if was odd the code will work and will hide if was even, in the end of code the number will increase a one to keep code work
var Clr = 1;
clearDiv.addEventListener("click",function (){
    if(Clr%2 !== 0){
        clearButton.style.display = "block";

        
    }else if (Clr%2 === 0){
        clearButton.style.display = "none";
    }
    Clr++
} )








