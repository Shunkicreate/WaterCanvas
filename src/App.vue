<template>
  <header>
    <div class="title">WATER CANVAS</div>
    <div class="menuBtn">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
  <!-- <div  style="text-align: center; height:100%"> -->
  <div v-show="WindowStatus.IsLoading">
    <div class="loader"></div>
  </div>
  <div class="home" v-show="!WindowStatus.IsLoading">
    <DrawCanvas></DrawCanvas>
    <div class="wrapper">
      <ColorSetting></ColorSetting>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, provide, reactive } from 'vue';
import DrawCanvas from './components/DrawCanvas.vue'
import ColorSetting from './components/ColorSetting.vue'
import drawCircles from './tsfiles/drawCirclesClass'
import colorSelector from './tsfiles/colorSelector';
import { DrawCirclesKey } from './tsfiles/symbols';
import $ from 'jquery';
import WindowStatus from './tsfiles/WindowStatus'
import { WindowStatusKey } from './tsfiles/WindowStatusKey';

export default defineComponent({
  name: 'Home',
  components: {
    DrawCanvas,
    ColorSetting
  },
  setup() {
    const CircleData = reactive<drawCircles[]>([])
    const ColorData = reactive<colorSelector>({
      blur: 0,
      opacity: 0,
      h: 0,
      s: 0,
      v: 0,
    })
    const WindowStatus = reactive<WindowStatus>({
      WindowWidth: window.innerWidth,
      WindowHeight: window.innerHeight,
      BlurValue: 3,
      ColorMode: 1,
      Mode: "Canvas",
      ChangeTwoPic: "src/assets/unlock.png",
      SavedImageJudge: false,
      CanvasReset: false,
      AutoDraw: false,
      IsLoading: false,
      DrawAnotherPicture: false,
      CanDraw: true,
      Generate: false,
      ImgData: "",
      ImgToUrlJudge: false,
    })

    function disableScroll(event: any) {
      event.preventDefault();
    }
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.addEventListener('mousewheel', disableScroll, { passive: false });
    provide('ColorData', ColorData)
    provide(DrawCirclesKey, CircleData);
    provide(WindowStatusKey, WindowStatus);

    return {
      WindowStatus,
    }
  },
  mounted() {
    $(".menuBtn").click(function () {
      $(".menuBtn").toggleClass('active');
      $('.wrapper').toggleClass('fade')
      $('.colorSection').toggleClass('fade')
    });
  }
})
</script>