<template>
  <div class="container border" style="text-align: center;">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
    <p>Y座標: {{ positionY }}</p>
    <p>X座標: {{ positionX }}</p> 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import p5 from "p5";

export default defineComponent({
  name: "DrowCanvas",
  setup() {
    const positionY = ref(0);
    const positionX = ref(0);

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(720, 720);
        // カラーモデルをHSBに
        p.colorMode(p.HSB, 360, 100, 100);
        // 矩形を描画方法を指定する
        p.rectMode(p.CENTER);
        // 矩形の枠線を隠す
        p.noStroke();
      };

      p.draw = () => {
        positionY.value = p.mouseY;
        positionX.value = p.mouseX;

        // 背景色を現在のカラーモードで指定
        // 色相、再度、明度
        p.background(p.mouseY / 2, 100, 100);
        // 図形の色を現在のカラーモードで指定
        // 背景の反転色を表現する
        p.fill(360 - p.mouseY / 2, 100, 100);
        // 図形の描画（1px ~ 720pxの間で大きさが変わる）
        // X座標, Y座標, width, height
        p.rect(360, 360, p.mouseX + 1, p.mouseX + 1);
      };

    };

    new p5(sketch);

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
</style>
