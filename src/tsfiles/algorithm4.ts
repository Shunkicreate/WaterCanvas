//ランダム by Shunki
import drawCircles from "./drawCirclesClass";
import { colorRange } from "./colorRange";


export function algorithm4(width: number, height: number, color: number) {
    const circleNum = Math.random() * 50;
    var returnData: drawCircles[] = []
    console.log("hageruwa")

//h: 360 others: 100
    for (let i = circleNum; i > 0; i--) {
        var dirction = Math.random()* 360
        var distance = Math.random()* 30 + 10
        var dir_x = Math.cos(dirction) * distance
        var dir_y = Math.sin(dirction) * distance
        var radius = Math.random() * 20 + 10
        var alfa = Math.random() * 10 + 90
        const newData = new drawCircles(Math.random() * width, Math.random() * height, radius , colorRange(color), Math.random() * 80 + 20, Math.random() * 10 + 90, alfa)

        const count = 10
        for (let j = 0; j < count; j++) {
            if (j > count) {
                newData.x.push(0)
                newData.y.push(0)
                newData.r.push(0)
                newData.h.push(0)
                newData.s.push(0)
                newData.b.push(0)
                newData.a.push(0)
                continue;
            }
            newData.x.push(newData.x[j] + dir_x)
            newData.y.push(newData.y[j] + dir_y)
            newData.r.push(newData.r[j] )
            newData.h.push(newData.h[j])
            newData.s.push(newData.s[j])
            newData.b.push(newData.b[j])
            newData.a.push(newData.a[j] - Math.random())
        }
        returnData.push(newData)

    }
    return returnData;
}