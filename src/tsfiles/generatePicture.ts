import drawCircles from "./drawCirclesClass";

export function generatePicture(width:number, height:number){
    const circleNum = Math.random()*50+50;
    let returnData!: drawCircles[]
    for(let i = circleNum; i > 0; i--){
        const newData = new drawCircles(width, height, Math.random()*10, Math.random()*10, Math.random()*255, Math.random()*255, Math.random()*255)
        const count = Math.min(circleNum, 10)
        for(let j = 0; j < count; j++){
            if(j>count){
                newData.x.push(0)
                newData.y.push(0)
                newData.r.push(0)
                newData.h.push(0)
                newData.s.push(0)
                newData.b.push(0)
                newData.a.push(0)
                continue;
            }
            newData.x.push(newData.x[-1])
            newData.y.push(newData.y[-1])
            newData.r.push(newData.r[-1] + 3)
            newData.h.push(newData.h[-1])
            newData.s.push(newData.s[-1])
            newData.b.push(newData.b[-1])
            newData.a.push(newData.a[-1] - 3)
        }

        returnData.push(newData)

    }
    return returnData;
}