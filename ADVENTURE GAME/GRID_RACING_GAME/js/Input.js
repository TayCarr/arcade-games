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
    canvas.addEventListener('mousemove', updateMousePos); //TODO maybe on hover the reset button glows or enlarges or something

    canvas.addEventListener('click', mouseClick);//check if the reset button was clicked

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW , KEY_DOWN_ARROW, KEY_LEFT_ARROW);

}

function mouseClick(evt){
    //gets the position of the canvas on the page, so if there is text or something else on the page it will account for that
    var rect = canvas.getBoundingClientRect(); 
    var root = document.documentElement;

    //subtract how far the canvas is from the left side and how much a person has scrolled the page
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    console.log("clicked at x: "+mouseX+" y: "+mouseY);
    //if user clicked between x positions and y positions then warrior.reset? 
    if(mouseX < 770 && mouseX > 725 && mouseY < 650 && mouseY > 600){
        loadLevel(levelOne); //TODO if other levels i guess load that level again?
    }

}

function updateMousePos(evt){
    //gets the position of the canvas on the page, so if there is text or something else on the page it will account for that
    var rect = canvas.getBoundingClientRect(); 
    var root = document.documentElement;

    //subtract how far the canvas is from the left side and how much a person has scrolled the page
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}
/*
* Since keyPressed and keyReleased were basically the same code, made this helper function 
* so that instead it passes true/false to set the key to that rather than basically have duplicate code
*/
function keySet(keyEvent, whichWarrior, setTo){
    if(keyEvent.keyCode == whichWarrior.controlKeyLeft){
        whichWarrior.keyHeld_West = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyRight){
        whichWarrior.keyHeld_East = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyUp){
        whichWarrior.keyHeld_North = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyDown){
        whichWarrior.keyHeld_South = setTo;
    }

}

function keyPressed(evt){
    //how to see the value for the key being pressed, easy way to get for use later
    //console.log("Key pressed: "+evt.keyCode);

    keySet(evt, blueWarrior, true);
    evt.preventDefault();

}

function keyReleased(evt){
    //console.log("Key released: "+evt.keyCode);

    keySet(evt, blueWarrior, false);
}
