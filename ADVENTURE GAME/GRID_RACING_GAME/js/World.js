

//world dimensions
//TODO when making the tiles set the to 40x40 OR whatever WxH you have below
const WORLD_W = 40;
const WORLD_H = 40;
const WORLD_GAP = 2;
const WORLD_COLS = 20;
const WORLD_ROWS = 15;

//numbers to to draw the map layout 
var levelOne = [   4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 
                    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                    1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                    1, 0, 3, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                ];
//*****TODO add other levels, gives code for 2 more levels  */
//can refer to levels by index, have a level count variable and ++ it on win so it goes to next level, at max reset whole game and counter back to 0 
//var levelList = [levelOne, levelTwo];
var worldGrid = [];
// 1 -> wall, 0 -> road, 2 -> warrior start position
const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2; //will need to make sure you add and additional player start for each player
const WORLD_GOAL = 3;
const WORLD_TREE = 4;
const WORLD_FLAG = 5;

function returnTileTypeAtColRow(col, row){
    if(col >= 0 && col < WORLD_COLS && row >= 0 && row < WORLD_ROWS){
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    }
    else{
        return WORLD_WALL;//treat anything out of bounds as if it is a world wall
    }
}

function getTileTypeAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		var tileHere = returnTileTypeAtColRow( warriorWorldCol,warriorWorldRow );

		return tileHere;
	} // end of valid col and row

	return WORLD_WALL; // treat outside the map boundary as solid area
} // end of warriorWorldHandling func


function rowColToArrayIndex(col, row){
    return col + WORLD_COLS * row;
}

function drawWorlds(){
    //doing these three var changes and incrementing is more efficient than making the funct call and multiplying for every tile
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
            
            var tileKindHere = worldGrid[arrayIndex];
            var useImage = worldPics[tileKindHere];

            /*//switch case used previously 
            var useImage; 

            switch(tileKindHere){
                case WORLD_ROAD:
                    useImage = roadPic;
                    break;
                case WORLD_WALL:
                    useImage = wallPic
                    break;
                    case WORLD_FLAG:
                    useImage =  flagPic
                    break;
                case WORLD_GOAL:
                    useImage = goalPic
                    break;
                case WORLD_TREE:
                    useImage = treePic
                    break;
            }*/
            canvasContext.drawImage(useImage, drawTileX, drawTileY);
            drawTileX += WORLD_W;
            arrayIndex++;
        
        }//end of for each col
        drawTileY += WORLD_H;
        drawTileX = 0; //reset or it will draw in one long row
    }//end of for each row

}//end of draw world