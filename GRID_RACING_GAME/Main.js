
/**********************
 * THINGS YOU COULD ADD !! TODO !!
 * 
 *****************************/
var canvas, canvasContext;



window.onload = function(){ //gets called as soon as html page finishes loading
    canvas = document.getElementById('gameCanvas'); //get width and height
    canvasContext = canvas.getContext('2d'); //grabs the actual graphics buffer

    //very basic loading screen
    colorRect(0, 0, canvas.width, canvas.height, 'red');
    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
    //

    loadImages();
}

function imageLoadingDoneSoStartGame(){

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setUpInput();

    carReset();

}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){

    carMove();
    carTrackHandling();
    
}

function clearScreen(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawAll(){
    //tracks
    drawTracks();

    carDraw();//need to draw car after tracks or it is drawn behind the tracks
}
