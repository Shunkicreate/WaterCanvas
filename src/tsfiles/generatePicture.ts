import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";

export function generatePicture(width: number, height: number, color: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    //const algorithmNum = 1
    
    //const selectRed = algorithm2
    returnData = algorithm1(width, height, color)
    return returnData;
}