var mouseX = 0;
var mouseY = 0;

//player 2(green)
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
//player 1(blue)
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

function setUpInput(){
    //capture mouse movement
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);

}

function updateMousePos(evt){
    //gets the position of the canvas on the page, so if there is text or something else on the page it will account for that
    var rect = canvas.getBoundingClientRect(); 
    var root = document.documentElement;

    //subtract how far the canvas is from the left side and how much a person has scrolled the page
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    //*****FOR TESTING MAKE CAR ON MOUSE
    /*carX = mouseX;
    carY = mouseY;
    carSpeedX = 3;
    carSpeedY = -4;*/
    //****
}
/*
* Since keyPressed and keyReleased were basically the same code, made this helper function 
* so that instead it passes true/false to set the key to that rather than basically have duplicate code
*/
function keySet(keyEvent, whichCar, setTo){
    if(keyEvent.keyCode == whichCar.controlKeyLeft){
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyRight){
        whichCar.keyHeld_TurnRight = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyUp){
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown){
        whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt){
    //how to see the value for the key being pressed, easy way to get for use later
    //console.log("Key pressed: "+evt.keyCode);

    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);

}

function keyReleased(evt){
    //console.log("Key released: "+evt.keyCode);

    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
}
