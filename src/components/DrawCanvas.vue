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
import WindowStatusClass from '../tsfiles/WindowStatusClass'
import { BlobServiceClient } from "@azure/storage-blob";
import { sampleBlobData } from "../tsfiles/sampleBlobData";
import axios, { AxiosResponse } from "axios";


export default defineComponent({
  name: "DrawCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);
    const DemoCircleData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(DrawCirclesKey, [DemoCircleData]);
    const DemoWindowData = new WindowStatusClass(0, 0, 0, 0, "", "", false, false, false, false, false, false, false, "", false)
    const WindowStatus = inject(WindowStatusKey, DemoWindowData)
    console.log(WindowStatus.WindowHeight)
    const timeCounter = ref(0)
    const canvasCounter = ref(0)
    const drawing = ref(false)
    var canvas!: p5.Element
    const output = () => {
      timeCounter.value += 1;
    }

    //50msごとにカウンターを設置
    setInterval(output, 50)

    const sketch = (p: p5) => {
      p.setup = () => {
        if (WindowStatus.WindowWidth <= 1024) {
          canvas = p.createCanvas(WindowStatus.WindowWidth * 0.7, WindowStatus.WindowHeight * 0.85).parent('drawCanvas');
        } else {
          canvas = p.createCanvas(WindowStatus.WindowWidth * 0.55, WindowStatus.WindowHeight * 0.85).parent('drawCanvas');
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
          const H = colorRange(WindowStatus.ColorMode)
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
        if (WindowStatus.CanvasReset == true) {
          WindowStatus.CanvasReset = false;
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
        if (WindowStatus.CanDraw) {
          WindowStatus.ChangeTwoPic = unlockUrl
        } else if (!WindowStatus.CanDraw) {
          WindowStatus.ChangeTwoPic = lockUrl
        }

        //CanDrawの分岐 描けないとき
        if (WindowStatus.CanDraw == false) {


          //取ってきたデータの自動描画
          if (WindowStatus.DrawAnotherPicture == true) {
            WindowStatus.DrawAnotherPicture = false
            waitAndDraw(100) //ms
          }
        }

        //CanDrawの分岐 描けるとき
        else if (WindowStatus.CanDraw == true) {

          //waterモードの時
          if (WindowStatus.Mode == 'Water') {
            if (drawing.value && timeCounter.value % 2 == 0) {
              drawEllipse()
            }
            p.touchMoved = () => {
              if (!drawing.value) {
                drawing.value = true;
              }
              if (timeCounter.value % 5 == 0 && WindowStatus.Generate == false) {
                createNewEllipse()
                // WindowStatus.Generate == true
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
            if (WindowStatus.AutoDraw == true) {
              drawing.value = true
            }
          }

          //canvasモードの時
          else if (WindowStatus.Mode == 'Canvas') {
            canvasCounter.value++;
            p.touchMoved = () => {
              if (canvasCounter.value % 10 == 0) {
                if (WindowStatus.Generate == false) {
                  createNewEllipse()
                  // WindowStatus.Generate == true

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
          if (WindowStatus.AutoDraw == true) {
            p.fill('#fafaf7')
            p.rect(0, 0, p.width * 2, p.height * 2)
            for (var i = 0; i < childDrawCircles.length; i++) {
              const elem = childDrawCircles[i]
              for (var j = 0; j < elem.a.length; j++) {
                p.fill(elem.h[j], elem.s[j], elem.b[j], elem.a[j],)
                p.ellipse(elem.x[j], elem.y[j], elem.r[j], elem.r[j],)
              }
            }
            WindowStatus.AutoDraw = !WindowStatus.AutoDraw
          }
        }



        if (WindowStatus.SavedImageJudge == true) {
          p.saveCanvas(canvas, 'WaterCanvas', 'jpg')
          WindowStatus.SavedImageJudge = !WindowStatus.SavedImageJudge
        }

        //引数はbase64形式の文字列 blobに変換する関数
        function toBlob(base64: string) {
          var bin = atob(base64.replace(/^.*,/, ''));
          var buffer = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
          }
          // Blobを作成
          try {
            var blob: Blob = new Blob([buffer.buffer], {
              type: 'image/jpg'
            });

          } catch (e) {
            console.log(e)
            bin = atob(sampleBlobData.replace(/^.*,/, ''))
            buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
              buffer[i] = bin.charCodeAt(i);
            }
            var falseblob: Blob = new Blob([buffer.buffer], {
              type: 'image/jpg'
            });
            return falseblob;
          }
          return blob;
        }

        if (WindowStatus.ImgToUrlJudge) {
          WindowStatus.ImgToUrlJudge = !WindowStatus.ImgToUrlJudge
          WindowStatus.ImgData = canvas.elt.toDataURL('image/jpeg', 1.0)
          const blobData: Blob = toBlob(WindowStatus.ImgData)
          // Update <placeholder> with your Blob service SAS URL string
          const blobSasUrl = "https://canvasimg.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-04-29T18:04:51Z&st=2022-03-29T10:04:51Z&sip=14.13.194.67&spr=https&sig=64tI9Ve2ykn6gZkilkEpi%2BkJY%2Bt%2BpSkPp%2B70yeMr2Y0%3D";
          // Create a new BlobServiceClient
          const blobServiceClient = new BlobServiceClient(blobSasUrl);
          const containerName = "img"
          // Get a container client from the BlobServiceClient
          const containerClient = blobServiceClient.getContainerClient(containerName);
          const imgName = "img" + new Date().getTime() + ".jpg"
          const URL = "https://canvasimg.blob.core.windows.net/img/" + imgName


          async function delotefile(URL: string) {
            await containerClient.deleteBlob(imgName)
              .then(response => {
                console.log(response)
              })
              .catch(e => {
                console.log(e)
              })
          }
          console.log("Uploading files...");
          async function uploadfile() {
            try {
              console.log("Uploading files...");
              const options = {
                blobHTTPHeaders: {
                  blobContentType: 'image/jpeg',
                },
              };
              const blockBlobClient = containerClient.getBlockBlobClient(imgName);
              await blockBlobClient.upload(blobData, blobData.size, options).then(response => {
                console.log("Done: ", response)
                axios
                  .post("https://watercanvas.herokuapp.com/azure", {
                    "url": URL
                  })
                  .then(function (response) {
                    console.log(response.data)
                    // id属性で要素を取得
                    var textbox_element = document.getElementById('AI');
                    // 新しいHTML要素を作成
                    var new_element = document.createElement('p');
                    new_element.textContent = response.data;
                    // 指定した要素の中の末尾に挿入
                    if (textbox_element === null) return;
                    textbox_element.appendChild(new_element);
                    delotefile(URL)

                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              })
                .catch(response => {
                  console.log("expection happend: ", response)
                })
            }
            catch (error) {
              console.log("exception happend", error);
            }
          }
          uploadfile()
          
          console.log("gaaaaaaaha")
        }
      };
    };

    const canvasData = new p5(sketch)



    console.log("gaaaaaaaha")
    if (
      WindowStatus.ImgToUrlJudge) {
      console.log("gaaaaaaaha")
      WindowStatus.ImgToUrlJudge = !WindowStatus.ImgToUrlJudge
      const board = <HTMLInputElement>document.getElementById("defaultCanvas0")
      console.log(board)
      // const canvas = board.("image/png");  // DataURI Schemaが返却される

      // 送信情報の設定
      // const param  = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json; charset=utf-8"
      //   },
      //   body: JSON.stringify({data: canvas})
      // };
    }

    return {
      positionY,
      positionX,
      timeCounter,
      // CanvasReset,
      WindowStatus,
      canvasData,
      // Mode,
      // BlurValue,
    };
  },
  mounted() {

  }
});
</script>
