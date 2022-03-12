<template>
  <div class="colorSection">
    <div class="style color">
      <div class="picker"></div>
      <div class="toolBar">
        <div class="bar mode" @click="changeMode()">
          <p>mode: {{ mode }}</p>
        </div>
        <div class="bar blur">
          <p>Blur</p>
        </div>
        <div class="bar opacity">
          <p>Opacity</p>
        </div>
      </div>
      <div class="actions">
        <div class="action what">
          <p>What is this?</p>
        </div>
        <div class="action save">
          <p>Save Image</p>
          <!-- <a @click="SaveImage"><p>Save Image</p></a> -->
        </div>
      </div>
      <div class="SNS">
        <p>Post to SNS</p>
        <div class="logos">
          <div class="logofolder">
            <img src="../assets/Instagram.png" class="logo insta" />
          </div>
          <div class="logofolder">
            <img src="../assets/Twitter.png" class="logo twitter" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import colorSelector from "../tsfiles/colorSelector";
import drawCircles from "../tsfiles/drawCirclesClass"


export default defineComponent({
  name: "ColorSetting",
  setup() {
    const childColorSelector = inject('ColorData') as colorSelector
    const mode = inject('mode') as Ref
    const childDrawCircles = inject('CircleData') as drawCircles[]
    const canvasReset = inject('canvasReset') as Ref
    function changeMode() {
      if (mode.value == 'canvas') mode.value = 'water'
      else if (mode.value == 'water') mode.value = 'canvas'
      childDrawCircles.forEach(element => {
        element.reset()
        if (canvasReset.value == 'change') canvasReset.value = 'stay'
        else if (canvasReset.value == 'stay') canvasReset.value = 'change'
      });
    }
    return {
      childColorSelector,
      changeMode,
      mode
    }
    // const save = {
    //   data(){
    //     count: 0
    //   }
    //   return save
    // }
  }

});
</script>

<style>
.style {
  background: #fafaf7;
  box-shadow: 0.9rem 0.9rem 1.25rem #d9d7d4, -0.9rem -0.9rem 1.25rem #fff;
}

.colorSection {
  height: 100%;
  width: 32%;
  float: left;
}

.color {
  height: 94%;
  width: 80%;
  border-radius: 3.125rem;
  margin: 0 10%;
  padding-top: 3.125rem;
}

.picker {
  width: 75%;
  height: 15rem;
  margin: auto;
}

.toolBar {
  margin: 2.5rem 15% 1.875rem 15%;
}

.bar {
  width: 80%;
  height: auto;
  line-height: 2.125rem;
  padding-left: 1.25rem;
  margin-bottom: 1.25rem;
  background-color: #fafaf7;
  box-shadow: inset 0.5rem 0.5rem 0.625rem #d9d7d4,
    inset -0.5rem -0.5rem 0.625rem #fff;
  text-align: left;
  border-radius: 1.25rem;
}

.actions {
  margin: 0.625rem 15%;
}

.action {
  width: 100%;
  height: auto;
  line-height: 2rem;
  margin-bottom: 0.625rem;
  background-color: #ffefbf;
  box-shadow: 0.25rem 0.25rem 0.625rem #d9d7d4, -0.25rem -0.25rem 0.625rem #fff;
  text-align: center;
  border-radius: 1.875rem;
}

.SNS {
  width: 80%;
  /* margin: 1.875rem 15%; */
  text-align: center;
  margin: 5% auto;
}

.SNS p {
  font-size: 0.75rem;
}

.logos {
  margin: 0.625rem auto;
  width: 80%;
  display: flex;
}

.logofolder {
  width: 40%;
  /* height: 10em; */
  margin: auto;
}

.logo {
  height: 3.125rem;
  width: 3.125rem;
  /* float: left; */
  box-shadow: 0.5rem 0.5rem 0.625rem #d9d7d4, -0.5rem -0.5rem 0.625rem #fff;
  padding: 0.625rem;
  border-radius: 1.25rem;
  margin: auto;
}

.insta {
  margin-left: 22%;
}

.twitter {
  margin-left: 10%;
}

p {
  font-size: 1rem;
  font-weight: 700;
  color: #858585;
  margin: 0;
}
</style>
