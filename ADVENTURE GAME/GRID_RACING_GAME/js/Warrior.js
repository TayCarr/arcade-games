
//const PLAYER_MOVE_SPEED = 3.0;
const PLAYER_MOVE_SPEED = 8.0;

function warriorClass(){
    this.x = 75;
    this.y = 75;

    this.myWarriorPic; //which picture to use
    this.name ="Untitled Warrior";
    //inventory
    this.keysHeld = 0;
    //this.pickaxe = 0;

    this.keyHeld_North = false;
    this.keyHeld_South = false;
    this.keyHeld_West = false;
    this.keyHeld_East = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey){
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    this.reset = function(whichImage, warriorName){ //how to declare a function within the class
        this.name = warriorName;
        this.myWarriorPic = whichImage;

        for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
            for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){

                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

                if(worldGrid[arrayIndex] == WORLD_PLAYERSTART){
                    worldGrid[arrayIndex] = WORLD_ROAD;
            
                    this.x = eachCol * WORLD_W + WORLD_W/2;
                    this.y = eachRow * WORLD_H + WORLD_H/2;
                    return;//leave once you find a spot so that the next spot is left for next player
                }//end of checking if warrior starting position
            
            }//end of for each col
        }//end of for each row
        console.log("No player start position found !");
    }//end of warriorReset func

    this.move = function(){
        
        var nextX = this.x;
        var nextY = this.y;

        if(this.keyHeld_North){
            nextY -= PLAYER_MOVE_SPEED;
        }
        if(this.keyHeld_South){
            nextY += PLAYER_MOVE_SPEED;
        }
        if(this.keyHeld_West){
            nextX -= PLAYER_MOVE_SPEED;
        }
        if(this.keyHeld_East){
            nextX += PLAYER_MOVE_SPEED;
        }
        

        var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
        var walkIntoTileType = WORLD_WALL;//just set it to wall first

        if(walkIntoTileIndex != undefined){
            walkIntoTileType = worldGrid[walkIntoTileIndex]; //now set it to the type
        }
        //set interaction for the different types
        switch(walkIntoTileType){
            case WORLD_ROAD:
                this.x = nextX;
			    this.y = nextY;
                break;
            case WORLD_GOAL:
                console.log(this.name + " WINS!");
			    loadLevel(levelOne);
                break;
            case WORLD_DOOR:
                if(this.keysHeld > 0){
                    this.keysHeld--; //use the key, remove from inventory
                    console.log(this.keysHeld);
                    //TODO update UI if displaying key inventory
                    worldGrid[walkIntoTileIndex] = WORLD_ROAD;//remove the door and make it a walkway
                }
                //if do not have a key do nothing 
                break;
            case WORLD_KEY:
                this.keysHeld++; //pick up key
                //TODO update UI
                worldGrid[walkIntoTileIndex] = WORLD_ROAD;//remove key make walking path
                break;
            case WORLD_WALL:
            default:
                break;


        }

		
			
		
        
    }

    this.draw = function(){
        //warrior image 
        
        //subtracting half of the lengths centers the image in middle of that position rather than in the top corner
        drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
        
    }
}//end of class