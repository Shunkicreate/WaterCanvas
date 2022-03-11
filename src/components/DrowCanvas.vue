<template>
  <div class="d-flex justify-content-center" id="drawcanvas"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { inject } from 'vue'
import p5 from "p5";
import drawCircles from '../tsfiles/drawCirclesClass'
import drawCircle from '../tsfiles/drawCircleClass'

export default defineComponent({
  name: "DrowCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    const Drawwidth = ref(window.innerWidth * 0.67);
    const DrawHeight = ref(window.innerWidth * 0.67);
    const HeaderHeight = ref(3)
    const childDrawCircles = inject('CircleData') as drawCircles[]
    const childWindowWidth = inject('WindowWidth') as number
    const childWindowHeight = inject('WindowHeight') as number
    const counter = ref(0)
    const ChildSavedImageURL = inject('SavedImageURL') as String
    const ChildSavedImageJudge = inject('SavedImageJudge') as Boolean



    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(childWindowWidth, childWindowHeight).parent('drawcanvas');
        // カラーモデルをHSBに
        p.colorMode(p.HSB);
        // 矩形を描画方法を指定する
        p.rectMode(p.CENTER);

        // 矩形の枠線を隠す
        p.noStroke();
        //hsbモードにする
        p.colorMode(p.HSB, 360, 100, 100, 100);
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
        function drawEllipse() {
          const H = p.random(0, 360)
          const S = p.random(20, 100)
          const B = p.random(90, 100)
          const A = 10;
          const R = p.random(30, 120)

          const newData = new drawCircles(p.mouseX, p.mouseY, R, H, S, B, A)
          childDrawCircles.push(newData)

          p.fill(H, S, B, A)
          p.ellipse(p.mouseX, p.mouseY, R, R)
          childDrawCircles.forEach((value) => {
            for (let index = 0; index < 1; index++) {
              p.fill(value.h[index], value.s[index], value.b[index], 3);
              value.r[index] += 3;
              p.ellipse(value.x[index], value.y[index], value.r[index], value.r[index]);
            }

          });
        }

        p.touchMoved = () => {
          counter.value++
          if(counter.value%15 === 0){
            drawEllipse()
          }
        }
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
#canvas {
  filter: blur(3px);
}
</style>
