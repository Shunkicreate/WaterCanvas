import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";
import { algorithm2 } from "./algorithm2";

export function generatePicture(width: number, height: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 2
    const selectNum = Math.floor(Math.random() * algorithmNum) + 1
    if (selectNum == 1) returnData = algorithm1(width, height)
    if (selectNum == 2) returnData = algorithm2(width, height)
    return returnData;
}