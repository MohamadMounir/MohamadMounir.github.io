///////Declare 
let myRangs = document.querySelectorAll(`input[type="range"]`);

let restButton = document.getElementById("restButton");
let uploadButton = document.getElementById("uploadButton");
let downloadButton = document.getElementById("downloadButton");

let inputImage = document.getElementById("inputImage");

let canvas = document.getElementById("inputCanvas");
let ctx = canvas.getContext("2d");

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
    ctx.filter = `saturate(${sat}%) contrast(${cont}%) brightness(${bri}%) sepia(${sepia}%) grayscale(${grScl}%) blur(${(blur)/20}px) hue-rotate(${(hue)*3.6}deg)`;
    ctx.drawImage(inputImage,0,0,canvas.width,canvas.height);

}
function changeFun(ele){
    let myValue = ele.value;
    let currentValue = 100;
    let currentValueZ = 0;
    ele.addEventListener("input", function (){
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
            userNewValue.blur = currentValueZ+(ele.value - myValue);
            currentValueZ = currentValueZ+(ele.value - myValue);
        }else if(ele.id === "hueRotate"){
            userNewValue.hueRotate = currentValueZ+(ele.value - myValue);
            currentValueZ = currentValueZ+(ele.value - myValue);
        }
        myValue = ele.value;

        applyChange(userNewValue.saturate, userNewValue.contrast, userNewValue.brightness, userNewValue.speia, userNewValue.grayScale,userNewValue.blur,userNewValue.hueRotate);

    
    })
}

function restart(){
    setValueRanges()
    userNewValue.saturate = 100;
    userNewValue.contrast = 100;
    userNewValue.brightness = 100;
    userNewValue.speia = 0;
    userNewValue.grayScale = 0;
    userNewValue.blur =0;
    userNewValue.hueRotate = 0;
    applyChange(100, 100,100,0,0,0,0);
}
////Button Function

restButton.onclick = function (){
    restart()
}

uploadButton.addEventListener("change", function (){
    restart();
    let reader = new FileReader();
    reader.addEventListener("load", function (){
        inputImage.setAttribute(`src`,`${reader.result}`);
    })
    reader.readAsDataURL(this.files[0]);
    inputImage.addEventListener("load",function (){
        canvas.width = inputImage.width;
        canvas.height = inputImage.height;
        ctx.drawImage(inputImage,0,0,canvas.width,canvas.height);
        inputImage.style.display = "none";
    })

})

downloadButton.onclick = function (){
    downloadButton.href = canvas.toDataURL();

}
myRangs.forEach((ele)=> changeFun(ele));

