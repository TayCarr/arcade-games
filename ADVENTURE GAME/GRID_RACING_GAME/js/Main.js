
/**********************
 * THINGS YOU COULD ADD !! TODO !!
 * give up button, reset the game so if you frick up with keys 
 * Levels
 * custom graphics
 * different blocks different results
 * power ups
 * UI displaying inventory
 * hidden short cuts, like a buch that looks slightly diff and you can walk through
 * i could clean up the variable names tile/road blah blah 
 * when left arrow could flip image? do a transformation maybe? not make new flipped img?
 * win condition?? find dews rope toy to bring to her if dont have she just ?? you if you have she <3
 *****************************/
var canvas, canvasContext;

var blueWarrior = new warriorClass();


window.onload = function(){ //gets called as soon as html page finishes loading
    canvas = document.getElementById('gameCanvas'); //get width and height
    canvasContext = canvas.getContext('2d'); //grabs the actual graphics buffer

    //very basic loading screen
    colorRect(0, 0, canvas.width, canvas.height, 'white');
    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
    //

    loadImages();
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setUpInput();

    loadLevel(levelOne);

}

function loadLevel(whichLevel){

    //.slice() is a way to copy the world level, as world=level just points to the same place in memory 
    //and the changes we make to world will also change level so we will not be able to use level to restore the map on reset
    worldGrid = whichLevel.slice();
    blueWarrior.reset(warriorPic, warriorPic2, "Blue");
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){

    blueWarrior.move();
    
}

function clearScreen(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawAll(){
    //worlds
    drawWorlds();

    blueWarrior.draw();//need to draw warrior after worlds or it is drawn behind the worlds

    blueWarrior.drawText();
}
