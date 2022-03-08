<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div style="text-align: center;">
    <DrowCanvas></DrowCanvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, provide } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import DrowCanvas from './components/DrowCanvas.vue'
import drawCircles from './tsfiles/drawCirclesClass'
export default defineComponent({
  name: 'Home',
  components: {
    // HelloWorld,
    DrowCanvas,
  },
  setup(){
    // let drawCircles: drawCircle[] = new Array();
    // const drawCircless = ref<Array>()
    const drawCircless = ref<InstanceType<typeof drawCircles>>()
    provide('drawCircless', drawCircless)
    // return drawCircless
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
