<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <header>
    <h1>WATER CANVAS</h1>
  </header>
  <div style="text-align: center;">
    <DrowCanvas></DrowCanvas>
    <ColorSetting></ColorSetting>
    <!-- {{CircleData}} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, provide, reactive } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import DrowCanvas from './components/DrowCanvas.vue'
import ColorSetting from './components/ColorSetting.vue'
import drawCircles from './tsfiles/drawCirclesClass'
import colorSelector from './tsfiles/colorSelector';

export default defineComponent({
  name: 'Home',
  components: {
    DrowCanvas,
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
    const WindowWidth = ref(window.innerWidth * 0.5)
    const WindowHeight = ref(window.innerHeight * 0.85)
    const SavedImageURL = ref("")
    const SavedImageJudge = ref(false)
    function disableScroll(event: any) {
      event.preventDefault();
    }
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.addEventListener('mousewheel', disableScroll, { passive: false });
    provide('CircleData', CircleData)
    provide('ColorData', ColorData)
    provide('WindowWidth', WindowWidth.value)
    provide('WindowHeight', WindowHeight.value)
    provide('SavedImageURL', SavedImageURL)
    provide('SavedImageJudge', SavedImageJudge)
  },
})
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

canvas {
  /* height: 300px; */
  /* width: 75%; */
  float: left;
  margin: 0 5% 0 5%;
  border-radius: 1.5rem;
  background: #fafaf7;
  box-shadow: 15px 15px 20px #d9d7d4, -15px -15px 20px #fff;
}

header {
  text-align: left;
  color: #858585;
  margin-left: 5%;
}
</style>
