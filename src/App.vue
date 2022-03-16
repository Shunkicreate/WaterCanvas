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
      <div v-show="isLoading">
          <div class="loader"></div>
      </div>
      <div  class="home" v-show="!isLoading">
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
import { ProductKey } from './tsfiles/symbols';
import $ from 'jquery';

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
    const WindowWidth = ref(window.innerWidth)
    const WindowHeight = ref(window.innerHeight)
    const SavedImageJudge = ref(false)
    const mode = ref("canvas")
    const canvasReset = ref(false)
    const autoDraw = ref(false)
    const isLoading = ref(false)
    const drawAnotherPicture = ref(false)
    const CanDraw = ref(true)
    const changeTwoPic = ref("")
    const blurValue = ref(3)
    const generate = ref(false)
    changeTwoPic.value = 'src/assets/unlock.png'
    provide('blurValue',blurValue);
    // const postError = ref(true)
    
    function disableScroll(event: any) {
      event.preventDefault();
    }
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.addEventListener('mousewheel', disableScroll, { passive: false });
    provide('CircleData', CircleData)
    provide('ColorData', ColorData)
    provide('WindowWidth', WindowWidth)
    provide('WindowHeight', WindowHeight)
    provide('SavedImageJudge', SavedImageJudge)
    provide('mode', mode)
    provide('canvasReset', canvasReset)
    provide('autoDraw', autoDraw)
    provide('drawAnotherPicture', drawAnotherPicture)
    provide('CanDraw', CanDraw)
    provide(ProductKey, CircleData);
    provide('isLoading', isLoading)
    provide('changeTwoPic', changeTwoPic)
    provide('generate', generate)

    return {
      isLoading,
      blurValue,
    }
  },
  mounted(){
    $(".menuBtn").click(function () {
      $(".menuBtn").toggleClass('active');
      $('.wrapper').toggleClass('fade')
      $('.colorSection').toggleClass('fade')
    });
  }
})
</script>