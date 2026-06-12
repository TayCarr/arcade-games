
var warriorPic = document.createElement("img");
var otherWarriorPic = document.createElement("img");
var worldPics = [];

/*var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var flagPic = document.createElement("img");
var goalPic = document.createElement("img");
var treePic = document.createElement("img");*/

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
    imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName){
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages(){

    var imageList = [
        {varName: warriorPic, theFile: "player1car.png"}, 

        {worldType: WORLD_ROAD, theFile: "track_road.png"},
        {worldType: WORLD_WALL, theFile: "track_wall.png"}, 
        {worldType: WORLD_GOAL, theFile: "track_goal.png"},
        {worldType: WORLD_TREE, theFile: "track_tree.png"},
        {worldType: WORLD_FLAG, theFile: "track_flag.png"}
    ];
    //this solves the race condition and solves having to manually set the variable to the images you need to load
    picsToLoad = imageList.length;

    for(var i = 0; i < imageList.length; i++){
        if(imageList[i].varName != undefined){
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        }
        else{
            loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
        }
    }
    
}