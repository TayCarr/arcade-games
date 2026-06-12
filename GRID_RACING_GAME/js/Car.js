

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

//car class, JS uses function not "class" to declare the difference is in how it is used
function carClass(){
    this.x = 75;
    this.y = 75;
    this.ang = 0; //radians
    this.speed = 0;

    this.myCarPic; //which picture to use

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

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

    this.reset = function(whichImage){ //how to declare a function within the class
        this.myCarPic = whichImage;

        for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
            for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){

                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

                if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    //carAng = -Math.PI/2; //also 90 degs in radians
                    this.ang = -90 * Math.PI/180.0; //convert degrees to rads
                    //(each * TRACK) = the top corner of that square will be where the car is drawn
                    //(each * TRACK + TRACK/2) = center of the square will draw car there
                    this.x = eachCol * TRACK_W + TRACK_W/2;
                    this.y = eachRow * TRACK_H + TRACK_H/2;
                    return;//leave once you find a spot so that the next spot is left for next player
                }//end of checking if car starting position
            
            }//end of for each col
        }//end of for each row
    }//end of carReset func

    this.move = function(){
        //each frame reduce speed by the multiplier ex 0.97 reduces by 3%
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if(this.keyHeld_Gas){
            this.speed += DRIVE_POWER; //play with acceleration
        }
        if(this.keyHeld_Reverse){
            this.speed -= REVERSE_POWER;
        }
        if(Math.abs(this.speed) > MIN_SPEED_TO_TURN){
            if(this.keyHeld_TurnLeft){//how fast it turns
                this.ang -= TURN_RATE; //turn left is negative
            }
            if(this.keyHeld_TurnRight){
                this.ang += TURN_RATE;
            }
        }
        
        //think hypotenuse sohcahtoa type nasty ugly icky math 
        //if moving at angle calculates the distance moved at speed 
        //working in radians
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);
        
    }

    this.draw = function(){
        //car image 
        
        //subtracting half of the lengths centers the image in middle of that position rather than in the top corner
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
        
    }
}//end of class