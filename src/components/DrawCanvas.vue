<template>
  <div class="d-flex justify-content-center" id="drawCanvas"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, InjectionKey } from "vue";
import { inject } from 'vue'
import p5 from "p5";
import drawCircles from '../tsfiles/drawCirclesClass'
import drawCircle from '../tsfiles/drawCircleClass'
import { ProductKey } from '../tsfiles/symbols';
import axios from 'axios'


export default defineComponent({
  name: "DrawCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    
    // const DrawWidth = ref(window.innerWidth * 0.67);
    // const DrawHeight = ref(window.innerWidth * 0.67);
    // const HeaderHeight = ref(3)
    // const childDrawCircles: InjectionKey<drawCircles[]> = Symbol('CircleData')
    const demoData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(ProductKey, [demoData]);
    // const childDrawCircles = inject<drawCircles[]>('CircleData')
    // console.log(typeof childDrawCircles)
    const childWindowWidth = inject('WindowWidth') as number
    const childWindowHeight = inject('WindowHeight') as number
    const timeCounter = ref(0)
    const canvasCounter = ref(0)
    const drawing = ref(false)
    const mode = inject('mode') as Ref
    const canvasReset = inject('canvasReset') as Ref
    const autoDraw = inject('autoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    var canvas!: p5.Element

    // const ChildSavedImage = inject('SavedImage') as Ref


    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const output = () => {
      timeCounter.value += 1;
    }

    //50msごとにカウンターを設置
    setInterval(output, 50)

    const sketch = (p: p5) => {
      p.setup = () => {
        // let Canvas = p.createCanvas(childWindowWidth, childWindowHeight).parent('drawCanvas');
        canvas = p.createCanvas(childWindowWidth, childWindowHeight, p.WEBGL).parent('drawCanvas');
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
        p.fill('#fafaf7');
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

        //円を作る関数
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

        //円を更新する関数
        function drawEllipse() {
          childDrawCircles.forEach((value) => {
            for (let index = 0; index < 1; index++) {
              p.fill(value.h[index], value.s[index], value.b[index], 3);
              value.r[index] += 3;
              p.ellipse(value.x[index], value.y[index], value.r[index], value.r[index]);
            }
          });
        };

          // モードがwaterの時の処理
          if (mode.value == 'water') {
            if (drawing.value && timeCounter.value % 2 == 0) {
              drawEllipse()
            }
            p.touchMoved = () => {
              if (!drawing.value) {
                // console.log(drawing.value)
                drawing.value = true;
                // console.log(drawing.value)
              }
              if (timeCounter.value % 5 == 0) {
                createNewEllipse()
              }
            };
          }

          // モードがcanvasのときの処理
          else if (mode.value == 'canvas') {
            canvasCounter.value++;
            p.touchMoved = () => {
              if (canvasCounter.value % 10 == 0) {
                createNewEllipse()
                drawEllipse()
              };
            }
          }

          //キャンバスの初期化関数
          if (canvasReset.value == true) {
            canvasReset.value = false;
            p.fill('#fafaf7')
            p.rect(0, 0, p.width * 2, p.height * 2)
          }

        //自動描画
        if (autoDraw.value == true) {
          if( mode.value == 'water'  ){
            drawing.value = true
          }
          console.log('auto draw', childDrawCircles)
          p.fill('#fafaf7')
          p.rect(0, 0, p.width * 2, p.height * 2)
          for (var i = 0; i < childDrawCircles.length; i++) {
            const elem = childDrawCircles[i]
            // for (var j = 0; j <= i; j++) {
            //   for (var k = j; k > 0; k--) {
            //     // p.fill("#fafaf710")
            //     // p.rect(0, 0, childWindowWidth, childWindowHeight)
            //     console.log(childDrawCircles[j])
            //     p.fill(childDrawCircles[j].h[k], childDrawCircles[j].s[k], childDrawCircles[j].b[k], childDrawCircles[i - j].a[j],)
            //     p.ellipse(childDrawCircles[j].x[k], childDrawCircles[j].y[k], childDrawCircles[j].r[k], childDrawCircles[j].r[k],)
            //   }
            //     console.log("----------------------------------------------------------")
            //   k--;
            // }
            for (var j = 0; j < elem.a.length; j++) {
              p.fill(elem.h[j], elem.s[j], elem.b[j], elem.a[j],)
              p.ellipse(elem.x[j], elem.y[j], elem.r[j], elem.r[j],)
              }
            }
          autoDraw.value = !autoDraw.value
          }

        if (SavedImageJudge.value == true){
          console.log(SavedImageJudge.value)
          p.saveCanvas(canvas,'WaterCanvas','jpg')
          SavedImageJudge.value = !SavedImageJudge.value
          }
      };
    };

    const canvasData = new p5(sketch)

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
