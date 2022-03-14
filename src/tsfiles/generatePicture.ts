import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";

export function generatePicture(width:number, height:number){
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 1
    const selectNum = Math.floor( Math.random() * algorithmNum ) + 1
    if(selectNum == 1)returnData = algorithm1(width, height)
    return returnData;
}