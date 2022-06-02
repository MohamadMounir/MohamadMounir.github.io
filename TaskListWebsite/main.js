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






///////-------------------------[3]ChangeColor-----------------------------------------


/////Color set

let mainColorTheme = {
    mainColor: `#ff4b27`,
    secondColor: `#eeeeee`,
    thirdColor: `white`,
    textColor: `black`,
    buttonTextColor: `white`,
};

///Default Theme 
//////Not Yet...........................................

let secondColorTheme = {
    mainColor: `#003B46`,
    secondColor: `#66A5AD`,
    thirdColor: `#C4DFE6`,
    textColor: `black`,
    buttonTextColor: `white`,
};
let thirdColorTheme = {
    mainColor: `#379683`,
    secondColor: `#8ee4af`,
    thirdColor: `#edf5e1`,
    textColor: `black`,
    buttonTextColor: `white`,
};
let forthColorTheme = {
    mainColor: `#66fcf1`,
    secondColor: `#45a29e`,
    thirdColor: `#1f2833`,
    textColor: `#c5c6c7`,
    buttonTextColor: `white`,
};
let fivthColorTheme = {
    mainColor: `#86c232`,
    secondColor: `#61892f`,
    thirdColor: `#222629`,
    textColor: `white`,
    buttonTextColor: `white`,

};


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

    document.getElementById(localStorage.getItem("SelcetedColorI")).classList.add("SelcetedColorI");
console.log(document.getElementById(localStorage.getItem("SelcetedColorI")).classList.add("SelcetedColorI"));
    

    })








////Switch Function

function clickedFun(){
    ////get elements
    let myColorSwitch = document.getElementsByClassName("colorR");

    /////Changing color Fun
    for(i=0; i<myColorSwitch.length; i++){
        myColorSwitch.item(i).onclick = function (e){
            switch(e.target.getAttribute("id")){
                
                case "mainColorTheme":
                    document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${mainColorTheme.mainColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${mainColorTheme.secondColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${mainColorTheme.thirdColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${mainColorTheme.textColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${mainColorTheme.buttonTextColor}`);
                    break;
                case "secondColorTheme": 
                    document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${secondColorTheme.mainColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${secondColorTheme.secondColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${secondColorTheme.thirdColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${secondColorTheme.textColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${secondColorTheme.buttonTextColor}`);
                    break;
                case "thirdColorTheme": 
                    document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${thirdColorTheme.mainColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${thirdColorTheme.secondColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${thirdColorTheme.thirdColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${thirdColorTheme.textColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${thirdColorTheme.buttonTextColor}`);
                    break;
                case "forthColorTheme": 
                    document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${forthColorTheme.mainColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${forthColorTheme.secondColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${forthColorTheme.thirdColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${forthColorTheme.textColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${forthColorTheme.buttonTextColor}`);
                    break;
                case "fivthColorTheme": 
                    document.styleSheets[0].cssRules[0].style.setProperty(`--mainColor`, `${fivthColorTheme.mainColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--secondColor`, `${fivthColorTheme.secondColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--thirdColor`, `${fivthColorTheme.thirdColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--textColor`, `${fivthColorTheme.textColor}`);
                    document.styleSheets[0].cssRules[0].style.setProperty(`--buttonTextColor`, `${fivthColorTheme.buttonTextColor}`);
                    break;


            }

            for(i=0;i<myColorSwitch.length; i++){
                myColorSwitch[i].classList.remove("SelectedColorI");
                e.target.classList.add("SelectedColorI");
                localStorage.setItem("SelcetedColorI", e.target.getAttribute("id"));

            };

                ////set in localStorage
            let rootValues = getComputedStyle(document.documentElement);

            localStorage.setItem("selectedMainColor", rootValues.getPropertyValue("--mainColor"));
            localStorage.setItem("selectedSecondColor", rootValues.getPropertyValue("--secondColor"));
            localStorage.setItem("selectedThirdColor", rootValues.getPropertyValue("--thirdColor"));
            localStorage.setItem("selectedTextColor", rootValues.getPropertyValue("--textColor"));
            localStorage.setItem("selectedButtonTextColor", rootValues.getPropertyValue("--buttonTextColor"));
        
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





/////RegulareExpression

// let myTaskRe = /Task\d+/;
// for(i=0; i<localStorage.length;i++){

//     console.log(myTaskRe.test(localStorage.key(i)));
//     if(myTaskRe.test(localStorage.key(i))){
//         console.log(localStorage.getItem(localStorage.key(i)));
//     }
// }
// console.log(localStorage.key(0));




// let clearButton = document.getElementsByClassName("clearButton")[0];

// console.log(clearButton);

// clearButton.onclick = function(){
//     localStorage.clear();
// }


// console.log(localStorage.getItem("SelcetedColorI"));

