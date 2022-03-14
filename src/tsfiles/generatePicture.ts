import drawCircles from "./drawCirclesClass";
import { algorithm1 } from "./algorithm1";
import { algorithm2 } from "./algorithm2";
import { algorithm3 } from "./algorithm3";
import { algorithm4 } from "./algorithm4";
import { algorithm5 } from "./algorithm5";
import { algorithm6 } from "./algorithm6";
import { algorithm7 } from "./algorithm7";
import { algorithm8 } from "./algorithm8";
import { algorithm9 } from "./algorithm9";

export function generatePicture(width: number, height: number) {
    // const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    const algorithmNum = 9
    const selectNum = Math.floor(Math.random() * algorithmNum) + 1
    if (selectNum == 1) returnData = algorithm1(width, height)
    if (selectNum == 2) returnData = algorithm2(width, height)
    if (selectNum == 3) returnData = algorithm3(width, height)
    if (selectNum == 4) returnData = algorithm4(width, height)
    if (selectNum == 5) returnData = algorithm5(width, height)
    if (selectNum == 6) returnData = algorithm6(width, height)
    if (selectNum == 7) returnData = algorithm7(width, height)
    if (selectNum == 8) returnData = algorithm8(width, height)
    if (selectNum == 9) returnData = algorithm8(width, height)
    return returnData;
}