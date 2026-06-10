var mouseX = 0;
var mouseY = 0;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

function setUpInput(){
    //capture mouse movement
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

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

function keyPressed(evt){
    //how to see the value for the key being pressed, easy way to get for use later
    //console.log("Key pressed: "+evt.keyCode);

    if(evt.keyCode == KEY_LEFT_ARROW){
        keyHeld_TurnLeft = true;
    }
    if(evt.keyCode == KEY_RIGHT_ARROW){
        keyHeld_TurnRight = true;
    }
    if(evt.keyCode == KEY_UP_ARROW){
        keyHeld_Gas = true;
    }
    if(evt.keyCode == KEY_DOWN_ARROW){
        keyHeld_Reverse = true;
    }

}

function keyReleased(evt){
    //console.log("Key released: "+evt.keyCode);
    if(evt.keyCode == KEY_LEFT_ARROW){
        keyHeld_TurnLeft = false;
    }
    if(evt.keyCode == KEY_RIGHT_ARROW){
        keyHeld_TurnRight = false;
    }
    if(evt.keyCode == KEY_UP_ARROW){
        keyHeld_Gas = false;
    }
    if(evt.keyCode == KEY_DOWN_ARROW){
        keyHeld_Reverse = false;
    }
}
