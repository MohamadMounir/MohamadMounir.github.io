

let userScore = document.querySelector(".userScore");
let userName = document.querySelector(".userName");



//////User Information
let UserInfo = {
    Name : "",
}




writingUserName(localStorage.getItem("UserName"));
writingLosingScore(0);








//////Change background for card when second side appear
let myCards = document.querySelectorAll("main .Container .Card");

let cardsFirstSide = document.querySelectorAll("main .Container .Card i:first-child");
let cardsSecondSide = document.querySelectorAll("main .Container .Card i:last-child");

let myCounter = 0;

/////
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



/////Main Function || Clicking Function
myCards.forEach(function (e){

    e.addEventListener("click", function (e){
        /////First two Click 
        if(myCounter === 0){////First one 
            cardClick(e) //// To add classes
            ////Save important information from card 
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

        /////condition if win or lost
        if(myCounter === 2){
            if(userFirstCard.Name === userSecondCard.Name){////Win
                myCounter = 0;
                ClearAllObject()
                ++UserCounter.Win;
                console.log(`win : ${UserCounter.Win}`); /////Gelecekte sileceğim
            }else
            if(userFirstCard.Name !== userSecondCard.Name){/////Lost
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
    });////End for Event.
}); ///End for forEach.




/////Helping Function

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
function carDirect(e){
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

function ClearAllObject(){
    userFirstCard.Name = "";
    userFirstCard.Div = "";
    userFirstCard.Target = {};
    userSecondCard.Name = "";
    userSecondCard.Div = "";
    userSecondCard.Target = {};
}

function CleaCounters(){
    UserCounter.Loss = 0;
    UserCounter.Win = 0;
}




function writingLosingScore(num){
    userScore.textContent = `${num}`;
}
function writingUserName(name){
    if(typeof name === "string"){
        userName.textContent = `${name}`;
        UserInfo.Name = `${name}`;
    }else{
        userName.textContent = ``;
        UserInfo.Name = ``;
    }

}




/////MenuButton

let myMenuButton = document.getElementById("myMenu");
let menuBars = document.querySelectorAll(".menuButton .MenuBar");
let myMenu = document.getElementById("menuInterface");

myMenuButton.addEventListener("click", function (){
    menuBars.forEach(function (e){
        e.classList.toggle("MenuEnable");
    })
    myMenuButton.classList.toggle("MenuEnable");
    myMenu.classList.toggle("ShowBlock");
});


/////Restart Button
let restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function (){
    ClearAllObject();
    CleaCounters();
    writingLosingScore(0);
    writingUserName("");
    myCards.forEach(function (e){
        carDirect(e)
    });
    localStorage.clear();
});



////Entering Name 
let myEnterButton = document.getElementById("enterButton");
let textArea = document.getElementById("enterTextArea");

function enterName(){
    writingUserName(textArea.value);
    localStorage.setItem("UserName", UserInfo.Name);
    textArea.value = "";
}


/////Functions for entering name by click or enter button
myEnterButton.addEventListener("click", function (){
    enterName();
});
textArea.addEventListener("keyup", function (e){

    if(e.code === "Enter"){
        enterName();
    }else{
        e.preventDefault();
    }
});

