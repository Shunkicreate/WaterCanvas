<template>
  <div class=" bura- container border" style="text-align: center">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
    <p>Y座標: {{ positionY }}</p>
    <p>X座標: {{ positionX }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import p5 from "p5";

export default defineComponent({
  name: "DrowCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    const colorH = ref(0);
    const colorS = ref(0);
    const colorB = ref(0);
    

    class drawCircle {
      x: number;
      y: number;
      r: number;
      h: number;
      s: number;
      b: number;
      a: number;
      constructor(x: number, y: number, r: number, h: number, s: number, b: number, a: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.h = h;
        this.s = s;
        this.b = b;
        this.a = a;
        }
    }

    let drawCircles: drawCircle[] = new Array();


    // drawCircles.circleDatta.push(new drawCircle())/÷

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(720, 720);
        // カラーモデルをHSBに
        p.colorMode(p.HSB);
        // 矩形を描画方法を指定する
        p.rectMode(p.CENTER);
        // 矩形の枠線を隠す
        p.noStroke();
        //hsbモードにする
        p.colorMode(p.HSB, 100);

        
      };
      

      p.draw = () => {
        //        positionY.value = p.mouseY;
        //        positionX.value = p.mouseX;

        // 背景色を現在のカラーモードで指定
        // 色相、再度、明度
        //       p.background(p.mouseY / 2, 100, 100);
        // 図形の色を現在のカラーモードで指定
        // 背景の反転色を表現する
        //       p.fill(360 - p.mouseY / 2, 100, 100);
        // 図形の描画（1px ~ 720pxの間で大きさが変わる）
        // X座標, Y座標, width, height
        //       p.rect(360, 360, p.mouseX + 1, p.mouseX + 1);

        /*
        if (p.mouseIsPressed) {
          p.fill(colorR.value, colorG.value, colorB.value);
          colorR.value += Math.random() * 5;
          colorG.value += Math.random() * 5;
          colorB.value += Math.random() * 5;
          if (colorR.value >= 255) colorR.value = 0;
          if (colorG.value >= 255) colorG.value = 0;
          if (colorB.value >= 255) colorB.value = 0;
          p.ellipse(p.mouseX, p.mouseY, 50, 50);
        }
        */

        /*
        正しいところ
        p.mouseClicked = () => { 
          const H = p.random(0,255)
          const S = p.random(0,255)
          const B = p.random(0,255)
          //const A = p.random(0,255)
          const A = 20;
          const R = p.random(20,80)

          drawCircles.forEach((value) => {
            for (let index = 0; index < drawCircles.length; index++) {
              console.log(value.x);
            p.fill(value.h, value.s, value.b, value.a - 2);
            p.ellipse(value.x, value.y, R + 30, R + 30);
            }
            
          });

          p.fill(H, S, B, A);
          p.ellipse(p.mouseX, p.mouseY, R, R);

          drawCircles.push(new drawCircle(p.mouseX, p.mouseY, R, H, S, B, A))

          console.log(drawCircles)
        }
        */
        
        p.mouseClicked = () => {
          const H = p.random(0,255)
          const S = p.random(0,255)
          const B = p.random(0,255)
          const A = 20;
          const R = p.random(20,80)

          drawCircles.forEach((value) => {
            for (let index = 0; index < drawCircles.length; index++) {
              console.log(value.x);
            p.fill(value.h, value.s, value.b, value.a - 2);
            p.ellipse(value.x, value.y, R + 30, R + 30);
            }
            
          });
          
          
          
          p.ellipse(p.mouseX, p.mouseY, R, R);

          drawCircles.push(new drawCircle(p.mouseX, p.mouseY, R, H, S, B, A))

          console.log(drawCircles)
        }
          

        // prevent default
        // p.filter(p.BLUR, 3);

      };
    };

    new p5(sketch)

    return {
      positionY,
      positionX,
    };
  },
});
</script>


<style scoped>

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
/* .bura-{
  filter: blur(5px);
} */
</style>
