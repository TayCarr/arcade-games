

//track dimensions
//TODO when making the tiles set the to 40x40 OR whatever WxH you have below
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

//numbers to to draw the map layout 
var trackGrid = [   4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 
                    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                    1, 2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 3, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                ];
// 1 -> wall, 0 -> road, 2 -> car start position
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2; //will need to make sure you add and additional player start for each player
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function isObstacleAtColRow(col, row){
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] != TRACK_ROAD;
    }
    else{
        return false;
    }
}

function carTrackHandling(whichCar){
    /*********USED WITH TESTING collision on mouse
    //write mouse coordinates
    var mouseTrackCol = Math.floor(mouseX / TRACK_W);
    var mouseTrackRow = Math.floor(mouseY / TRACK_H);
    var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    colorText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');
    }********/

    //car collision
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    //colorText(carTrackCol+","+carTrackRow+":"+trackIndexUnderCar, mouseX, mouseY, 'yellow');

    //remove the track at index under car 
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
        if(isObstacleAtColRow(carTrackCol, carTrackRow)){//only need to do if there is a track there else do nothing
            //next two lines fix a bug, undoes the car movement which got it into a wall
            //makes the walls more solid
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

            whichCar.speed *= -0.5; //bumps the car and reduces the speed on collision
            
        }//end of track collision switch  
    }//end of collision check
}//end of car track handling function

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}

function drawTracks(){
    //doing these three var changes and incrementing is more efficient than making the funct call and multiplying for every tile
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
            
            var tileKindHere = trackGrid[arrayIndex];
            var useImage = trackPics[tileKindHere];

            /*//switch case used previously 
            var useImage; 

            switch(tileKindHere){
                case TRACK_ROAD:
                    useImage = roadPic;
                    break;
                case TRACK_WALL:
                    useImage = wallPic
                    break;
                    case TRACK_FLAG:
                    useImage =  flagPic
                    break;
                case TRACK_GOAL:
                    useImage = goalPic
                    break;
                case TRACK_TREE:
                    useImage = treePic
                    break;
            }*/
            canvasContext.drawImage(useImage, drawTileX, drawTileY);
            drawTileX += TRACK_W;
            arrayIndex++;
        
        }//end of for each col
        drawTileY += TRACK_H;
        drawTileX = 0; //reset or it will draw in one long row
    }//end of for each row

}//end of draw track