



// Popular Function
/////This function have to spawn "popularChild" to Popular-Div
window.addEventListener("load", function (){
    let isPopular = false;
    let where = undefined;
    let plans = document.querySelectorAll("div.plan");
    plans.forEach(function(e){
        e.classList.forEach(function (classN){
            if(classN === "Popular"){
                isPopular = true;
                where = e;
            }
        })
    })
    if(isPopular){
        ////Create the popularChild
        let popularChild = document.createElement("li")
        popularChild.className = "popularChild DisplayFlex between";
        let discount = document.createElement("h3");
        discount.textContent =  `save 32%`;
        let icon = document.createElement("i");
        icon.className = "fa-solid fa-circle-check";
        popularChild.appendChild(discount);
        popularChild.appendChild(icon);
        where.children[1].appendChild(popularChild)
    }
    where = where.children[1].children[0].children[0].children[0];
    makeDiscount(95,32,where)
});

////Helping Functions
///////Take the price and discount, and give the price after discont.
function makeDiscount(Price,discount,target){
    let discountR = (100 - discount)/100;
    let newPrice = Math.floor(Price * discountR);
    let span = document.createElement("span")
    span.className = "firstPrice"
    span.textContent = `$${Price}`;
    target.textContent = `${newPrice} `;
    target.appendChild(span);
}