
var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

var picsToLoad = 0;//sets based on imageList.length in loadImages()

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName){
    //below can cause a race condition, if computer is fast enough it can call to load the pic then finish loading that pic before 
    //  moving on to the next pic calling the start of the game multiple times, causing performance issues
    //  a safer way to do this same sort of loading is to use like a dictionary structure with var and names and loop through
    //picsToLoad++;
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}


function loadImages(){

    var imageList = [
        {varName: carPic, theFile: "player1car.png"}, 
        {varName: roadPic, theFile: "track_road.png"},
        {varName: wallPic, theFile: "track_wall.png"}
    ];
    //this solves the race condition and solves having to manually set the variable to the images you need to load
    picsToLoad = imageList.length;

    for(var i = 0; i < imageList.length; i++){
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
    
}