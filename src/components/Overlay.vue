<template>
<div>Over Layer</div>
  <div class="overlay">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Overlay",

});
</script>


<style scoped>

.overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(5px);
}
</style>
