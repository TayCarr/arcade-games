
//const PLAYER_MOVE_SPEED = 3.0;
const PLAYER_MOVE_SPEED = 5.0;

const KEYX = 100;
const KEYY = 625;

function warriorClass(){
    this.x = 75;
    this.y = 75;

    this.myWarriorPic; //which picture to use
    this.myWarriorPic2;
    this.picSwitch = true; //start true and swap to false to alternate
    this.name ="Untitled Warrior";

    //walking
    this.walkFrame = 0;
    this.walkTimer = 0;

    //inventory
    this.keysHeld = 0;
    this.toyheld = false;


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

    this.reset = function(whichImage, otherImage, warriorName){ //how to declare a function within the class
        this.name = warriorName;
        this.myWarriorPic = whichImage;
        this.myWarriorPic2 = otherImage;
        this.toyheld = false;

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
        var isMoving = this.keyHeld_East || this.keyHeld_West || this.keyHeld_South || this.keyHeld_North;

        if(isMoving){
            this.walkTimer++;

            if(this.walkTimer > 8){
                this.walkTimer = 0;
                this.walkFrame = (this.walkFrame + 1) % 2;
            }
        }
        else{
            this.walkFrame = 0; //standing
        }

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
            case WORLD_DOOR_OPEN:
                this.x = nextX;
                this.y = nextY;
                break;
            case WORLD_WALL_GAP:
            this.x = nextX;
            this.y = nextY;
            break;
            case WORLD_GOAL:
                if(this.toyheld){
                    console.log(this.name + " WINS!");
                    worldGrid[walkIntoTileIndex] = GOAL_SUCCESS;
                    console.log("Loading reset in 3 seconds");
                    setTimeout(() => {
                        loadLevel(levelOne);
                      }, 3000);
			        
                }else{
                    worldGrid[walkIntoTileIndex] = GOAL_FAIL;
                }
                
                break;
            case WORLD_DOOR:
                if(this.keysHeld > 0){
                    this.keysHeld--; //use the key, remove from inventory
                    //console.log(this.keysHeld);
                    worldGrid[walkIntoTileIndex] = WORLD_DOOR_OPEN;//remove the door and make it a walkway
                }
                //if do not have a key do nothing 
                break;
            case WORLD_KEY:
                this.keysHeld++; //pick up key
                worldGrid[walkIntoTileIndex] = WORLD_ROAD;//remove key make walking path
                break;
            case WORLD_TOY:
                this.toyheld = true; //pick up toy
                worldGrid[walkIntoTileIndex] = WORLD_WALL;//remove key make walking path
            break;
            case WORLD_WALL:
            case NOT_WALL_GAP:
            default:
                break;


        }
        
    }

    this.drawWalk = function(){
        //TODO
        //could have the list like umm world pieces if i have longer animations
        //could also make this funct more generic like "draw animations" pass the list or a flag for which one 
        //could do the sleeping dog animation for example

        if(this.walkFrame === 0){
            drawBitmapCenteredWithRotation(walk1, this.x, this.y, 0);
        }
        else{
            drawBitmapCenteredWithRotation(walk2, this.x, this.y, 0);
        }
    }//end of draw walk

    //write the inventory UI, call in Main.js/drawAll()
    this.drawText = function(){
        // Configure text styles
        canvasContext.font = "25px Arial";
        
        colorText("treats: "+this.keysHeld, KEYX, KEYY, 'white');
    }

    this.draw = function(){

        //****draw no animation
        //drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);

        //**draw the original basic walk flip */
        /**if(!this.picSwitch){
            drawBitmapCenteredWithRotation(this.myWarriorPic2, this.x, this.y, 0);
        }
        else{
            //subtracting half of the lengths centers the image in middle of that position rather than in the top corner
            drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
        }**/

        //**if stand still draw still img else do the walking animation */
        if(this.keyHeld_East || this.keyHeld_North || this.keyHeld_West || this.keyHeld_South){
            this.drawWalk();
        }
        else{
            drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
        }
        
    }
}//end of class