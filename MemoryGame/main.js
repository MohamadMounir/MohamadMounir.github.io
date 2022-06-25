
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
let clickSound = document.getElementById("clickSound");
let winSound = document.getElementById("succesSound");

/////Set default Value 

writingUserName(localStorage.getItem("UserName"));
writingLosingScore(0);

clickMenuButton();

/////-----End


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
            setTimeout(function (){
                winScreen.style.display = "block";
            },800);
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
function cardDirect(e){///// Same Card Click, Para e = e.target.
        //////animation flip
        e.classList.add("FlipAnimationByClick");
        /////timeout for be perfect with animation
        setTimeout(function (){
            e.classList.remove("NormalClass");
            e.classList.add("NormalClass");
            e.classList.remove("AppearClass");
            e.classList.remove("FlipAnimationByClick");
        },200);//// 0.2s in card css too
}
function showCard(e){
        //////animation flip
        e.classList.add("FlipAnimationByClick");
        /////timeout for be perfect with animation
        setTimeout(function (){
            e.classList.remove("NormalClass");
            e.classList.remove("AppearClass");
            e.classList.add("AppearClass");
            e.classList.remove("FlipAnimationByClick");
        },200);//// 0.2s in card css too
}
function showCardsforS(){
    myCards.forEach(function (e){
        showCard(e);
    });
    myCards.forEach(function (e){
        setTimeout(function (){
            cardDirect(e); 
        },2000);
    });

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
    CleaeCounters();
    writingLosingScore(0);
    myCards.forEach(function (e){
        cardDirect(e)
    });
}

function CleaeCounters(){////be alone because I'll use it multiable times 
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
    if(textArea.value !== ""){
        writingUserName(textArea.value);
        localStorage.setItem("UserName", UserInfo.Name);
        textArea.value = "";
    }else if(textArea.value === ""){
        localStorage.getItem("UserName");
    }
    randomSort();
    clickMenuButton();
    showCardsforS();
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

function randomSort(){
    let myRandomArr = [];
    for(i=0; i<myCards.length; i++){
        let myRandom = Math.floor((Math.random() * 20));
        if(!myRandomArr.includes(myRandom)){
            myCards[i].classList.add(`gridOrderCard${myRandom}`);
            myRandomArr.unshift(myRandom);
        }else{////If number not new, it will enter another loop to make a new number
            for(I=0; I<myCards.length; I++){
                let myRandom = Math.floor((Math.random() * 20));
                if(!myRandomArr.includes(myRandom)){
                    myCards[i].classList.add(`gridOrderCard${myRandom}`);
                    myRandomArr.unshift(myRandom);
                    break;
                }    
            }
        }
    }
}
/////Helping Functions-----End



///////////////////UI function and Anonymos** Fun



/////MenuButton, Show the menu by it
myMenuButton.addEventListener("click",clickMenuButton);


/////Restart Button, apply the function
restartButton.addEventListener("click",function (){
    clickMenuButton();
    clearInfo();
    randomSort();
    showCardsforS();
});

/////Again Button 
againButton.addEventListener("click",function (){
    ClearSocres();
    hideWinScreen();
    randomSort();
    showCardsforS();
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




/////Random Order System
// window.addEventListener("load",function(){
//     randomSort();
//     showCardsforS();
// });

////Show card for a few seconds
