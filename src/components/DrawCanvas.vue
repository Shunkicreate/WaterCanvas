<template>
  <div id="drawCanvas" style="filter:blur({BlurValue})"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, InjectionKey } from "vue";
import { inject } from 'vue'
import p5 from "p5";
import drawCircles from '../tsfiles/drawCirclesClass'
import { DrawCirclesKey } from '../tsfiles/symbols';
import unlockUrl from '../assets/unlock.png?url'
import lockUrl from '../assets/lock.png?url'
import { colorRange } from "../tsfiles/colorRange";
import { WindowStatusKey } from "../tsfiles/WindowStatusKey";
// import WindowStatus from "../tsfiles/WindowStatus";
export default defineComponent({
  name: "DrawCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    const DemoCircleData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    // const DemoWindowData = new WindowStatus({
    //   WindowWidth: window.innerWidth,
    //   WindowHeight: window.innerHeight,
    //   Mode: "Canvas",
    //   ChangeTwoPic: "src/assets/unlock.png",
    //   SavedImageJudge: false,
    //   CanvasReset: false,
    //   AutoDraw: false,
    //   IsLoading: false,
    //   DrawAnotherPicture: false,
    //   CanDraw: false,
    // })
    const childDrawCircles = inject(DrawCirclesKey, [DemoCircleData]);
    const WindowStatus = inject(WindowStatusKey)
    console.log(WindowStatus?.WindowHeight)
    const childWindowWidth = inject('WindowWidth') as Ref
    const childWindowHeight = inject('WindowHeight') as Ref
    const timeCounter = ref(0)
    const canvasCounter = ref(0)
    const drawing = ref(false)
    const Mode = inject('Mode') as Ref
    const CanvasReset = inject('CanvasReset') as Ref
    const AutoDraw = inject('AutoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    const DrawAnotherPicture = inject('DrawAnotherPicture') as Ref
    const CanDraw = inject('CanDraw') as Ref
    var canvas!: p5.Element
    const ChangeTwoPic = inject("ChangeTwoPic") as Ref
    const BlurValue = inject("BlurValue") as Ref
    const output = () => {
      timeCounter.value += 1;
    }
    const childgenerate = inject('Generate') as Ref
    const ColorMode = inject('ColorMode') as Ref


    //50msごとにカウンターを設置
    setInterval(output, 50)

    const sketch = (p: p5) => {
      p.setup = () => {
        if (childWindowWidth.value <= 1024) {
          canvas = p.createCanvas(childWindowWidth.value * 0.7, childWindowHeight.value * 0.85).parent('drawCanvas');
        } else {
          canvas = p.createCanvas(childWindowWidth.value * 0.55, childWindowHeight.value * 0.85).parent('drawCanvas');
        }
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

        //円を作る関数
        function createNewEllipse() {
          const H = colorRange(ColorMode.value)
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

        //キャンバスの初期化関数
        if (CanvasReset.value == true) {
          CanvasReset.value = false;
          p.fill('#fafaf7')
          p.rect(0, 0, p.width * 2, p.height * 2)
        }

        //自動描画関数
        async function waitAndDraw(t: number) {
          await new Promise(resolve => setTimeout(resolve, t))
          for (var i = 0; i < childDrawCircles.length; i++) {
            await new Promise(resolve => setTimeout(resolve, t))
            for (j = 0; j < i; j++) {
              var k = i - j
              p.fill(childDrawCircles[j].h[k], childDrawCircles[j].s[k], childDrawCircles[j].b[k], childDrawCircles[j].a[k],)
              p.ellipse(childDrawCircles[j].x[k], childDrawCircles[j].y[k], childDrawCircles[j].r[k], childDrawCircles[j].r[k],)
            }
            console.log('write')
          }
        }

        //ロック写真
        if (CanDraw.value) {
          ChangeTwoPic.value = unlockUrl
        } else if (!CanDraw.value) {
          ChangeTwoPic.value = lockUrl
        }

        //CanDrawの分岐 描けないとき
        if (CanDraw.value == false) {


          //取ってきたデータの自動描画
          if (DrawAnotherPicture.value == true) {
            DrawAnotherPicture.value = false
            waitAndDraw(100) //ms
          }
        }

        //CanDrawの分岐 描けるとき
        else if (CanDraw.value == true) {

          //waterモードの時
          if (Mode.value == 'Water') {
            if (drawing.value && timeCounter.value % 2 == 0) {
              drawEllipse()
            }
            p.touchMoved = () => {
              if (!drawing.value) {
                drawing.value = true;
              }
              if (timeCounter.value % 5 == 0 && childgenerate.value == false) {
                createNewEllipse()
                // childgenerate.value == true
              }
            };
            p.touchStarted = () => {
              if (!drawing.value) {
                drawing.value = true;
              }
              createNewEllipse()
              drawEllipse()
            }
            //自動描画
            if (AutoDraw.value == true) {
              drawing.value = true
            }
          }

          //canvasモードの時
          else if (Mode.value == 'Canvas') {
            canvasCounter.value++;
            p.touchMoved = () => {
              if (canvasCounter.value % 10 == 0) {
                if (childgenerate.value == false) {
                  createNewEllipse()
                  // childgenerate.value == true

                }
                drawEllipse()
              };
            }
            p.touchStarted = () => {
              createNewEllipse()
              drawEllipse()
            }
          }

          //自動描画
          if (AutoDraw.value == true) {
            p.fill('#fafaf7')
            p.rect(0, 0, p.width * 2, p.height * 2)
            for (var i = 0; i < childDrawCircles.length; i++) {
              const elem = childDrawCircles[i]
              for (var j = 0; j < elem.a.length; j++) {
                p.fill(elem.h[j], elem.s[j], elem.b[j], elem.a[j],)
                p.ellipse(elem.x[j], elem.y[j], elem.r[j], elem.r[j],)
              }
            }
            AutoDraw.value = !AutoDraw.value
          }
        }



        if (SavedImageJudge.value == true) {
          p.saveCanvas(canvas, 'WaterCanvas', 'jpg')
          SavedImageJudge.value = !SavedImageJudge.value
        }

      };
    };

    const canvasData = new p5(sketch)

    return {
      positionY,
      positionX,
      timeCounter,
      CanvasReset,
      canvasData,
      Mode,
      BlurValue,
    };
  },
});
</script>
