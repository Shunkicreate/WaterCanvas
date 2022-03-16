//ランダム by FukiFuki
import drawCircles from "./drawCirclesClass";

function colorRange(color: number = 1) :number{
    if (color == 1) return Math.random() * 360
    if (color == 2) return Math.random() * 20 + 340
    if (color == 3) return Math.random() * 35 + 5
    if (color == 4) return Math.random() * 30 + 40
    if (color == 5) return Math.random() * 60 + 80
    if (color == 6) return Math.random() * 40 + 170
    if (color == 7) return Math.random() * 55 + 185
    if (color == 8) return Math.random() * 45 + 245
    if (color == 9) return Math.random() * 45 + 290
    return Math.random() * 360
}

export function algorithm3(width: number, height: number, color: number) {
    
    const circleNum = Math.random()*50;
    var returnData: drawCircles[] = []
    
    //一つの円
    for (let i = circleNum; i > 0; i--){
        const newData = new drawCircles(
            Math.random() * width,      //x
            Math.random() * height,     //y
            Math.random() * 90 + 30,    //r
            colorRange(color),          //h
            Math.random() * 80 + 20,    //s
            Math.random() * 10 + 90,    //b
            Math.random() * 20)         //a
      
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
    }

    
    
  return returnData;
}