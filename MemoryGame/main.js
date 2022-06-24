
//////-----------------------------------------------------------------------------------------
//////-------------All Declare



/////Nav information
let userScore = document.querySelectorAll(".userScore");
let userName = document.querySelectorAll(".userName");


//////User Information
let UserInfo = {
    Name : "",
}



//////Change background for card when second side appear
////helping mycard() function
let myCards = document.querySelectorAll("main .Container .Card");

let cardsFirstSide = document.querySelectorAll("main .Container .Card i:first-child");
let cardsSecondSide = document.querySelectorAll("main .Container .Card i:last-child");

let myCounter = 0;

/////User scores
let UserCounter = {
    Win: 0,
    Loss: 0,
}


////Important Value, by them I could know the first and the second card.
let userCards = {
    FirstCard: {
        Name: "",
        Div: "",
        Target: {},
    },
    SecondCard: {
        Name: "",
        Div: "",
        Target: {},
    },
}
let userFirstCard = userCards.FirstCard;
let userSecondCard = userCards.SecondCard;

/////End mycard()--------

/////MenuButton

let myMenuButton = document.getElementById("myMenu");
let menuBars = document.querySelectorAll(".menuButton .MenuBar");
let myMenu = document.getElementById("menuInterface");

/////Restart Button
let restartButton = document.getElementById("restartButton");

/////Again Button 
let againButton = document.getElementById("againButton");

////Entering Name 
let myEnterButton = document.getElementById("enterButton");
let textArea = document.getElementById("enterTextArea");


/////Cencel Button
let cencelButton = document.querySelector(".cencelButton");


/////Win Screen
let winScreen = document.getElementById("winScreen");


////Load Sound
let clickSound = new Audio("Sound/Click1.mp3");
let winSound = new Audio("Sound/BioShockHakingSucces.mp3");

/////Set default Value 

writingUserName(localStorage.getItem("UserName"));
writingLosingScore(0);


/////-----End

myCards[0].classList.contains

//////Change background for card when second side appear

/////Main Function || Clicking Function
myCards.forEach(function (e){


    e.addEventListener("click", function (e){

        if(e.target.classList.contains("AppearClass")){
            e.preventDefault();
        }else{
        /////First two Click 
        if(myCounter === 0){////First one 
            cardClick(e) //// To add classes
            ////Save important information from card 
            clickSound.play();
            userFirstCard.Name = e.target.children[1].classList[1];
            userFirstCard.Div = e;
            userFirstCard.Target = e.target;


            ++myCounter;
        }else if(myCounter === 1){////Second one 
            if(e.target === userFirstCard.Target){////aviod if the second one same for first.
                e.preventDefault();
            }else{
                cardClick(e) //// To add classes
                ////Save important information from card 
                userSecondCard.Name = e.target.children[1].classList[1];
                userSecondCard.Div = e;
                userSecondCard.Target = e.Target;
                ++myCounter;
            }
        }
        }



        /////condition if win or lost
        if(myCounter === 2){
            if(userFirstCard.Name === userSecondCard.Name){////Win
                myCounter = 0;
                ClearAllObject()
                winSound.play()
                ++UserCounter.Win;
            }else
            if(userFirstCard.Name !== userSecondCard.Name){/////Lost
                clickSound.play();
                ++UserCounter.Loss;
                writingLosingScore(UserCounter.Loss);
                myCounter = 3;
                setTimeout(function (){////Time for player to realize 
                    ////Re-hide it
                    cardClick(userFirstCard.Div);
                    cardClick(userSecondCard.Div);
                    myCounter = 0;
                    setTimeout(function (){
                        ClearAllObject()
                    },1)

                }, 1000);
            }
        }
        //////If all card reviewed
        if(UserCounter.Win === 10){
            winScreen.style.display = "block";
        }

    });////End for Event.
}); ///End for forEach.




/////Helping Functions

function cardClick(e){///// Add/Remove classes form target
    //////animation flip
    e.target.classList.toggle("FlipAnimationByClick");
    /////timeout for be perfect with animation
    setTimeout(function (){
        e.target.classList.toggle("NormalClass");
        e.target.classList.toggle("AppearClass");
        e.target.classList.toggle("FlipAnimationByClick");
    },200);//// 0.2s in card css too
}
function carDirect(e){///// Same Card Click, Para e = e.target.
        //////animation flip
        e.classList.remove("FlipAnimationByClick");
        /////timeout for be perfect with animation
        setTimeout(function (){
            e.classList.remove("NormalClass");
            e.classList.add("NormalClass");
            e.classList.remove("AppearClass");
            e.classList.remove("FlipAnimationByClick");
        },200);//// 0.2s in card css too
}

function ClearAllObject(){/////for clear object that use in Main Function || Clicking Function
    userFirstCard.Name = "";
    userFirstCard.Div = "";
    userFirstCard.Target = {};
    userSecondCard.Name = "";
    userSecondCard.Div = "";
    userSecondCard.Target = {};
}

function ClearSocres(){
    ClearAllObject();
    CleaCounters();
    writingLosingScore(0);
    myCards.forEach(function (e){
        carDirect(e)
    });
}

function CleaCounters(){////be alone because I'll use it multiable times 
    UserCounter.Loss = 0;
    UserCounter.Win = 0;
}

function writingLosingScore(num){
    userScore.forEach(function (e){
        e.textContent = `${num}`;
    })

}

function writingUserName(name){
    if(typeof name === "string"){
        userName.forEach(function(e){
            e.textContent = `${name}`;
        })

        UserInfo.Name = `${name}`;
    }else{////if wasn't, be empty
        userName.forEach(function(e){
            e.textContent = ``;
        })
        UserInfo.Name = ``;
    }

}

function clearInfo(){/////Clear All data 
    ClearSocres()
    writingUserName("");
    localStorage.clear();
}

function enterName(){
    writingUserName(textArea.value);
    localStorage.setItem("UserName", UserInfo.Name);
    textArea.value = "";
    clickMenuButton();
}
function hideWinScreen(){
    winScreen.style.display = "none";
}
function clickMenuButton(){
    menuBars.forEach(function (e){
        e.classList.toggle("MenuEnable");
    })
    myMenuButton.classList.toggle("MenuEnable");
    myMenu.classList.toggle("ShowBlock");
}

/////Helping Functions-----End



///////////////////UI function and Anonymos** Fun



/////MenuButton, Show the menu by it
myMenuButton.addEventListener("click",clickMenuButton);


/////Restart Button, apply the function
restartButton.addEventListener("click",function (){
    clickMenuButton();
    clearInfo();
});

/////Again Button 
againButton.addEventListener("click",function (){
    ClearSocres();
    hideWinScreen();
});


/////Functions for entering name by click or enter button
myEnterButton.addEventListener("click", enterName); ////By Click
textArea.addEventListener("keyup", function (e){////By keyboard
    e.preventDefault();
    if(e.code === "Enter"){
        enterName();
    }
});

/////cencel button of the Win Screen
cencelButton.addEventListener("click", hideWinScreen);



