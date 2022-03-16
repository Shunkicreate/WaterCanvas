import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";
import { algorithm2 } from "./algorithm2";
import { algorithm3 } from "./algorithm3";
import { algorithm4 } from "./algorithm4";

export function generatePicture(width: number, height: number, color: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 4
    const randomAlgorithmNum  = Math.floor(Math.random()*algorithmNum)
    
    //const selectRed = algorithm2
    returnData = algorithm1(width, height, color)
    if(randomAlgorithmNum == 0){
        algorithm1(width, height, color)
    }
    else if(randomAlgorithmNum == 1){
        algorithm2(width, height, color)
    }
    else if(randomAlgorithmNum == 2){
        algorithm3(width, height, color)
    }
    else if(randomAlgorithmNum == 3){
        algorithm4(width, height, color)
    }
    return returnData;
}