//ランダム
import drawCircles from "./drawCirclesClass";
import { colorRange } from "./colorRange";

export function algorithm1(width:number, height:number, color:number){
  const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    

    for (let i = circleNum; i > 0; i--){
        // if (typeof color !== 'undefined') {
            const newData = new drawCircles(Math.random()*width, Math.random()*height, Math.random()*90 + 30, colorRange(color), Math.random()*80 + 20, Math.random()*10 + 90, Math.random()*20)
    //   }
      
      const count = 1000
      // const count = Math.min(circleNum, 50)
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
          newData.x.push(newData.x[j])
          newData.y.push(newData.y[j])
          newData.r.push(newData.r[j] + Math.random() * 20)
          newData.h.push(newData.h[j])
          newData.s.push(newData.s[j])
          newData.b.push(newData.b[j])
          newData.a.push(newData.a[j] - Math.random() )
      }
      returnData.push(newData)
      // console.log(newData.a)

  }
  return returnData;
}