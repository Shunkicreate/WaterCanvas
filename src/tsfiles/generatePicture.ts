import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";
import { algorithm2 } from "./algorithm2";
import { algorithm3 } from "./algorithm3";
import { algorithm4 } from "./algorithm4";

export function generatePicture(width: number, height: number, color: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 4
    // let randomAlgorithmNum  = 3
    const randomAlgorithmNum  = Math.floor(Math.random()*algorithmNum)
    
    //const selectRed = algorithm2
    console.log(randomAlgorithmNum)
    returnData = algorithm1(width, height, color)
    if(randomAlgorithmNum == 0){
        returnData = algorithm1(width, height, color)
    }
    else if(randomAlgorithmNum == 1){
        returnData = algorithm2(width, height, color)
    }
    else if(randomAlgorithmNum == 2){
        returnData = algorithm3(width, height, color)
    }
    // else if(randomAlgorithmNum == 3){
    //     returnData = algorithm4(width, height, color)
    // }
    return returnData;
}