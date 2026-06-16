

//world dimensions width="800" height="600"
//TODO when making the tiles set the to 40x40 OR whatever WxH you have below
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;

//numbers to to draw the map layout 
var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 1, 4, 1,
                1, 0, 4, 0, 4, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 1, 5, 1, 4, 1,
                1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 4, 1,
                1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1,
                1, 2, 0, 5, 0, 5, 0, 5, 0, 3, 1, 1, 5, 1, 5, 1,
                1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ];
//*****TODO add other levels, gives code for 2 more levels  */
//can refer to levels by index, have a level count variable and ++ it on win so it goes to next level, at max reset whole game and counter back to 0 
//var levelList = [levelOne, levelTwo];
var worldGrid = [];
// 1 -> wall, 0 -> road, 2 -> warrior start position
const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2; //will need to make sure you add and additional player start for each player
const WORLD_GOAL = 3;//draw road first
const WORLD_KEY = 4;//draw road first
const WORLD_DOOR = 5;//draw road first
//pickaxe TODO have a secret ending

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
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined; // treat outside the map boundary as solid area
} // end of warriorWorldHandling func


function rowColToArrayIndex(col, row){
    return col + WORLD_COLS * row;
}

function hasTransparency(currTile){
    //if one of these tiles need to first draw floor under
    return(currTile ==  WORLD_GOAL|| currTile == WORLD_KEY || currTile == WORLD_DOOR);

}

function drawWorlds(){
    //doing these three var changes and incrementing is more efficient than making the funct call and multiplying for every tile
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
            
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
            var tileKindHere = worldGrid[arrayIndex];
            var useImage = worldPics[tileKindHere];

            //my code i just did the check here BUT his has a helper function, i assume i will need to check it in other actions? idk i will do the helper
            if(tileKindHere == 3 || tileKindHere == 4 || tileKindHere == 5){
                canvasContext.drawImage(worldPics[0], drawTileX, drawTileY);
            }

            canvasContext.drawImage(useImage, drawTileX, drawTileY);
            drawTileX += WORLD_W;
            arrayIndex++;
        
        }//end of for each col
        drawTileY += WORLD_H;
        drawTileX = 0; //reset or it will draw in one long row
    }//end of for each row

}//end of draw world