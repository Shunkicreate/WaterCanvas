<template>
  <div>ColorSetting</div>
  {{childColorSelector}}
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import colorSelector from "../tsfiles/colorSelector";

export default defineComponent({
    name: "ColorSetting",
    setup(){
        const childColorSelector = inject('ColorData') as colorSelector
        return {
            childColorSelector
            }
    }

});
</script>

<style>

</style>