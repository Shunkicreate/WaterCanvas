<template><div @abort="console.log('chnges')">{{ canvasReset }}</div>
  
  <div class="d-flex justify-content-center" id="drawcanvas"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref } from "vue";
import { inject } from 'vue'
import p5 from "p5";
import drawCircles from '../tsfiles/drawCirclesClass'
import drawCircle from '../tsfiles/drawCircleClass'

export default defineComponent({
  name: "DrowCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    // const Drawwidth = ref(window.innerWidth * 0.67);
    // const DrawHeight = ref(window.innerWidth * 0.67);
    // const HeaderHeight = ref(3)
    const childDrawCircles = inject('CircleData') as drawCircles[]
    const childWindowWidth = inject('WindowWidth') as number
    const childWindowHeight = inject('WindowHeight') as number
    const timeCounter = ref(0)
    const canvasCounter = ref(0)
    const drawing = ref(false)
    const mode = inject('mode') as Ref
    const canvasReset = inject('canvasReset') as Ref
    console.log(canvasReset.value)
    // const ChildSavedImage = inject('SavedImage') as Ref


    // const ChildSavedImageJudge = inject('SavedImageJudge') as Ref
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const output = () => {
      timeCounter.value += 1;
      // timeCounter.value = Math.floor(timeCounter.value)


      // console.log(`output: ${timeCounter.value} 秒`)
    }
    setInterval(output, 50)


    // console.log(`${new Date().getSeconds()} 秒`)
    // const countTimer = function () {
    //   timeCounter.value++;
    //   sleep(200)
    //   console.log(timeCounter.value)
    //   return null;
    // }

    const sketch = (p: p5) => {
      p.setup = () => {
        // let Canvas = p.createCanvas(childWindowWidth, childWindowHeight).parent('drawcanvas');
        p.createCanvas(childWindowWidth, childWindowHeight).parent('drawcanvas');
        // カラーモデルをHSBに
        p.colorMode(p.HSB);
        // 矩形を描画方法を指定する
        p.rectMode(p.CENTER);
        // ChildSavedImage.value

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
        function createNewEllipse() {
          const H = p.random(0, 360)
          const S = p.random(20, 100)
          const B = p.random(90, 100)
          const A = 10;
          const R = p.random(30, 120)

          const newData = new drawCircles(p.mouseX, p.mouseY, R, H, S, B, A)
          childDrawCircles.push(newData)
          p.fill(H, S, B, A)
          p.ellipse(p.mouseX, p.mouseY, R, R)
        };

        function drawEllipse() {
          // const H = p.random(0, 360)
          // const S = p.random(20, 100)
          // const B = p.random(90, 100)
          // const A = 10;
          // const R = p.random(30, 120)

          // const newData = new drawCircles(p.mouseX, p.mouseY, R, H, S, B, A)
          // childDrawCircles.push(newData)

          // p.fill(H, S, B, A)
          // p.ellipse(p.mouseX, p.mouseY, R, R)
          childDrawCircles.forEach((value) => {
            for (let index = 0; index < 1; index++) {
              // value.a[index] -=1;
              p.fill(value.h[index], value.s[index], value.b[index], 3);
              value.r[index] += 3;
              p.ellipse(value.x[index], value.y[index], value.r[index], value.r[index]);
            }
          });
        };
        // function drawLikeWater() {
        //   while (timeCounter.value) {
        //     // drawEllipse()
        //   }
        // };


        if (mode.value == 'water') {
          p.touchMoved = () => {
            // console.log(timeCounter.value)
            if (!drawing.value) {
              console.log(drawing.value)
              drawing.value = true;
              console.log(drawing.value)
              // setInterval(output, 2000)
              // drawLikeWater()
            }
            if (timeCounter.value % 5 == 0) {
              createNewEllipse()
            }
            //   console.log(drawing.value)
          };
        }
        else if (mode.value == 'canvas') {
          canvasCounter.value++;
          p.touchMoved = () => {
            if (canvasCounter.value % 10 == 0) {
              createNewEllipse()
              drawEllipse()
            };
          }
        }
        if (drawing.value && timeCounter.value % 2 == 0 && mode.value == 'water') {
          console.log("drawcircle")
          drawEllipse()
        }
        if(canvasReset.value == 'change'){
          canvasReset.value = 'stay';
          console.log('canvasReset')
        }
      };
      // if (ChildSavedImageJudge.value == true){
      //   // p.saveCanvas(Canvas,'wWaterCanvas','jpg');
      // }
    };

    const canvasData = ref(new p5(sketch))

    // if (canvasReset.value) {
    //   canvasReset.value = !canvasReset.value;
    //   // canvasData.value.resetMatrix();
    //   console.log('canvasReset')
    // }


    return {
      positionY,
      positionX,
      timeCounter,
      canvasReset,
      canvasData,
      mode,
    };
  },

      // if (this.canvasReset.value) {
      //   this.canvasReset.value = !this.canvasReset.value;
      //   this.canvasData.resetMatrix()
      //   console.log('canvasReset')
      // }


});
</script>


<style scoped>
</style>
