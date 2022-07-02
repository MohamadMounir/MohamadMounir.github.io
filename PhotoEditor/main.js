///////Declare 
let myRangs = document.querySelectorAll(`input[type="range"]`);

let restButton = document.getElementById("restButton");
let uploadButton = document.getElementById("uploadButton");

let inputImage = document.getElementById("inputImage");
let photoContainer = document.getElementById("photoContainer");


let defaultRangeValue = {
    Sat: 50,
    Contrast: 50,
    Bright: 50,
    Sepia: 0,
    GrayScale: 0,
    Blur: 0,
    HueRo: 0,
}
let userNewValue = {
    saturate: 100,
    contrast: 100,
    brightness: 100,
    speia: 0,
    grayScale: 0,
    blur: 0,
    hueRotate: 0,
}





/////SetValues
setValueRanges();
applyChange(100);

/////Helping Functions

function setValueRanges(){
    myRangs[0].value = defaultRangeValue.Sat;
    myRangs[1].value = defaultRangeValue.Contrast;
    myRangs[2].value = defaultRangeValue.Bright;
    myRangs[3].value = defaultRangeValue.Sepia;
    myRangs[4].value = defaultRangeValue.GrayScale;
    myRangs[5].value = defaultRangeValue.Blur;
    myRangs[6].value = defaultRangeValue.HueRo;
}
function applyChange(sat, cont, bri, sepia, grScl,blur,hue){
    photoContainer.style.filter = `saturate(${sat}%) contrast(${cont}%) brightness(${bri}%) sepia(${sepia}%) grayscale(${grScl}%) blur(${blur}px) hue-rotate(${hue}deg)`;
}


////Button Function

restButton.onclick = function (){
    setValueRanges()
    applyChange(100, 100,100,0,0,0,0)
}

uploadButton.addEventListener("change", function (){
    let reader = new FileReader();
    reader.addEventListener("load", function (){
        photoContainer.style.backgroundImage = `url(${reader.result})`;

    })
    reader.readAsDataURL(this.files[0]);
})


myRangs.forEach(function (ele){
    let myValue = ele.value;
    let currentValue = 100;
    let currentValueZ = 0;

    
    ele.addEventListener("change", function (){
        if(ele.id === "saturate" || ele.id === "contrast" || ele.id === "brightness"){
            switch (ele.id){
                case "saturate":
                    userNewValue.saturate = (currentValue+(ele.value - myValue));
                    break;
                case "contrast": 
                    userNewValue.contrast = (currentValue+(ele.value - myValue));
                    break;
                case "brightness": 
                    userNewValue.brightness = (currentValue+(ele.value - myValue));
                    break;
            }
            currentValue = currentValue+(ele.value - myValue);
        }else if(ele.id === "sepia" || ele.id === "grayscale"){
            switch (ele.id){
                case "sepia": 
                    userNewValue.speia = (currentValueZ+(ele.value - myValue));

                    break;
                case "grayscale":
                    userNewValue.grayScale = (currentValueZ+(ele.value - myValue));
                    break;
            }
            currentValueZ = currentValueZ+(ele.value - myValue);
        }else if(ele.id === "blur"){
            userNewValue.blur = (currentValueZ+(ele.value - myValue))/20;
            currentValueZ = currentValueZ+(ele.value - myValue);
        }else if(ele.id === "hueRotate"){
            userNewValue.hueRotate = (currentValueZ+(ele.value - myValue))*3.6;
            currentValueZ = currentValueZ+(ele.value - myValue);
        }
        myValue = ele.value;

        applyChange(userNewValue.saturate, userNewValue.contrast, userNewValue.brightness, userNewValue.speia, userNewValue.grayScale,userNewValue.blur,userNewValue.hueRotate);

    
    })
    
})


