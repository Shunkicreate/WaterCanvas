<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div style="text-align: center;">
    <DrowCanvas></DrowCanvas>
    <Overlay></Overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import DrowCanvas from './components/DrowCanvas.vue'
import Overlay from './components/Overlay.vue'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    DrowCanvas,
    Overlay,
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
  filter: blur(5px);
  height: 100%;

}
</style>
