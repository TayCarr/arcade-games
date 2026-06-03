var carX = 75;
var carY = 75;
var carAng = 0; //radians
var carSpeed = 0;

var carPic = document.createElement("img");
var carPicLoaded = false;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

function carImageLoad(){
    carPic.onload = function(){
        carPicLoaded = true;
    }
    carPic.src = "player1car.png";
}

function carReset(){
    for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
                trackGrid[arrayIndex] = TRACK_ROAD;
                //carAng = -Math.PI/2; //also 90 degs in radians
                carAng = -90 * Math.PI/180.0; //convert degrees to rads
                //(each * TRACK) = the top corner of that square will be where the car is drawn
                //(each * TRACK + TRACK/2) = center of the square will draw car there
                carX = eachCol * TRACK_W + TRACK_W/2;
                carY = eachRow * TRACK_H + TRACK_H/2;
            }//end of checking if car starting position
        
        }//end of for each track
    }//end of for each row
}

function carMove(){
    //each frame reduce speed by the multiplier ex 0.97 reduces by 3%
    carSpeed *= GROUNDSPEED_DECAY_MULT;

    if(keyHeld_Gas){
        carSpeed += DRIVE_POWER; //play with acceleration
    }
    if(keyHeld_Reverse){
        carSpeed -= REVERSE_POWER;
    }
    if(keyHeld_TurnLeft){//how fast it turns
        carAng -= TURN_RATE; //turn left is negative
    }
    if(keyHeld_TurnRight){
        carAng += TURN_RATE;
    }
    //think hypotenuse sohcahtoa type nasty ugly icky math 
    //if moving at angle calculates the distance moved at speed 
    //working in radians
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
    
}

function carDraw(){
    //car image 
    if(carPicLoaded){
        //subtracting half of the lengths centers the image in middle of that position rather than in the top corner
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }
}