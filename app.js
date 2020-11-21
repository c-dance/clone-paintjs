const CANVAS = document.getElementById("jsCanvas");
const CTX = CANVAS.getContext("2d"); //pixels of canvas
const COLORS = document.getElementsByClassName("jsColor");
const RANGE = document.getElementById("jsRange");
const MODE= document.getElementById("jsMode");
const SAVE = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

CANVAS.width = CANVAS_SIZE; //window of pixels manipulation
CANVAS.height = CANVAS_SIZE;

CTX.fillStyle = "white";
CTX.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
CTX.strokeStyle = INITIAL_COLOR;
CTX.fillStyle= INITIAL_COLOR;
CTX.lineWidth = 2.5;

/*painting : start / stop */
let painting = false; 

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

let filling = false;

/* follow up point(x,y) */
function onMouseMove(event){
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!painting){ //without clicking
        CTX.beginPath(); //path is a line
        CTX.moveTo(X,Y); //follow the path
    }else{
        CTX.lineTo(X,Y); //make a line from position to position
        CTX.stroke(); //stroke the line
    }
}



function handleColorClick(event){
    //console.log(event.target.style);
    const COLOR = event.target.style.backgroundColor;
    CTX.strokeStyle = COLOR;
    CTX.fillStyle = COLOR;

}

function handleRangeChange(event){
    console.log(event.target.value);
    const SIZE = event.target.value;
    CTX.lineWidth = SIZE;

}

function handleModeClick(event){
    if(filling===true){
        filling = false;
        MODE.innerText = "FILL";
    }else{
        filling = true;
        MODE.innerText = "PAINT";
    }
}

function handleCanvasClick(event){
    if(filling) CTX.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleSaveClick(event){
    const IMG = CANVAS.toDataURL(); //default:.PNG
    const LINK = document.createElement("a");
    LINK.href = IMG;
    LINK.download = "paingjs";
    LINK.click();

}

function handleCM(event){
    event.preventDefault();
}

if(CANVAS){
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("mousedown", startPainting); //clicking event
    CANVAS.addEventListener("mouseup", stopPainting);
    CANVAS.addEventListener("mouseleave", stopPainting);
    CANVAS.addEventListener("click", handleCanvasClick);
    CANVAS.addEventListener("contextmenu", handleCM);
};

Array.from(COLORS).forEach(color =>
        color.addEventListener("click", handleColorClick));

if(RANGE){
    RANGE.addEventListener("input", handleRangeChange);
}

if(MODE){
    MODE.addEventListener("click", handleModeClick);
}

if(SAVE){
    SAVE.addEventListener("click", handleSaveClick);
}