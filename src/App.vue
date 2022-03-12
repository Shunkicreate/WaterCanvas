<template>
  <header>
    <h1>WATER CANVAS</h1>
  </header>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App',

})

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafaf7;
}

header {
  text-align: left;
  color: #858585;
  padding-left: 5%;
  border-radius: 0.75rem;
  box-shadow: 0.9rem 0.9rem 1.25rem #d9d7d4, -0.9rem -0.9rem 1.25rem #fff;
}

header h1 {
  padding: 0.5rem;
}
</style>
