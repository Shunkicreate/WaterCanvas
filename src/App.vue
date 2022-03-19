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
  <div v-show="IsLoading">
    <div class="loader"></div>
  </div>
  <div class="home" v-show="!IsLoading">
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
      Mode: "Canvas",
      ChangeTwoPic: "src/assets/unlock.png",
      SavedImageJudge: false,
      CanvasReset: false,
      AutoDraw: false,
      IsLoading: false,
      DrawAnotherPicture: false,
      CanDraw: false,
    })

    const WindowWidth = ref(window.innerWidth)
    const WindowHeight = ref(window.innerHeight)
    const SavedImageJudge = ref(false)
    const Mode = ref("Canvas")
    const CanvasReset = ref(false)
    const AutoDraw = ref(false)
    const IsLoading = ref(false)
    const DrawAnotherPicture = ref(false)
    const CanDraw = ref(true)
    const ChangeTwoPic = ref("")
    const BlurValue = ref(3)
    const Generate = ref(false)
    const ColorMode = ref(1)
    ChangeTwoPic.value = 'src/assets/unlock.png'
    provide('BlurValue', BlurValue);
    // const postError = ref(true)

    function disableScroll(event: any) {
      event.preventDefault();
    }
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.addEventListener('mousewheel', disableScroll, { passive: false });
    // provide('CircleData', CircleData)
    provide('ColorData', ColorData)
    provide('WindowWidth', WindowWidth)
    provide('WindowHeight', WindowHeight)
    provide('SavedImageJudge', SavedImageJudge)
    provide('Mode', Mode)
    provide('CanvasReset', CanvasReset)
    provide('AutoDraw', AutoDraw)
    provide('DrawAnotherPicture', DrawAnotherPicture)
    provide('CanDraw', CanDraw)

    provide(DrawCirclesKey, CircleData);
    provide(WindowStatusKey, WindowStatus);
    provide('IsLoading', IsLoading)
    provide('ChangeTwoPic', ChangeTwoPic)
    provide('Generate', Generate)
    provide('ColorMode', ColorMode)

    return {
      IsLoading,
      BlurValue,
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