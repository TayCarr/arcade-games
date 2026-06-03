
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

//track dimensions
//TODO when making the tiles set the to 40x40 OR whatever WxH you have below
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

//numbers to to draw the map layout 
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];
// 1 -> wall, 0 -> road, 2 -> car start position
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

function trackLoadImages(){
    roadPic.src = "track_road.png";
    wallPic.src = "track_wall.png";
}

function isWallAtColRow(col, row){
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] == TRACK_WALL;
    }
    else{
        return false;
    }
}

function carTrackHandling(){
    /*********USED WITH TESTING collision on mouse
    //write mouse coordinates
    var mouseTrackCol = Math.floor(mouseX / TRACK_W);
    var mouseTrackRow = Math.floor(mouseY / TRACK_H);
    var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');
    }********/

    //car collision
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    //colorText(carTrackCol+","+carTrackRow+":"+trackIndexUnderCar, mouseX, mouseY, 'yellow');

    //remove the track at index under car 
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
        if(isWallAtColRow(carTrackCol, carTrackRow)){//only need to do if there is a track there else do nothing
            //next two lines fix a bug, undoes the car movement which got it into a wall
            //makes the walls more solid
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;

            carSpeed *= -0.5; //bumps the car and reduces the speed on collision
            
        }//end of track collision switch  
    }//end of collision check
}//end of car track handling function

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}

function drawTracks(){
    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arrayIndex] == TRACK_ROAD){
                canvasContext.drawImage(roadPic, TRACK_W*eachCol, TRACK_H*eachRow);

                //colorRect(TRACK_W*eachCol, TRACK_H*eachRow, TRACK_W - TRACK_GAP ,TRACK_H - TRACK_GAP, 'blue');
            }//end of checking if track is there
            else if(trackGrid[arrayIndex] == TRACK_WALL){
                canvasContext.drawImage(wallPic, TRACK_W*eachCol, TRACK_H*eachRow);
            }

        
        }//end of for each track
    }//end of for each row

}//end of draw track