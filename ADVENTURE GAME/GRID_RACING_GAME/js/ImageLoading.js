
var warriorPic = document.createElement("img");
var warriorPic2 = document.createElement("img");
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
        {varName: warriorPic, theFile: "warrior.png"}, 
        {varName: warriorPic2, theFile: "warrior2.png"},

        {worldType: WORLD_ROAD, theFile: "world_road.png"},
        {worldType: WORLD_WALL, theFile: "world_wall.png"}, 
        {worldType: WORLD_GOAL, theFile: "world_goal.png"},
        {worldType: WORLD_KEY, theFile: "world_key.png"},
        {worldType: WORLD_DOOR, theFile: "world_door.png"},
        {worldType: WORLD_DOOR_OPEN, theFile: "world_door_open.gif", gifType: true}
    ];
    //this solves the race condition and solves having to manually set the variable to the images you need to load
    picsToLoad = imageList.length;

    for(var i = 0; i < imageList.length; i++){
        if(imageList[i].varName != undefined){
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
            //console.log("loaded: "+imageList[i].theFile);
        }
        else{
            //TODO getting the animation of sleeping dog to work will need to do some googling...
            //i think it needs to be images that are drawn in not a gif...
            /** 
            if(imageList[i].gifType != undefined){
                console.log("true: "+imageList[i].theFile);
                worldPics[imageList[i].worldType] = document.createElement("gif");
                console.log(worldPics[imageList[i].worldType]);
                beginLoadingImage(worldPics[imageList[i].worldType], imageList[i].theFile);
            }
            else{
                loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
            }
            */
            loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
            
        }
    }
    
}