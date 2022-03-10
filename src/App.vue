<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div style="text-align: center;">
    <DrowCanvas></DrowCanvas>
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
import drawCircles from './tsfiles/drawCirclesClass'
import colorSelector from './tsfiles/colorSelector';

export default defineComponent({
  name: 'Home',
  components: {
    DrowCanvas,
  },
  setup(){
    const CircleData = reactive<drawCircles[]>([])
    const ColorData = reactive<colorSelector>({
      blur:0,
      opacity : 0,
      h: 0,
      s: 0,
      v: 0,
    })
    provide('CircleData', CircleData)
    provide('ColorData', ColorData)
    return {CircleData}
  }

})


</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* filter: blur(3rem); */
  /* filter: blur(5px); */

}
</style>
