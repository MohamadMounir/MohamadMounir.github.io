let allColor = document.querySelectorAll(".BottomSide > img")
let webBody = document.body;
let rightImg = document.getElementById("rightImg");



allColor.forEach(e => {
    e.addEventListener("click", ele => {
        let id = ele.target.getAttribute("id");
        webBody.classList = `${id}`;

        let src = ele.target.getAttribute("src");
        rightImg.setAttribute("src", `${src}`);
    });
});


function takeNameColor(text){

}

// let num = id.search(/C/);
// let idArr = id.split("")
// let color = idArr.slice(0,num).join("")
// // webBody.className = `${color}`
// webBody.style.backgroundColor = `${color}`
// // let color2 ;
// let src = ele.target.getAttribute("src");


/////Menu function
let menuIcon = document.getElementById("menuIcon");
let menuNav = document.getElementById("menuNav");

menuIcon.addEventListener("click", function (){
    // menuIcon.className = ""
    menuIcon.classList.toggle("closeSym");
    menuNav.classList.toggle("menuScreen")
});
