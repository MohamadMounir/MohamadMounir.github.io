




let subMenu = {
    aboutSubMenuParent: document.getElementById("About"),
    contactSubMenuParent: document.getElementById("Contact"), 
    
    aboutSubMenu: document.querySelector("#About .SubMenu"),
    contactSubMenu: document.querySelector("#Contact .SubMenu")
};
subMenu.contactSubMenuParent.style.marginTop = "0px";


function makeItHover(ParentEle, Ele){

ParentEle.addEventListener("mouseenter", function(){
    Ele.style.display = "block";
});

ParentEle.addEventListener("mouseleave", function(){
    Ele.style.display = "none";
});


}

makeItHover(subMenu.aboutSubMenuParent, subMenu.aboutSubMenu);
makeItHover(subMenu.contactSubMenuParent, subMenu.contactSubMenu);



let menuNav = document.getElementsByClassName("Nav")[0];

let menuNavIcon = document.getElementById("mainMenu");

let myMainMenu = document.getElementById("mainMenu");

function makeItClickable(Ele){
    Ele.addEventListener("click", function(){
        menuNav.classList.toggle("is-Show");

    })
}

makeItClickable(menuNavIcon);


function makeItClickableParent(parentEle,Ele){
    parentEle.addEventListener("click", function (){
        Ele.classList.toggle("is-Showing");
        if(parentEle.getAttribute("id") === "About" && subMenu.contactSubMenuParent.style.marginTop !== "80px"){
            subMenu.contactSubMenuParent.style.marginTop = "80px";
        }else if(parentEle.getAttribute("id") === "About" && subMenu.contactSubMenuParent.style.marginTop === "80px" ){
            subMenu.contactSubMenuParent.style.marginTop = "0px";
        }

    })
}
makeItClickableParent(subMenu.aboutSubMenuParent, subMenu.aboutSubMenu);
makeItClickableParent(subMenu.contactSubMenuParent, subMenu.contactSubMenu);

