import drawCircles from "./drawCirclesClass";
import { algorithm2 } from "./algorithm2";

export function generatePictureRed(width: number, height: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 1
    const selectNum = algorithm2
    //const selectRed = algorithm2
    
    if (selectNum == algorithm2) returnData = algorithm2(width, height)
    
    return returnData;
}